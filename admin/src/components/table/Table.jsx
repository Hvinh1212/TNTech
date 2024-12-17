import "./table.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import Iphone11 from "../pic/iphone11pro.jpg"
const List = () => {
  const rows = [
    {
      id: 1143155,
      product: "Acer Nitro 5",
      img: "../pic/iphone11pro.jpg",
      
      order_date: "1 March",
      total_emoney: 34000000,
      status: "Approved",
    },
    
    {
      id: 1143156,
      product: "Acer Nitro 5",
      img: "../pic/iphone11pro.jpg",
      
      order_date: "1 March",
      total_emoney: 34000000,
      status: "Approved",
    },
    {
      id: 1143157,
      product: "Acer Nitro 5",
      img: "../pic/iphone11pro.jpg",
      order_date: "1 March",
      total_emoney: 34000000,
      status: "Approved",
    },

    {
      id: 1143158,
      product: "Acer Nitro 5",
      img: "../pic/iphone11pro.jpg",
      
      order_date: "1 March",
      total_emoney: 34000000,
      status: "Approved",
    }

  ]

    


  return (
    <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="tableCell">Mã giao dịch</TableCell>
          <TableCell align="tableCell">Sản phẩm</TableCell>
          <TableCell align="tableCell">Ngày</TableCell>
          <TableCell align="tableCell">Tổng tiền</TableCell>
          <TableCell align="tableCell">Trạng thái</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.calories}</TableCell>
            <TableCell align="right">{row.fat}</TableCell>
            <TableCell align="right">{row.carbs}</TableCell>
            <TableCell align="right">{row.protein}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

  )
}

export default List;
