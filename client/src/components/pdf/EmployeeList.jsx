import React from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import html2canvas from 'html2canvas'
import { Box, Button, Typography, Modal } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentIcon from '@mui/icons-material/Assignment';
import axios from 'axios';

export default function EmployeeList() {
  const [employees, setEmployees] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = React.useState(true);
  
  const getEmployees = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`http://localhost:8000/employee/get`);
      console.log(response.data)
      if (response.data.success) {
        setEmployees(response.data.employees)
        setIsLoading(false)
      }
    } catch (err) {
      
    }
  };

  React.useEffect(() => {
    

    getEmployees();
  }, [])
    
  const generatePDF = () => {
    const purchasesTable = document.getElementById('purchasesTable')
    const {height, width} = purchasesTable.getBoundingClientRect()
    
    const pdf = new jsPDF()

    const columns = [];
    for (let i = 0; i < 7; i++) {
        columns.push({ header: `Column ${i + 1}`, dataKey: `col${i}` });
    }

    

    const scaleFactor = pdf.internal.pageSize.width / width
    pdf.autoTable({
        html: '#purchasesTable',
        startY: 42,
        theme: 'grid',
        margin: { top: 20, bottom: 20,  },
        tableWidth: 550 * scaleFactor,
        columnStyles: {
            0: { fontStyle: 'bold' },
        },
        scaleFactor: scaleFactor,
        columns,

        })
    pdf.setFontSize("28")
    pdf.setTextColor("#ff5520")
    pdf.text("Encore Thirfting Store",58,25)
    pdf.setFontSize("16")
    pdf.setTextColor("Black")
    pdf.text("Details of All Other Purchases",69,38)
    pdf.save("All Other Purchases.pdf")
  }
  return (
    <div>
      <ListItemButton onClick={handleOpen}>
        <ListItemIcon>
            <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Employee List" />
      </ListItemButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box 
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}
        >
          {/*<table>
            <thead>
                <tr>
                <th sx={{fontWeight: 700}}>#</th>
                <th sx={{fontWeight: 700}}>ID</th>
                <th sx={{fontWeight: 700}}>Name</th>
                <th sx={{fontWeight: 700}}>NIC</th>
                <th sx={{fontWeight: 700}}>Email</th>
                <th sx={{fontWeight: 700}}>Phone</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((row, index) => (
                <tr key={row._id}>
                    <td>{index+1}</td>
                    <td>{row.empID}</td>
                    <td>{row.fullName}</td>
                    <td>{row.nic}</td>
                    <td>{row.email}</td>
                    <td>{row.phone}</td>
                </tr>
                ))}
            </tbody>
            </table>*/}
        </Box>
      </Modal>
    </div>
  )
}
