import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalonBookings } from '../../Redux/Booking/action';

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

const formatDateTime = (isoString) => {
  if (!isoString) return 'N/A';
  try {
    const parts = isoString.split('T');
    return `${parts[0]} ${parts[1] ? parts[1].substring(0, 5) : ''}`;
  } catch (e) {
    return isoString;
  }
};

export default function TransactionTable() {
  const dispatch = useDispatch();
  const { booking } = useSelector((store) => store);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      dispatch(fetchSalonBookings(jwt));
    }
  }, [dispatch]);

  const bookingsList = booking?.bookings || [];

  return (
    <div>
      <div className="flex justify-between items-center pb-5">
        <h1 className="font-bold text-2xl text-gray-800">Salon Transactions</h1>
        <span className="text-sm text-gray-500">Transactions count: {bookingsList.length}</span>
      </div>

      <TableContainer component={Paper} className="shadow-md rounded-lg">
        <Table sx={{ minWidth: 650 }} aria-label="transactions table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Booking ID</StyledTableCell>
              <StyledTableCell>Customer</StyledTableCell>
              <StyledTableCell>Services</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="center">Payment Method</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {booking?.loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" className="py-10">
                  <CircularProgress size={30} />
                  <p className="text-gray-500 mt-2">Loading transactions...</p>
                </TableCell>
              </TableRow>
            ) : bookingsList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" className="py-10 text-gray-500">
                  No transactions recorded yet.
                </TableCell>
              </TableRow>
            ) : (
              bookingsList.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell>
                    {formatDateTime(item.startTime)}
                  </StyledTableCell>
                  <StyledTableCell>
                    #{item.id}
                  </StyledTableCell>
                  <StyledTableCell>
                    <p className="font-medium">{item.customer?.fullName || item.user?.fullName || `Customer #${item.customerId}`}</p>
                    <p className="text-xs text-gray-400">{item.customer?.email || item.user?.email || ''}</p>
                  </StyledTableCell>
                  <StyledTableCell>
                    {item.services && item.services.length > 0
                      ? item.services.map((s) => s.name).join(', ')
                      : 'General Service'}
                  </StyledTableCell>
                  <StyledTableCell align="right" className="font-bold text-green-700">
                    ₹{item.totalPrice}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Chip label="ONLINE (Razorpay)" size="small" variant="outlined" color="primary" />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Chip
                      label={item.status === 'CANCELLED' ? 'FAILED' : 'PAID'}
                      color={item.status === 'CANCELLED' ? 'error' : 'success'}
                      size="small"
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
