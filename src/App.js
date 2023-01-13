//import logo from './logo.svg';
//import './App.css';

import Table from './component/Table'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const App = () => {
  return (
    <div className="App">
      <Box sx={{backgroundColor: '#808080', p:6}}>
        <Grid container justifyContent = 'center'>
          <Grid item xs={12}>
             <Table />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
