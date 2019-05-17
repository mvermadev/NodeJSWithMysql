const express = require('express');
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))
app.use(morgan('combined'))

// app.post('/stdReg', (req, res)=>{
//     console.log('Trying to Reg new student');
    
//     const fname = req.body.fname;
//     const lname = req.body.lname;
//     const email = req.body.email;
//     const course = req.body.course;
//     const cno = req.body.cno;

//     // console.log(fname + ' ' + lname + ' '+ email + ' ' + course + ' ' + cno)

//     const sql = 'INSERT INTO student VALUES ?'
//     const values = [['null', fname, lname, email, course, cno] ];
//     getConn().query(sql, [values], (err, results, fields)=>{
//         if(err){
//             console.log('failed to Reg new student : ', err)
//             res.sendStatus(500)
//             return
//         }
//         if(err) throw err;
//         console.log('Inserted new Student ', results.insertId)
//         res.end();
//     })
//     res.end();
// })

function getConn(){
    return mysql.createConnection({
        host: 'localhost',
        user : 'root',
        password: '',
        database: 'NodeDB'
    });
}

// CREATING DB:
// conn.connect((err)=>{
//     if(err) throw err;
//     console.log('Connnected');
//     // create database
//     const db = 'CREATE DATABASE NodeDB';
//     conn.query(db, (err, res)=>{
//         if(err) throw err;
//         console.log('Database created');
//     });
// });

// CREATING TABLE:
// conn.connect((err)=>{
//     if(err) throw err;
//     console.log('Connected');
//     const sql = 'CREATE TABLE student (id INT AUTO_INCREMENT PRIMARY KEY, fname VARCHAR(50),lname VARCHAR(50), email VARCHAR(100), course VARCHAR(50), cno INT)';
//     conn.query(sql, (err)=>{
//         if(err) throw err;
//         console.log('Table created');
//     })
// })

// INSERTING DATA:
// conn.connect((err)=>{
//     if(err) throw err;
//     console.log('Connected');
//     const sql = 'INSERT INTO student VALUES ?';
//     const values = [
//         ['null', 'steve', 'jobs', 'steve@apple.com', 'BBA', 9999999999]
//     ];
//     conn.query(sql, [values], (err, res)=>{
//         if(err) throw err;
//         console.log('Data inserted : ', res.affectedRows);
//     })
// })

const router = require('./routes/student')

app.use(router)

//Fetch all students
app.get('/student', (req, res)=>{
    console.log('Fetching user with id: ', req.params.id)

    const sql = 'SELECT * FROM student'
    // const vl = req.params.id
    getConn().query(sql, (err, rows, fields)=>{
        if(err){
            console.log('Failed to query for users ', err);
            res.status(500)
            res.end();
            return;
        }
        console.log('I think we fetch student succesfully');
        res.json(rows);
        
    })
})

//Fetch Student with ID
app.get('/student/:id', (req, res)=>{
    console.log('Fetching user with id: ', req.params.id)

    const sql = 'SELECT * FROM student WHERE id = ?'
    // const vl = req.params.id
    getConn().query(sql, [req.params.id], (err, rows, fields)=>{
        if(err){
            console.log('Failed to query for users ', err);
            res.status(500)
            res.end();
            return;
        }
        console.log('I think we fetch student succesfully');
        res.json(rows);
        
    })
})

app.get('/', (req,res)=>{
    console.log('responding to root route');
    res.send('Your node is successfully setup');
})

app.listen(3333, ()=>{
    console.log('server running port is 3333');
})