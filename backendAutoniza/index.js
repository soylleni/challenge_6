const express = require('express')
const mysql = require('mysql')
const app = express()
app.use(express.json())

const conexionBD = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'vehiculos'
})

/* Los campos de la BD establecida fueron:
      id_vehiculo
      nombre_vehiculo
      anio_fabricacion
      valor_vehiculo
      cantidad
 */

//métodos get

app.get('/', (req,res) => {
    res.send('Bienvenidos vendedores, recuerden que Autoniza se lo garantiza. Esta es la app de control de inventarios. ')
})

app.get('/vehiculos-bd', (req, res) => {
    const sql = 'SELECT * from vehiculos.vehiculos_bd'

    conexionBD.query(sql, (error, results) => {
      if (error) throw error
      if (results.length > 0) {
        res.json(results)
      } else {
        res.send('No hay datos disponibles. Revisar base de datos de vehículos disponibles para venta')
      }
    })
  
})

app.get('/vehiculos-bd/:id_vehiculo', (req, res) => {
    
    const id_vehiculo = req.params.id_vehiculo
    const sql = `SELECT * FROM vehiculos.vehiculos_bd WHERE id_vehiculo = ${id_vehiculo}`
    conexionBD.query(sql, (error, results) => {
        if (error) throw error
        if (results.length > 0) {
            res.json(results)
          } else {
            res.send('No hay datos disponibles del id seleccionado')}
    })
   
})

//método post


app.post('/agregar-vehiculo',(req,res) => {
    const sql ='INSERT INTO vehiculos.vehiculos_bd SET ?'
    
    const vehiculoObj ={
      id_vehiculo:req.body.id_vehiculo,
      nombre_vehiculo: req.body.nombre_vehiculo,
      anio_fabricacion: req.body.anio_fabricacion,
      valor_vehiculo: req.body.valor_vehiculo,
      cantidad: req.body.cantidad
    }

    conexionBD.query(sql, vehiculoObj, error => {
      if(error) throw error
      res.send('Vehículo agregado a nuestra base de datos con exito. a venderrrr!')
    })

    console.log(vehiculoObj)

    
})


//método put

app.put('/actualizar-vehiculo/:id_vehiculo',(req, res) => {
    const id_vehiculo = req.params.id_vehiculo
    const {nombre_vehiculo, anio_fabricacion,valor_vehiculo,cantidad} = req.body
    const sql = `UPDATE vehiculos.vehiculos_bd SET nombre_vehiculo = '${nombre_vehiculo}', anio_fabricacion = '${anio_fabricacion}', valor_vehiculo ='${valor_vehiculo}', cantidad ='${cantidad}' where id_vehiculo = '${id_vehiculo}' `
    conexionBD.query(sql, error => {
      if(error) throw error
      res.send(`El vehículo con el Id ${req.params.id_vehiculo} fue actualizado con éxito.`)

    })
})




//Conexión a localhost

app.listen(3001, () => {
    console.log('Servidor en el puerto 3001 :)')
})