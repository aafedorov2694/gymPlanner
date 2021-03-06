import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddCustomer(props){
    const [open, setOpen] = React.useState(false);
    const[customer, setCustomer] = React.useState({
      firstname:'', lastname:'', streetadress:'',  postcode:'', city:'', email:'', phone:''
    })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleInputChange = (event) =>{
    setCustomer({...customer,[event.target.name]: event.target.value})
  }

  const saveCustomer = () =>{
    props.addCustomer(customer);
    handleClose();
  }

    return(
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add Customer
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New customer</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="firstname"
              value={customer.firstname}
              onChange = {handleInputChange}
              label="Firstname"
              fullWidth
             /> 

            <TextField
              margin="dense"
              name="lastname"
              value={customer.lastname}
              onChange = {handleInputChange}
              label="lastname"
              fullWidth
            /> 
            <TextField
              margin="dense"
              name="streetadress"
              value={customer.streetadress}
              onChange = {handleInputChange}
              label="streetadress"
              fullWidth
             />
              <TextField
                   
                   margin="dense"
                   name="postcode"
                   value={customer.postcode}
                   onChange = {handleInputChange}
                   label="postcode"
                   fullWidth
               />
               <TextField
                   
                   margin="dense"
                   name="city"
                   value={customer.city}
                   onChange = {handleInputChange}
                   label="city"
                   fullWidth
               />
               <TextField
                   
                   margin="dense"
                   name="email"
                   value={customer.email}
                   onChange = {handleInputChange}
                   label="email"
                   fullWidth
               />
               <TextField
                   
                   margin="dense"
                   name="phone"
                   value={customer.phone}
                   onChange = {handleInputChange}
                   label="phone"
                   fullWidth
               />
            </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={saveCustomer} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    );
}
