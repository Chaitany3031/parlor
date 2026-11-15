import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchServicesBySalonId } from '../../Redux/ServiceOffering/action';
import IconButton from '@mui/material/IconButton';
import Edit from '@mui/icons-material/Edit';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ServiceTable() {
  const dispatch = useDispatch()
  const {salon,service} =   useSelector(store=>store)
  useEffect(()=>{
    if(salon.salon){
    dispatch(
      fetchServicesBySalonId({
        salonId:salon.salon.id,
        jwt: localStorage.getItem('jwt'),
        categotyId:null
      }))
      dispatch(getCategoriesBySalon({jwt:localStorage.getItem('jwt'),
    salonId:salon.salon?.id
  }))
    }
  },[salon.salon])
  
  return (
   <>
   <h1 className="pb-5 font-bold text-xl">Services</h1>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell align="right">Title</StyledTableCell>
            <StyledTableCell align="right">PRICE</StyledTableCell>
            <StyledTableCell align="right">Update</StyledTableCell>
            {/* <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Cancel</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {service.services.map((service) => (
            <StyledTableRow key={service.name}>
              <StyledTableCell component="th" scope="row">
               <div className='flex gap-1 flex-wrap'>
                <img className='w-20 rounded-md' src={service.image} alt="" />
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">{service.name}</StyledTableCell>
              <StyledTableCell align="right">{service.price }</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton>
                   <Edit/>
                </IconButton>
              </StyledTableCell>
             {/* <StyledTableCell align="right">{row.protein}</StyledTableCell>
             <StyledTableCell align="right">{row.protein}</StyledTableCell>  */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </>
  );
}
