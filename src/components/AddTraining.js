import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {DateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'; 


export default function AddTraining(props){
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = useState(new Date());
    const[trainings, setTrainings] = React.useState({
      customer: props.params.value,
      date: '',
      duration: '',
      activity: ''
     
    })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleInputChange = (event) =>{
    setTrainings({...trainings,[event.target.name]: event.target.value})
  }
  const addDate = (date) => {
    setDate(date);
    setTrainings({...trainings, date: date.toISOString()});
}

  const addTraining = () =>{
    props.addTrainings(trainings);
    handleClose();
  }

    return(
        <div>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Add 
            Training
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">New training</DialogTitle>
          <DialogContent>
            
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker label="Date" format='dd.MM.yyyy HH:mm' onChange={date => addDate(date)} name="date" value={date} id="date"  />
            </MuiPickersUtilsProvider> 
            
              <TextField
                margin="dense"
                name="duration"
                value={trainings.duration}
                onChange = {handleInputChange}
                label="duration"
                fullWidth
              /> 
              <TextField
                margin="dense"
                name="activity"
                value={trainings.activity}
                onChange = {handleInputChange}
                label="activity"
                fullWidth
              />
              
            </DialogContent>
        
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={addTraining} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    );
}
