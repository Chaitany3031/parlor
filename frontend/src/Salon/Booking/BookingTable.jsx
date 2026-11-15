import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalonBookings, updateBookingStatus } from '../../Redux/Booking/action';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1b263b',
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const getStatusColor = (status) => {
  switch (status) {
    case 'CONFIRMED':
      return 'success';
    case 'COMPLETED':
      return 'primary';
    case 'CANCELLED':
      return 'error';
    case 'PENDING':
    default:
      return 'warning';
  }
};

const formatDateTime = (isoString) => {
  if (!isoString) return 'N/A';
  try {
    const parts = isoString.split('T');
    const date = parts[0];
    const time = parts[1] ? parts[1].substring(0, 5) : '';
    return `${date} ${time}`;
  } catch (e) {
    return isoString;
  }
};

export default function BookingTable() {
  const dispatch = useDispatch();
  const { booking } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      dispatch(fetchSalonBookings(jwt));
    }
  }, [dispatch]);

  const handleOpenMenu = (event, bookingId) => {
    setAnchorEl(event.currentTarget);
    setSelectedBookingId(bookingId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedBookingId(null);
  };

  const handleStatusChange = (status) => {
    if (selectedBookingId) {
      dispatch(
        updateBookingStatus({
          bookingId: selectedBookingId,
          status,
          jwt: localStorage.getItem('jwt'),
        })
      );
    }
    handleCloseMenu();
  };

  const bookingsList = booking?.bookings || [];

  return (
    <div>
      <div className="flex justify-between items-center pb-5">
        <h1 className="font-bold text-2xl text-gray-800">Salon Bookings</h1>
        <span className="text-sm text-gray-500">Total Bookings: {bookingsList.length}</span>
      </div>

      <TableContainer component={Paper} className="shadow-md rounded-lg">
        <Table sx={{ minWidth: 700 }} aria-label="salon bookings table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Booking ID</StyledTableCell>
              <StyledTableCell>Services</StyledTableCell>
              <StyledTableCell align="left">Date & Time</StyledTableCell>
              <StyledTableCell align="left">Price</StyledTableCell>
              <StyledTableCell align="left">Customer</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {booking?.loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" className="py-10">
                  <CircularProgress size={30} />
                  <p className="text-gray-500 mt-2">Loading bookings...</p>
                </TableCell>
              </TableRow>
            ) : bookingsList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" className="py-10 text-gray-500">
                  No bookings found for this salon yet.
                </TableCell>
              </TableRow>
            ) : (
              bookingsList.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    #{item.id}
                  </StyledTableCell>
                  <StyledTableCell>
                    <div className="flex flex-wrap gap-1">
                      {item.services && item.services.length > 0 ? (
                        item.services.map((service, idx) => (
                          <Chip
                            key={idx}
                            label={service.name}
                            size="small"
                            variant="outlined"
                          />
                        ))
                      ) : (
                        <span className="text-gray-400">General Service</span>
                      )}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <p className="font-medium">{formatDateTime(item.startTime)}</p>
                    {item.endTime && (
                      <p className="text-xs text-gray-400">to {formatDateTime(item.endTime).split(' ')[1]}</p>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left" className="font-semibold text-green-700">
                    ₹{item.totalPrice}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <p className="font-medium">{item.customer?.fullName || item.user?.fullName || `User #${item.customerId}`}</p>
                    <p className="text-xs text-gray-400">{item.customer?.email || item.user?.email || ''}</p>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Chip
                      label={item.status || 'PENDING'}
                      color={getStatusColor(item.status)}
                      size="small"
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={(e) => handleOpenMenu(e, item.id)}
                    >
                      Update
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleStatusChange('CONFIRMED')}>
          Mark Confirmed
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('COMPLETED')}>
          Mark Completed
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('CANCELLED')} sx={{ color: 'error.main' }}>
          Mark Cancelled
        </MenuItem>
      </Menu>
    </div>
  );
}
