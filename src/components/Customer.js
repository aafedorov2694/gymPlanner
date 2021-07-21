import React, {useEffect, useState, useRef} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

export default function Customer(){
   const[customer, setCustomer] = useState([]);
   const [open, setOpen] = useState(false);
   const [msg, setMsg] = useState('List of customers');

   const gridRef = useRef();

   const columns = [
    {headerName: 'First Name', field: 'firstname', sortable: true, filter: true, width: 130},
    {headerName: 'Last Name', field: 'lastname', sortable: true, filter: true, width: 140},
    {headerName: 'Street address', field: 'streetaddress', sortable: true, filter: true, width: 160},
    {headerName: 'Postcode', field: 'postcode', sortable: true, filter: true, width: 130},
    {headerName: 'City', field: 'city', sortable: true, filter: true, width: 115},
    {headerName: 'Email', field: 'email', sortable: true, filter: true, width: 180},
    {headerName: 'Phone', field: 'phone', sortable: true, filter: true, width: 140},    
    {
        headerName: '',
        width: 200,
        cellRendererFramework: rowData => <EditCustomer editCustomer ={editCustomer} params={rowData}/>,
        
    },
    {
        headerName: '',
        width: 150,
        field:'links.0.href',
        cellRendererFramework: params => <Button color="secondary" size="small" onClick={() => deleteCustomer(params.value)}>Delete</Button>,

    },
    {
        headerName: '',
        width: 200,
        field:'links.0.href',
        cellRendererFramework: params => <AddTraining addTrainings = {addTrainings} params={params} />,

    }   
    
]


   const getCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomer(data.content))
    .then(_=> setOpen(true))
    .catch(err => console.error(err))
}



   const deleteCustomer = (link) => {
        
    if (window.confirm('Are you sure you want to delete this customer?')) {
        fetch(link, {
            method: 'DELETE'
        })
        .then(_ => getCustomers())
        .then(_ => setMsg('Customer was deleted successfully'))
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
   } 
}


   const addCustomer = (customer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
        method: 'POST', 
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(customer)
    })
    .then(_=> getCustomers())  
    .then(_=> setMsg("Customer is added succefully!"))
    .then(_=> setOpen(true))
    .catch(err => console.error(err))
   }

   const addTrainings = (training) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(training)
    })
        .then(_ => getCustomers())
        .then(_ => setMsg('New Training Added'))
        .then(_ => setOpen(true))
        .catch(err => console.log(err))
}
  
  

   const editCustomer = (link, customer) => {
    fetch (link.data.links[0].href, {
        method: 'PUT',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(customer)
    })
    .then(_ => getCustomers())
    .then(_ => setMsg('Edit successful'))
    .then(_ => setOpen(true))
    .catch(err => console.error(err))
       
   }

      
      
       const handleClose = () => {
           setOpen(false);
       }
      
       useEffect(() => {
        getCustomers();
        
       }, [])
    
    
    return (
          
            
            <div >
         
                <div style = {{width: '15%', paddingTop: 15, margin:'auto'}}>
                     <AddCustomer  addCustomer={addCustomer} />
         
                </div>


                 <div className = "ag-theme-material" style = {{height: '800px', width: '98%'}}>
                     <AgGridReact
                     ref = {gridRef}
                     onGridReady = {params => {
                     gridRef.current = params.api
                     params.api.sizeColumnsToFit();
                      }}
                     suppressCellSelection={true} 
                     columnDefs = {columns}
                     rowData = {customer}
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
        
            </div>
        
        
    )
}