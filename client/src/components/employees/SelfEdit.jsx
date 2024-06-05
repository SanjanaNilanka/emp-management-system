import { Box, TextField, Grid, Button, Toolbar, Container, Paper, InputAdornment, MenuItem, Snackbar, Alert, useTheme } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';

export default function SelfEdit() {
  const [qualifications, setQualifications] = React.useState([{qualification: '', description: '', achivedIn: ''}]);

  const handleAddQualificationsInput = () => {
    setQualifications([...qualifications, {qualification: '', description: '', achivedIn: ''}]); 
  };

  const handleRemoveQualificationsInput = (index) => {
    const newInputs = qualifications.filter((_, i) => i !== index); 
    setQualifications(newInputs); 
    };
    
  const updateQualification = (index, value) => {
    const updateQualifications = [...qualifications];
    updateQualifications[index].qualification = value;
    setQualifications(updateQualifications);
  }

  const updateDescription = (index, value) => {
    const updateQualifications = [...qualifications];
    updateQualifications[index].description = value;
    setQualifications(updateQualifications);
  }

  const updateAchivedIn = (index, value) => {
    const updateQualifications= [...qualifications];
    updateQualifications[index].achivedIn = value;
    setQualifications(updateQualifications);
  } 


  const handleQualificationsInputChange = (index, value) => {
    const newInputs = [...qualifications]; 
    newInputs[index] = value; 
    setQualifications(newInputs); 
  };
  
  const theme = useTheme();
    
  const navigate = useNavigate();
  
  const [toastMsg, setToastMsg] = React.useState('')

  const [open, setOpen] = React.useState(false);
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const { id } = useParams();
  const [employee, setEmployee] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getEmployee = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`http://localhost:8000/employee/get/${id}`);
      console.log(response.data.employee)
      if (response.data.success) {
          setEmployee(response.data.employee)
          const updatedQualifications = response.data.employee.qualifications.map((qualification) => ({
            ...qualification,
            achivedIn: qualification.achivedIn.slice(0, 10)
          }));
          setQualifications(updatedQualifications)
        setIsLoading(false)
      }
    } catch (err) {
      
    }
  };

  React.useEffect(() => {
    

    getEmployee();
  }, [])
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
      
    const empData = {
      fullName: employee.fullName,
      empID: employee.empID,
      nic: employee.nic,
      email: employee.email,
      address: employee.address,
      phone: employee.phone,
      workExperience: employee.workExperience,
      marriageStates: employee.marriageStates,
      qualifications: qualifications,
      gender: employee.gender,
      startDate: employee.startDate,
      dob: employee.dob,
      department: employee.department,
      position: employee.position,
      user: employee.user
    };
    console.log(empData)

    try {
      const response = await axios.put(`http://localhost:8000/employee/update/${id}`, empData);
      if (response.data.success) {
        setToastMsg('Employee is updated successfully');
        setOpen(true);
        navigate('/');
      } else {
        setToastMsg('Something went wrong, Employee was not apdated');
        setOpen(true);
      }
    } catch (err) {
        setToastMsg('Something went wrong, Employee was not updated'+ err.message);
        setOpen(true);
    }
  };
  
  const marriageStates = [
    {
        value: 'choose_one',
        label: 'Choose One',
    },
    {
        value: 'married',
        label: 'Married',
    },
    {
        value: 'unmarried',
        label: 'Unmarried',
    },
  ];
  
  const genderTypes = [
    {
        value: 'choose_one',
        label: 'Choose One',
    },
    {
        value: 'female',
        label: 'Female',
    },
    {
        value:'male',
        label: 'Male',
    }
  ]
  
  const departments = [
    {
        value: 'choose_one',
        label: 'Choose One',
    },
    {
        value: 'department1',
        label: 'Department 1',
    },
    {
        value: 'department2',
        label: 'Department 2',
    }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value
    });
  };

  return (
    <Box>
      <Toolbar/>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Grid container sx={{display:'flex', alignItems:'center', justifyContent: 'space-between', gap: 2}}>
                        <Grid item xs sx={{width: '50%'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="fullName"
                                label="Full Name"
                                name="fullName"
                                variant='filled'
                                value={employee.fullName}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item sx={{width: '50%'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="empID"
                                label="Employee ID"
                                id="empID"
                                variant='filled'
                                value={employee.empID}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <Grid container sx={{display:'flex', alignItems:'center', justifyContent: 'space-between', gap: 2}}>
                        <Grid item xs sx={{width: '50%'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="nic"
                                label="NIC"
                                name="nic"
                                variant='filled'
                                value={employee.nic}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                                disabled
                            />
                        </Grid>
                        <Grid item sx={{width: '50%'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                label="Email"
                                id="email"
                                variant='filled'
                                value={employee.email}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <Grid container sx={{display:'flex', alignItems:'center', justifyContent: 'space-between', gap: 2}}>
                        <Grid item xs sx={{width: '50%'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="phone"
                                label="Phone"
                                name="phone"
                                variant='filled'
                                value={employee.phone}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item sx={{width: '50%'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="position"
                                label="Position"
                                id="position"
                                variant='filled'
                                value={employee.position}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <Grid container sx={{display:'flex', alignItems:'center', justifyContent: 'space-between', gap: 2}}>
                        <Grid item xs sx={{width: '100%'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="address"
                                label="Address"
                                name="address"
                                variant='filled'
                                value={employee.address}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container sx={{display:'flex', alignItems:'center', justifyContent: 'space-between', gap: 2}}>
                        <Grid item xs sx={{width: '50%'}}>
                            <TextField
                                label="Work Experience"
                                id="workExperience"
                                name="workExperience"
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">Years</InputAdornment>,
                                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                                }}
                                variant="filled"
                                value={employee.workExperience}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item sx={{width: '50%', position:'relative'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="marriageStates"
                                label="Marriage States"
                                id="marriageStates"
                                select
                                defaultValue="choose_one"
                                variant="filled"
                                onChange={handleChange}
                            >
                                {marriageStates.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Box 
                                sx={{
                                    position:'absolute',
                                    top: '40px',
                                    left:'0',
                                    backgroundColor:'background.select',
                                    color:'text.primary',
                                    pl: '12px',
                                    width:'20%'
                                }}
                            >
                                {employee.marriageStates==="married"? "Married" : "Unmarried"}
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container sx={{display:'flex', alignItems:'center', justifyContent: 'space-between', gap: 2}}>
                        <Grid item xs sx={{width: '50%', position: 'relative'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="gender"
                                label="Gender"
                                id="gender"
                                select
                                defaultValue="choose_one"
                                onChange={handleChange}
                                variant="filled"
                                
                            >
                                {genderTypes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Box 
                                sx={{
                                    position:'absolute',
                                    top: '40px',
                                    left:'0',
                                    backgroundColor:'background.select',
                                    color:'text.primary',
                                    pl: '12px',
                                    width:'20%'
                                }}
                            >
                                {employee.gender==="male"? "Male" : "Female"}
                            </Box>
                            
                        </Grid>
                        <Grid item sx={{width: '50%'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="startDate"
                                label="Start Date"
                                id="startDate"
                                variant='filled'
                                type='date'
                                InputProps={{
                                    startAdornment: <InputAdornment position="end"></InputAdornment>,
                                }}
                                
                                value={employee.startDate?.slice(0,10)}
                                onChange={handleChange}
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <Grid container sx={{display:'flex', alignItems:'center', justifyContent: 'space-between', gap: 2}}>
                        <Grid item xs sx={{width: '50%', position:'relative'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="department"
                                label="Department"
                                id="department"
                                select
                                variant="filled"
                                defaultValue="choose_one"
                                onChange={handleChange}
                                disabled
                            >
                                {departments.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Box 
                                sx={{
                                    position:'absolute',
                                    top: '40px',
                                    left:'0',
                                    backgroundColor:'background.selectDisabled',
                                    color:'text.primary',
                                    pl: '12px',
                                    width:'20%'
                                }}
                            >
                                {employee.department}
                            </Box>
                        </Grid>
                        <Grid item sx={{width: '50%'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="dob"
                                label="Date of Birth"
                                id="dob"
                                variant='filled'
                                type='date'
                                InputProps={{
                                    startAdornment: <InputAdornment position="end"></InputAdornment>,
                                }}
                                
                                value={employee.dob?.slice(0,10)}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container sx={{display:'flex', alignItems:'center', justifyContent: 'space-between', gap: 2, flexDirection:'column'}}>
                        {qualifications.map((qualification, index) => (
                            <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, width: '80%' }}>
                                <Grid item sx={{width: '25%'}}>
                                    <TextField
                                        type="text"
                                        id={`qualification${index}`}
                                        name={`qualification${index}`}
                                        margin="normal"
                                        fullWidth
                                        variant='filled'
                                        label='Qualification'
                                        value={qualification.qualification}
                                        onChange={(e) => updateQualification(index, e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item sx={{width: '25%'}}>
                                    <TextField
                                        type="text"
                                        id={`qualification_description_${index}`}
                                        name={`qualification_description_${index}`}
                                        margin="normal"
                                        fullWidth
                                        variant='filled'
                                        label='Description'
                                        value={qualification.description}
                                        onChange={(e) => updateDescription(index, e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item sx={{width: '25%'}}>
                                    <TextField
                                        type="date"
                                        id={`qualification_achivedin_${index}`}
                                        name={`qualification_achivedin_${index}`}
                                        margin="normal"
                                        fullWidth
                                        variant='filled'
                                        label='Achived Date'
                                        value={qualification.achivedIn}
                                        onChange={(e) => updateAchivedIn(index, e.target.value)}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="end"></InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item >
                                    {index > 0 && (
                                        <Box 
                                            
                                        >
                                            <CloseIcon onClick={() => handleRemoveQualificationsInput(index)} width={20} icon="material-symbols:close" />
                                        </Box>
                                    )}
                                </Grid>
                                
                            </Grid>
                        ))}
                        <Button onClick={handleAddQualificationsInput} sx={{textTransform:'none'}} variant='outlined'>Add Qualification</Button>
                    </Grid>
                    
                    
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 6, backgroundColor:'primary.main', textTransform: 'none' }}
                    >
                        Submit
                    </Button>
                    <Snackbar
                        open={open}
                        autoHideDuration={3000} // Automatically close after 30000ms (30 seconds)
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                    >
                        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                            {toastMsg}
                        </Alert>
                    </Snackbar>
                </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
