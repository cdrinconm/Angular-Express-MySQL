const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const cors = require('cors');

const key = "Prueba Tecnica FletX";
let tokenVigente = "";
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_fletx'
});

app.listen(3000, ()=>{
    console.log('Servidor corriendo en puerto 3000')
})

app.post('/login', (req, res) =>{
    const {usuario, contrasena} = req.body;
    db.query('SELECT * FROM usuarios', (err, result) => {
        if(err) return res.json(err);
        let found = false;
        for (var i = 0; i < result.length; i++) {
            if(result[i].usuario == usuario && result[i].contrasena == contrasena/*result[i].contrasena == bcrypt.hashSync(contrasena)*/){
                found = true;
                break;
            }
        }
        res.json({access: found, token: found ? createToken({usuario:usuario, contrasena:contrasena}) : ""});
    })
})

app.get('/usuarios', validarJWT, (req, res) =>{
    db.query('SELECT * FROM usuarios', (err, result) => {
        if(err) return res.json(err);
        res.json(result);
    })
})

app.post('/usuarios', (req, res) =>{
    //req.body.contrasena = bcrypt.hashSync(req.body.contrasena);
    const {usuario, contrasena, email} = req.body;
    db.query('INSERT INTO usuarios (usuario, contrasena, email) VALUES (?, ?, ?)', [usuario, contrasena, email], (err, result) => {
        if(err) return res.json(err);
        res.json(result);
    })
})

app.put('/usuarios/:id', (req, res) =>{
    const {id} = req.params;
    const {usuario, contrasena, email} = req.body;
    db.query('UPDATE usuarios SET usuario=?, contrasena=?, email=? WHERE id=?', [usuario, contrasena, email, id], (err, result) => {
        if(err) return res.json(err);
        res.json(result);
    })
})

app.delete('/usuarios/:id', (req, res) =>{
    const {id} = req.params;
    db.query('DELETE FROM usuarios WHERE id=?', [id], (err, result) => {
        if(err) return res.json(err);
        res.json(result);
    })
})

function createToken(payload){
    tokenVigente = jwt.sign(
        payload, 
        key,
        { expiresIn: '2h' }
    )
    return tokenVigente;
}

function validarJWT(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ mensaje: 'Token requerido' });
  }

  // El header suele llegar como: "Bearer <token>"
  const tokenLimpio = token.split(' ')[1];

  jwt.verify(tokenLimpio, key, (err, decoded) => {
    console.log("**********Token**********")
    console.log("Token Usuario:"+ decoded.usuario)
    console.log("Token Contraseña:"+ decoded.contrasena)
    console.log("**********Token**********")
    console.log("Token Servicio:"+ tokenLimpio)
    console.log("Token Express:"+ tokenVigente)
    if (err) {
      return res.status(403).json({ mensaje: 'Token inválido o expirado' });
    }
    next();
  });
}