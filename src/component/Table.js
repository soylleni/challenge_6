import * as React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import {
  Alert, Button, Grid, TextField,Box, Paper, TableRow, TableHead, TableContainer, 
  TableCell, TableBody, Table, IconButton
} 
from '@mui/material'

const TableDense = () => {
const [data, setData] = useState([])
const [name, setName] = useState('')
const [user, setUser] = useState('')
const [idUser, setIdUser] = useState('')
const [showForm, setShowForm] = useState(true)
const [showAlert, setShowAlert] = useState(false)
const [showButtonSave, setShowButtonSave] = useState(true)
const baseURL = 'http://localhost:3001/usuarios'

const showFormData = () => {
  setShowForm(false)
}

const onChangeName = (event) => { setName(event.target.value)} 
const onChangeUser = (event) => { setUser(event.target.value)}

const save = () => {
  if (name === '' || user === '') {
    setShowAlert(true)
    } else {
      if (!showForm) {
        axios.post('http://localhost:3001/agregar-usuario', {
          nombre: name,
          usuario: user
        }).then((reponse) => {
          setName('')
          setUser('')
          setIdUser('')
          setShowForm(true)
          setShowAlert(false)
          setShowButtonSave(true)
          getData()
        })
      }
    }
}

const getData = async () => {
    try {
        const {data: response }= await axios.get(baseURL)
        setData(response)
    } catch (error){
        console.log('Error', error)
    }
}

const edit = ((obj) => {
  setShowForm(false)
  setShowButtonSave(false)
  setName(obj.nombre)
  setUser(obj.usuario)
  setIdUser(obj.idusuarios)
})

const update = (() => {
  if (user === '' || name === '') {
    setShowAlert(true)
  } else {
    axios.put(`http://localhost:3001/actualizar-usuario/${idUser}`, {
      nombre: name,
      usuario: user
    }).then(() => {
      setName('')
      setUser('')
      setIdUser('')
      setShowForm(true)
      setShowAlert(false)
      setShowButtonSave(true)
      getData()
    })
  }
})

const cancel = (() => {
  setShowForm(true)
  setName('')
  setUser('')
  setIdUser('')
  setShowButtonSave(true)
  setShowAlert(false)
})

const deleteUser = (() => {
  axios.delete(`http://localhost:3001/eliminar-usuario/${idUser}`).then(() =>{
    setShowForm(true)
    setName('')
    setUser('')
    setIdUser('')
    setShowButtonSave(true)
    setShowAlert(false)
    getData()
  })
})

useEffect(() =>{
    getData()
}, [])


  return (
    <Box>
      {
        !showForm &&
        <Grid container >
          <Grid item xs={12}>
            {
              showAlert &&
                <Alert severity="warning">Debes de llenar todos los campos</Alert>
            }
          </Grid>
          <Grid sx={{ mt:8}} item xs={4}>
            <TextField  
              value={name}
              onChange={onChangeName} 
              id="outlined-basic" 
              label="Nombre del usuario" 
              variant="outlined" />
          </Grid>
          <Grid sx={{ mt:8}} item xs={6}>
            <TextField 
              value={user}
              onChange={onChangeUser} 
              id="outlined-basic" 
              label="Usuario" 
              variant="outlined" />
          </Grid>
        
          {
            showButtonSave ?
            
            <Grid container>
              <Grid sx={{ mt:4}} item xs={2}>
                <Button onClick={() => {cancel()}} color="error" variant="outlined">cancelar</Button>
              </Grid>
              <Grid sx={{ mt:4}} item xs={8}>
                <Button onClick={() => {save()}} variant="outlined">Guardar</Button>
              </Grid>
            </Grid>
            :
            <Grid container>
              <Grid sx={{ mt:4}} item xs={2}>
                <Button onClick={() => {cancel()}} color="error" variant="outlined">cancelar</Button>
              </Grid>

              <Grid sx={{ mt:4}} item xs={4}>
                <Button onClick={() => {update()}} variant="outlined">Actualizar</Button>
              </Grid>

              <Grid sx={{ mt:4}} item xs={4}>
                <Button onClick={() => {deleteUser()}} color="error" variant="outlined">Eliminar</Button>
              </Grid>

            </Grid>
          }
        </Grid>
      }
      
      {
        showForm &&
        <Grid container >
          <Grid item sx={{ mb:4}}>
            <Button onClick={() => {showFormData()}} variant="outlined">Crear Usuario</Button>
          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>ID usuario</TableCell>
                  <TableCell align="right">Nombre</TableCell>
                  <TableCell align="right">Usuario</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.idusuarios}
                    onClick={() => {edit(row)}}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.idusuarios}
                    </TableCell>
                    <TableCell align="right">{row.nombre}</TableCell>
                    <TableCell align="right">{row.usuario}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      }
    </Box>
  );

}

export default TableDense