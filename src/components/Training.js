import React, {useEffect, useState, useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment/moment';

export default function Trainings(){
    const[training, setTraining] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('List of trainings');
    const handleClose = () => {
        setOpen(false);
    }
   
   
    
    const gridRef = useRef();
    
  
    
    
         const columns = [
            {headerName: 'Date', field: 'date', sortable: true, filter: true, cellRenderer:(data) => {
                return moment(data.value).format('dd.MM.yyyy HH:mm')
            }, width: 200},            
            {headerName: 'Duration', field: 'duration', sortable: true, filter: true, width: 200},
            {headerName: 'Activity', field: 'activity', sortable: true, filter: true, width: 150 },
            {
             headerName: '',
             field: 'links.0.href',
             cellRendererFramework: params => <Button color="secondary" size="small" onClick={() => deleteTraining(params.value)}>Delete</Button>,
             width: 200
            }
    
        ]  

        const getTraining = () => {
            fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(data => setTraining(data.content))
            .then(_ => setOpen(true))
            .catch(err => console.error(err))
             
        }
    
        const deleteTraining = (link) =>{
            fetch(link, {method: 'DELETE'})
            .then(_ => getTraining())
            .catch(err => console.error(err))
        }

        useEffect(() => {
            getTraining();
            
           }, []);

     return (

         

          <div className = "ag-theme-material" style = {{height: '800px', width: '48%', marginLeft: 350}}>
              <AgGridReact
              ref = {gridRef}
              onGridReady = {params => {
              gridRef.current = params.api
              params.api.sizeColumnsToFit();
               }}
              suppressCellSelection={true} 
              columnDefs = {columns}
              rowData = {training}
              pagination = {true}
             paginationPageSize = {10} >

             </AgGridReact>
             <Snackbar
               open={open}
                autoHideDuration={1500}
                onClose={handleClose}
                message={msg}
         />
        
        </div>
        
         
 
 

       
     )
 }
