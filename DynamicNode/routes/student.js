const express = require('express');
const router = express.Router()
const mysql = require('mysql')
router.get('/messages', (reqm, res)=>{
    console.log('show some messages or whatever');
    res.end()
}) 
 
router.post('/stdReg', (req, res)=>{
    console.log('Trying to Reg new student');
    
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const course = req.body.course;
    const cno = req.body.cno;
    const gender = req.body.gender;
    const quali = req.body.q; 
    var resq = quali + ',';
    const city = req.body.city;
    const dob = req.body.dob;
    const favc = req.body.favc;
    const range = req.body.range;

    // for(var i = 0; i < 3; i++){
    //     if(quali[i].checked === true){
    //         resq += quali[i].value + ' ';
    //     }
    // }
//    for(let r in quali){
//        resq += r +' ';
//    }

    // console.log(fname + ' ' + lname + ' '+ email + ' ' + course + ' ' + cno + ' ' + quali + ' '+ gender)

    const sql = 'INSERT INTO student VALUES ?'
    const values = [['null', fname, lname, email, course, cno, resq, gender, city, dob, favc, range] ];
    getConn().query(sql, [values], (err, results, fields)=>{
        if(err){
            console.log('failed to Reg new student : ', err)
            // res.redirect()
            res.sendStatus(500)  
            return 
        }
        // if(err) throw err;
        console.log('Inserted new Student ', results.insertId)
        res.end();
    })
    res.redirect('/next.html')
    res.end();
})

function getConn(){
    return mysql.createConnection({
        host: 'localhost',
        user : 'root',
        password: '',
        database: 'NodeDB'
    });
}

module.exports = router