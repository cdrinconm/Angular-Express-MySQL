const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_fletx'
});

app.post('/usuarios', (req, res) =>{
    const {usuario, contrasena, email} = req.body;
    db.query('INSERT INTO usuarios (usuario, contrasena, email) VALUES (?, ?, ?)', [usuario, contrasena, email], (err, result) => {
        if(err) return res.json(err);
        res.json(result);
    })
})

app.get('/usuarios', (req, res) =>{
    db.query('SELECT * FROM usuarios', (err, result) => {
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

app.listen(3000, ()=>{
    console.log('Servidor corriendo en puerto 3000')
})