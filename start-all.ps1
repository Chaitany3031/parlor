# Starts all microservices in the project in correct dependency order
$env:JAVA_HOME = "C:\Users\chaitanya\.jdks\ms-17.0.20.1"
if (-not $env:JAVA_HOME -or -not (Test-Path "$env:JAVA_HOME\bin\java.exe")) {
    if (Test-Path "C:\Users\chaitanya\.jdks\ms-17.0.20.1\bin\java.exe") {
        $env:JAVA_HOME = "C:\Users\chaitanya\.jdks\ms-17.0.20.1"
    }
}

$javaBin = if ($env:JAVA_HOME -and (Test-Path "$env:JAVA_HOME\bin\java.exe")) {
    "$env:JAVA_HOME\bin\java.exe"
} else {
    "java.exe"
}

$logDir = "$PSScriptRoot\logs"
if (!(Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir -Force | Out-Null
}

function Test-PortOnline ($port) {
    $tcp = New-Object System.Net.Sockets.TcpClient
    try {
        $iar = $tcp.BeginConnect("127.0.0.1", $port, $null, $null)
        $wait = $iar.AsyncWaitHandle.WaitOne(800, $false)
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

$services = @(
    @{ Name = "eureka-server";   Jar = "eureka-server\target\eureka-server-0.0.1-SNAPSHOT.jar";       Port = 8070; Stagger = 0 },
    @{ Name = "gateway-server";  Jar = "gateway-server\target\gateway-server-0.0.1-SNAPSHOT.jar";     Port = 5000; Stagger = 4 },
    @{ Name = "user-service";    Jar = "user-service\target\user-service-0.0.1-SNAPSHOT.jar";         Port = 5001; Stagger = 4 },
    @{ Name = "salon-service";   Jar = "salon-service\target\salon-service-0.0.1-SNAPSHOT.jar";       Port = 5002; Stagger = 4 },
    @{ Name = "category-service";Jar = "category-service\target\category-service-0.0.1-SNAPSHOT.jar"; Port = 5003; Stagger = 4 },
    @{ Name = "service-offering";Jar = "service-offering\target\service-offering-0.0.1-SNAPSHOT.jar"; Port = 5004; Stagger = 4 },
    @{ Name = "booking-service"; Jar = "booking-service\target\booking-service-0.0.1-SNAPSHOT.jar";   Port = 5005; Stagger = 4 },
    @{ Name = "payment-service"; Jar = "payment-service\target\payment-service-0.0.1-SNAPSHOT.jar";   Port = 5006; Stagger = 4 },
    @{ Name = "notifications";   Jar = "notifications\target\notifications-0.0.1-SNAPSHOT.jar";       Port = 5007; Stagger = 4 },
    @{ Name = "review";          Jar = "review\target\review-0.0.1-SNAPSHOT.jar";                     Port = 5008; Stagger = 4 }
)

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Starting Parlor Microservices Architecture" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 0. Check Keycloak Authentication Provider
Write-Host "`n[0/3] Checking Keycloak Service on port 8080..." -ForegroundColor Cyan
if (Test-PortOnline 8080) {
    Write-Host "Keycloak is ONLINE on port 8080!" -ForegroundColor Green
} else {
    Write-Host "Keycloak is OFFLINE on port 8080. Checking Docker container..." -ForegroundColor Yellow
    try {
        $kcContainer = docker ps -a --filter "ancestor=quay.io/keycloak/keycloak:26.8.0" --format "{{.ID}}" 2>$null
        if (-not $kcContainer) {
            $kcContainer = docker ps -a --filter "name=keycloak" --format "{{.ID}}" 2>$null
        }
        if (-not $kcContainer) {
            $kcContainer = docker ps -a --filter "name=vigilant_swirles" --format "{{.ID}}" 2>$null
        }
        if ($kcContainer) {
            Write-Host "Starting Keycloak container ($kcContainer)..." -ForegroundColor Yellow
            docker start $kcContainer | Out-Null
            $kcTimeout = 30
            $kcElapsed = 0
            while (-not (Test-PortOnline 8080) -and ($kcElapsed -lt $kcTimeout)) {
                Start-Sleep -Seconds 2
                $kcElapsed += 2
                Write-Host "." -NoNewline -ForegroundColor Gray
            }
            Write-Host ""
            if (Test-PortOnline 8080) {
                Write-Host "Keycloak is now ONLINE on port 8080!" -ForegroundColor Green
            } else {
                Write-Host "Warning: Keycloak did not bind port 8080 yet. Auth requests might fail." -ForegroundColor Yellow
            }
        } else {
            Write-Host "Warning: Keycloak container not found. Ensure Keycloak is running on port 8080 for Auth." -ForegroundColor Yellow
        }
    } catch {
        Write-Host "Warning: Could not check Docker for Keycloak: $_" -ForegroundColor Yellow
    }
}

# 1. Start Eureka Server first and wait for it to be ready
$eureka = $services[0]
$eurekaJar = Join-Path $PSScriptRoot $eureka.Jar
if (-not (Test-Path $eurekaJar)) {
    Write-Host "Error: Jar not found at $eurekaJar! Run 'mvn clean package -DskipTests' first." -ForegroundColor Red
    exit 1
}

if (Test-PortOnline $eureka.Port) {
    Write-Host "`n[1/3] $($eureka.Name) is ALREADY running on port $($eureka.Port)!" -ForegroundColor Green
} else {
    Write-Host "`n[1/3] Starting $($eureka.Name) on port $($eureka.Port)..." -ForegroundColor Yellow
    Start-Process -FilePath $javaBin `
        -ArgumentList "-Xms32m -Xmx160m -XX:TieredStopAtLevel=1 -jar `"$eurekaJar`"" `
        -RedirectStandardOutput (Join-Path $logDir "$($eureka.Name).log") `
        -RedirectStandardError (Join-Path $logDir "$($eureka.Name).err.log")

    Write-Host "Waiting for Eureka Server to bind port $($eureka.Port)..." -NoNewline -ForegroundColor Gray
    $eurekaTimeout = 40
    $elapsed = 0
    while (-not (Test-PortOnline $eureka.Port) -and ($elapsed -lt $eurekaTimeout)) {
        Start-Sleep -Seconds 2
        $elapsed += 2
        Write-Host "." -NoNewline -ForegroundColor Gray
    }
    Write-Host ""

    if (Test-PortOnline $eureka.Port) {
        Write-Host "Eureka Server is ONLINE on port $($eureka.Port)!" -ForegroundColor Green
        Start-Sleep -Seconds 2
    } else {
        Write-Host "Warning: Eureka Server did not bind port within $eurekaTimeout seconds. Check logs\eureka-server.log" -ForegroundColor Yellow
    }
}

# 2. Launch downstream microservices
Write-Host "`n[2/3] Launching Downstream Microservices..." -ForegroundColor Cyan
for ($i = 1; $i -lt $services.Count; $i++) {
    $svc = $services[$i]
    $jarPath = Join-Path $PSScriptRoot $svc.Jar
    if (-not (Test-Path $jarPath)) {
        Write-Host "Warning: Jar not found for $($svc.Name) at $jarPath" -ForegroundColor Red
        continue
    }

    if (Test-PortOnline $svc.Port) {
        Write-Host "$($svc.Name) is ALREADY running on port $($svc.Port)." -ForegroundColor Green
        continue
    }

    Write-Host "Launching $($svc.Name) (Port $($svc.Port))..." -ForegroundColor Yellow
    Start-Process -FilePath $javaBin `
        -ArgumentList "-Xms32m -Xmx160m -XX:TieredStopAtLevel=1 -jar `"$jarPath`"" `
        -RedirectStandardOutput (Join-Path $logDir "$($svc.Name).log") `
        -RedirectStandardError (Join-Path $logDir "$($svc.Name).err.log")

    if ($svc.Stagger -gt 0) {
        Start-Sleep -Seconds $svc.Stagger
    }
}

# 3. Dynamic polling until all services come online
Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "Monitoring Service Startup Status" -ForegroundColor Cyan
Write-Host "Spring Boot microservices take ~25-45s to initialize." -ForegroundColor Gray
Write-Host "==========================================" -ForegroundColor Cyan

$pollTimeout = 90
$pollInterval = 3
$elapsed = 0

$onlineStatus = @{}
foreach ($svc in $services) {
    $onlineStatus[$svc.Port] = (Test-PortOnline $svc.Port)
    if ($onlineStatus[$svc.Port]) {
        Write-Host ("  [ONLINE]  {0,-20} (Port {1})" -f $svc.Name, $svc.Port) -ForegroundColor Green
    }
}

while ($elapsed -lt $pollTimeout) {
    $allOnline = $true
    foreach ($svc in $services) {
        $port = $svc.Port
        if (-not $onlineStatus[$port]) {
            if (Test-PortOnline $port) {
                $onlineStatus[$port] = $true
                Write-Host ("  [ONLINE]  {0,-20} (Port {1})" -f $svc.Name, $port) -ForegroundColor Green
            } else {
                $allOnline = $false
            }
        }
    }

    if ($allOnline) {
        break
    }

    Start-Sleep -Seconds $pollInterval
    $elapsed += $pollInterval
}

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "Final Microservice Status Summary:" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

$offlineCount = 0
foreach ($svc in $services) {
    $port = $svc.Port
    $isOnline = Test-PortOnline $port
    if ($isOnline) {
        Write-Host ("  {0,-20} [Port {1}] : ONLINE" -f $svc.Name, $port) -ForegroundColor Green
    } else {
        $offlineCount++
        Write-Host ("  {0,-20} [Port {1}] : OFFLINE (Check logs\$($svc.Name).log)" -f $svc.Name, $port) -ForegroundColor Red
    }
}

if ($offlineCount -eq 0) {
    Write-Host "`nAll 10 services are ONLINE and ready!" -ForegroundColor Green
} else {
    Write-Host "`n$offlineCount service(s) are OFFLINE. Review the corresponding log files in the 'logs' folder." -ForegroundColor Yellow
}
