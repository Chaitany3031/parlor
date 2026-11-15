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
import {getCategoriesBySalon} from '../../Redux/Category/action'
import { IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';

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

export default function CategoryTable() {
  const dispatch = useDispatch()
  const {salon,category} = useSelector(store=>store)
  useEffect(()=>{
if(salon.salon){
  dispatch(getCategoriesBySalon({jwt:localStorage.getItem('jwt'),
    salonId:salon.salon?.id
  }))
}
  },[salon.salon])
  return (
    <>
   {/* <h1 className="pb-5 font-bold text-xl">Categories</h1> */}
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell align="right">Title</StyledTableCell>
            {/* <StyledTableCell align="right">PRICE</StyledTableCell> */}
            <StyledTableCell align="right">Update</StyledTableCell>
            {/* <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Cancel</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {category.categories.map((item) => (
            <StyledTableRow key={item.name}>
              <StyledTableCell component="th" scope="row">
               <div className='flex gap-1 flex-wrap'>
                <img className='w-20 rounded-md' src={item.image} alt="" />
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">{item.name}</StyledTableCell>
              {/* <StyledTableCell align="right">{row.fat}</StyledTableCell> */}
              <StyledTableCell className='space-y-2' align="right">
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
