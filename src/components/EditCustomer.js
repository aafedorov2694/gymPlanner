import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function EditCustomer(props){
    const [open, setOpen] = React.useState(false);
    const[customer, setCustomer] = React.useState({
      firstname:'', lastname:'', streetaddress:'',  postcode:'', city:'', email:'', phone:''
    })

  const handleClickOpen = () => {
    console.log(props.params)
    setCustomer({firstname: props.params.data.firstname, lastname: props.params.data.lastname, streetaddress: props.params.data.streetaddress,  postcode: props.params.data.postcode, 
      city: props.params.data.city, email: props.params.data.email, phone: props.params.data.phone})
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleInputChange = (event) =>{
    setCustomer({...customer,[event.target.name]: event .target.value})
  }

  const editCustomer = () =>{
    props.editCustomer(props.params, customer);
   handleClose();
   
  }

    return(
        <div>
            <Button  color="primary" onClick={handleClickOpen}>
          Edit 
          </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit customer</DialogTitle>
            <DialogContent>
            
                <TextField
                    autoFocus
                    margin="dense"
                    name="firstname"
                    value={customer.firstname}
                    onChange = {e => handleInputChange(e)}
                    label="Firstname"
                    fullWidth
                /> 

                <TextField
                   
                    margin="dense"
                    name="lastname"
                    value={customer.lastname}
                    onChange = {e => handleInputChange(e)}
                    label="lastname"
                    fullWidth
                /> 
                <TextField
                   
                   margin="dense"
                   name="streetadress"
                   value={customer.streetaddress}
                   onChange = {e => handleInputChange(e)}
                   label="streetadress"
                   fullWidth
               />
               <TextField
                   
                   margin="dense"
                   name="postcode"
                   value={customer.postcode}
                   onChange = {e => handleInputChange(e)}
                   label="postcode"
                   fullWidth
               />
               <TextField
                   
                   margin="dense"
                   name="city"
                   value={customer.city}
                   onChange = {e => handleInputChange(e)}
                   label="city"
                   fullWidth
               />
               <TextField
                   
                   margin="dense"
                   name="email"
                   value={customer.email}
                   onChange = {e => handleInputChange(e)}
                   label="email"
                   fullWidth
               />
               <TextField
                   
                   margin="dense"
                   name="phone"
                   value={customer.phone}
                   onChange = {e => handleInputChange(e)}
                   label="phone"
                   fullWidth
               />
            </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editCustomer} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
        </div>
    );
}
