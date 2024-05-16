import React from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import html2canvas from 'html2canvas'
import { Box, Button, Typography, Modal, IconButton } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentIcon from '@mui/icons-material/Assignment';
import axios from 'axios';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CloseIcon from '@mui/icons-material/Close';

export default function LeaveList() {
  const [leaves, setLeaves] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [employees, setEmployees] = React.useState([])
  
  const fetchLeaves = async () => {
    try {
      //setIsLoading(true)
      const response = await axios.get(`http://localhost:8000/leave/get`);
      console.log(response.data)
      if (response.data.success) {
        setLeaves(response.data.leaves)
        //setIsLoading(false)
      }
    } catch (err) {
      
    }
  };

  const fetchEmployees = async () => {
        try {
        const response = await axios.get(`http://localhost:8000/employee/get`);
        if (response.data.success) {
            setEmployees(response.data.employees);
        }
        } catch (error) {
            console.error('Error fetching employee ID:', error);
        
        }
    };

  React.useEffect(() => {
    
    fetchEmployees();
    fetchLeaves();
  }, [])

  const getEmpIDByEmployeeID = (employeeID) => {
    const employee = employees.find(emp => emp._id === employeeID);
    
    return employee ? employee.empID : null;
  };
    
  const generatePDF = () => {
    const purchasesTable = document.getElementById('leave-table')
    const {height, width} = purchasesTable.getBoundingClientRect()
    
    const pdf = new jsPDF()

    const columns = [
      { header: '#', dataKey: 'index', width: 10 },
      { header: 'ID', dataKey: 'empID', width: 30 },
      { header: 'Name', dataKey: 'fullName', width: 40 },
      { header: 'NIC', dataKey: 'nic', width: 30 },
      { header: 'Email', dataKey: 'email', width: 50 },
      { header: 'Phone', dataKey: 'phone', width: 35 },
      { header: 'Phone', dataKey: 'phone', width: 35 },
    ];

    /*const columns = [];
    for (let i = 0; i < 7; i++) {
        columns.push({ header: `Column ${i + 1}`, dataKey: `col${i}` });
    }*/

    
    const imageURL = 'https://th.bing.com/th/id/OIP.Fovxe7kh1rac-cPjxRbqBgAAAA';
    //const scaleFactor = pdf.internal.pageSize.width / width
    pdf.autoTable({
      html: '#leave-table',
      startY: 42,
      theme: 'grid',
      margin: { top: 20, bottom: 20,  },
      tableWidth: 182 ,
      columnStyles: {
          0: { fontStyle: 'bold' },
      },
      //scaleFactor: scaleFactor,
      columns,
        
    })
    fetch(imageURL)
    .then(response => response.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;

        // Add the image to the PDF document
        pdf.addImage(base64data, 'JPEG', 10, 10, 100, 100); // adjust position and size as needed

        
      };
    });
    pdf.setFontSize("28")
    pdf.setTextColor("#010075")
    pdf.text("KDU Employee Management System",22,25)
    pdf.setFontSize("16")
    pdf.setTextColor("Black")
    pdf.text("All Leaves",95,36)
    pdf.save("KDU - All Leaves.pdf")
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
        sx={{border: '0px solid'}}
      >
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "80%",
            height: "90%",
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            overflowY: 'auto',
            border: 'none',
            position:'relative'
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              color: '#000',
              padding: 20,
              textAlign: 'center',
              border: '1px solid',
              borderColor: '#000',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              minHeight:'88%'
            }}
          >
            <h1 style={{ color: '#010075', marginBottom: '-10px' }}>KDU Employee Management System</h1>
            <h2 style={{fontWeight: 500}}>All Registered Employees</h2>
            <table id='leave-table' style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #19bc9b', padding: '8px', fontWeight: 'bold', backgroundColor: '#19bc9b' }}>#</th>
                  <th style={{ border: '1px solid #19bc9b', padding: '8px', fontWeight: 'bold', backgroundColor: '#19bc9b' }}>Employee</th>
                  <th style={{ border: '1px solid #19bc9b', padding: '8px', fontWeight: 'bold', backgroundColor: '#19bc9b' }}>Category</th>
                  <th style={{ border: '1px solid #19bc9b', padding: '8px', fontWeight: 'bold', backgroundColor: '#19bc9b' }}>From</th>
                  <th style={{ border: '1px solid #19bc9b', padding: '8px', fontWeight: 'bold', backgroundColor: '#19bc9b' }}>To</th>
                  <th style={{ border: '1px solid #19bc9b', padding: '8px', fontWeight: 'bold', backgroundColor: '#19bc9b' }}>Reason</th>
                  <th style={{ border: '1px solid #19bc9b', padding: '8px', fontWeight: 'bold', backgroundColor: '#19bc9b' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((row, index) => (
                  <tr key={row._id}>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{index+1}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{getEmpIDByEmployeeID(row.employee)}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{row.category}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{row.startDate}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{row.endDate}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{row.reason}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <IconButton sx={{ position: 'absolute', color: 'text.primary', top: 0, right: 0, display:'none' }}><CloseIcon /></IconButton>
          <Box sx={{display: 'flex', gap: 2,}}>
            <Button variant="contained" sx={{ textTransform: 'none', mt: 2, width: '50%' }} onClick={handleClose}><CloseIcon/>&nbsp;Close</Button>
            <Button variant="contained" color='success' sx={{ textTransform: 'none', mt: 2, width: '50%' }} onClick={generatePDF}><FileDownloadIcon/>&nbsp;Download</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
