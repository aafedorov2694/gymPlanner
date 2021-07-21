import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer';
import Training from './components/Training';
import Tabs from'@material-ui/core/Tabs';
import Tab  from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import { useState } from 'react';

function App() {
  const [value, setValue] = useState('customer')
  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div className="App">
     
     <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab value = "customer" label="customer" />
          <Tab value = "training" label="training" />

        </Tabs>       
      </AppBar>
      {value ===   'customer'&&  <Customer/>}
      {value ===   'training'&&   <Training/>}

    </div>
  );
}

export default App;
