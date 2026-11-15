# Stops all parlor microservices running on the designated ports or running as Java processes
$ports = @(8070, 5000, 5001, 5002, 5003, 5004, 5005, 5006, 5007, 5008)
$serviceNames = @(
    "eureka-server", "gateway-server", "user-service", "salon-service",
    "category-service", "service-offering", "booking-service", "payment-service",
    "notifications", "review"
)

Write-Host "Stopping all parlor microservices..." -ForegroundColor Yellow

# Pass 1: Terminate any java.exe processes whose command line contains parlor or service names
try {
    $javaProcs = Get-CimInstance Win32_Process -Filter "Name = 'java.exe'" -ErrorAction SilentlyContinue
    foreach ($proc in $javaProcs) {
        $cmd = $proc.CommandLine
        if ($cmd) {
            $isParlor = $false
            if ($cmd -match "parlor") { $isParlor = $true }
            foreach ($s in $serviceNames) {
                if ($cmd -match $s) { $isParlor = $true; break }
            }
            if ($isParlor) {
                Write-Host "Stopping Java process (PID: $($proc.ProcessId))..." -ForegroundColor Cyan
                Stop-Process -Id $proc.ProcessId -Force -ErrorAction SilentlyContinue
            }
        }
    }
} catch {
    # If CIM fails, proceed to port-based termination
}

function Test-PortOnline ($port) {
    $tcp = New-Object System.Net.Sockets.TcpClient
    try {
        $iar = $tcp.BeginConnect("127.0.0.1", $port, $null, $null)
        $wait = $iar.AsyncWaitHandle.WaitOne(500, $false)
        if ($wait -and $tcp.Connected) {
            $tcp.EndConnect($iar)
            return $true
        }
        return $false
    } catch {
        return $false
    } finally {
        $tcp.Close()
    }
}

# Pass 2: Terminate any processes still holding any parlor ports
foreach ($port in $ports) {
    try {
        $conns = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
        foreach ($c in $conns) {
            if ($c.OwningProcess -and $c.OwningProcess -ne 0 -and $c.OwningProcess -ne $PID) {
                try {
                    $proc = Get-Process -Id $c.OwningProcess -ErrorAction SilentlyContinue
                    if ($proc) {
                        Write-Host "Stopping process $($proc.ProcessName) (PID: $($c.OwningProcess)) on port $port..." -ForegroundColor Cyan
                        Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue
                    }
                } catch {}
            }
        }
    } catch {}

    $lines = netstat -ano | Select-String ":$port\s+"
    foreach ($line in $lines) {
        $pidStr = ($line.Line.Trim() -split '\s+')[-1]
        if ($pidStr -and $pidStr -ne "0" -and $pidStr -ne $PID.ToString()) {
            try {
                $proc = Get-Process -Id $pidStr -ErrorAction SilentlyContinue
                if ($proc) {
                    Write-Host "Stopping process $($proc.ProcessName) (PID: $pidStr) on port $port..." -ForegroundColor Cyan
                    Stop-Process -Id $pidStr -Force -ErrorAction SilentlyContinue
                }
            } catch {
                # Ignore if already stopped
            }
        }
    }
}

# Pass 3: Wait up to 10 seconds for sockets to be released cleanly
Write-Host "Waiting for ports to be released..." -ForegroundColor Gray
$timeout = 10
$elapsed = 0
while ($elapsed -lt $timeout) {
    $busy = @()
    foreach ($port in $ports) {
        if (Test-PortOnline $port) {
            $busy += $port
        }
    }
    if ($busy.Count -eq 0) {
        break
    }
    Start-Sleep -Seconds 1
    $elapsed++
}

$stillBusy = @()
foreach ($port in $ports) {
    if (Test-PortOnline $port) {
        $stillBusy += $port
    }
}

if ($stillBusy.Count -eq 0) {
    Write-Host "All services stopped. All ports are free." -ForegroundColor Green
} else {
    Write-Host "Warning: The following ports are still in use: $($stillBusy -join ', ')" -ForegroundColor Red
}
