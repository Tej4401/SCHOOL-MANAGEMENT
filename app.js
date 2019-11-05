const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var MONGO_URI = "mongodb+srv://tej:tpa4401@first-bvv78.gcp.mongodb.net/school?retryWrites=true&w=majority";
var Student = require('./student.js');
var Teacher = require('./teacher.js');
var Parent = require('./parent.js');
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },)
    .then(() => console.log('DATABASE connected Properly!'))
    .catch((err) => console.log('Error is ', err.message));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.json());
app.get('/student-login', (req, res, next) => {
    res.render('student-login',{
        msg1:"",
        msg2:""
    });
})
app.get('/teacher-login', (req, res, next) => {
    res.render('teacher-login', {
        msg1: "",
        msg2: ""
    });    
})
app.get('/parent-login', (req, res, next) => {
    res.render('parent-login', {
        msg1: "",
        msg2: ""
    });
})
app.get('/department',(req,res,next)=>{
    res.sendFile(path.join(__dirname, 'department.html'));
})
app.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
})
app.post('/parentPost', (req, res) => {
    Parent.find({studentid: req.body.studentid, name:req.body.name})
        .then((parent) => {
            if (parent.length == 0) {
                var parent = new Parent(req.body);
                parent.save();
                res.render('parent-login', {
                    msg1: "Successfully signed up",
                    msg2: ""
                });
            }
            else {
                res.render('parent-login', {
                    msg1: "Rollno already in use",
                    msg2: ""
                });
            }
        })
        .catch((err) => console.log('Error is ', err.message));
});
app.post('/parentProfile', (req, res) => {
    Parent.find({studentid: req.body.studentid, name:req.body.name})
        .then((parent) => {
            if (parent[0].password == req.body.password)  {
                res.render('parentProfile', {
                    name: parent[0].name,
                    studentid: parent[0].studentid,
                    dob: parent[0].dob,
                    contact: parent[0].contact,
                    relation: parent[0].relation,
                    msg: ""
                });
            }
            else{
                res.render('parent-login', {
                    msg1: "",
                    msg2: "Wrong password"
                });
            }
        })
        .catch(err => {
            console.log('Error is ', err.message);
        })
});
app.post('/parentUpdate', (req, res) => {
    var update = {name: req.body.newname, studentid: req.body.newstudentid, contact: req.body.newcontact, dob: req.body.newdob}
    Parent.updateOne({name: req.body.name, studentid: req.body.studentid}, update)
        .then((profile) => {
            // console.log(profile)
        })
        .catch(err => {
            console.log('Error is ', err.message);
        })
    res.render('parentProfile', {
        name: req.body.newname, studentid: req.body.newstudentid, contact: req.body.newcontact, dob: req.body.newdob, relation:req.body.relation, msg:"Updated"})
});
app.post('/studentPost', (req, res) => {
    Student.find({rollno:req.body.rollno})
        .then((student) => {
            if (student.length==0){
                var student = new Student(req.body);
                student.save();
                res.render('student-login', {
                    msg1: "Successfully signed up",
                    msg2: ""
                });
            }else{
                res.render('student-login', {
                    msg1: "Rollno already in use",
                    msg2: ""
                });
            }
        })
        .catch((err) => console.log('Error is ', err.message));
});
app.post('/studentUpdate',(req,res)=>{
    var update = {name: req.body.newname, rollno: req.body.newrollno, class: req.body.newclass, dob: req.body.newdob, section: req.body.newsection}
    Student.updateOne({rollno:req.body.newrollno}, update)
    .then((profile)=>{
        // console.log(profile)
    })
    .catch(err=>{
        console.log('Error is ', err.message);
    })
    res.render('studentProfile', {
        name: req.body.newname, rollno: req.body.newrollno, clas: req.body.newclass, dob: req.body.newdob, section: req.body.newsection, sex:req.body.sex, msg: "updated"
    })
});
app.post('/studentProfile', (req, res) => {
    Student.find({ rollno: req.body.rollno })
        .then((student) => {
            if (student[0].password == req.body.password) {
                res.render('studentProfile', {
                    name: student[0].name,
                    rollno: student[0].rollno,
                    dob: student[0].dob,
                    sex: student[0].sex,
                    clas: student[0].class,
                    section: student[0].section,
                    msg:""            
                });
            }
            else {
                res.render('student-login', {
                    msg1: "Teacher ID already in use",
                    msg2: "Wrong password"
                });
            }
        })
        .catch(err => {
            console.log('Error is ', err.message);
        })
})
app.post('/teacherPost', (req, res) => {
    Teacher.find({ teacherid: req.body.teacherid })
        .then((teacher) => {
            if (teacher.length == 0) {
                var teacher = new Teacher(req.body);
                teacher.save();
                res.render('teacher-login', {
                    msg1: "Successfully signed up",
                    msg2: ""
                });
            }
            else {
                res.render('student-login', {
                    msg1: "",
                    msg2: ""
                });
            }
        })
        .catch((err) => console.log('Error is ', err.message));
});
app.post('/teacherProfile', (req, res) => {
    Teacher.find({ teacherid: req.body.teacherid })
        .then((teacher) => {
            if (teacher[0].password == req.body.password) {
                res.render('teacherProfile', {
                    name: teacher[0].name,   
                    teacherid: teacher[0].teacherid,         
                    courseid: teacher[0].courseid,           
                    department: teacher[0].department,        
                    contact: teacher[0].contact,
                    msg:""
                });
            }
            else {
                res.render('teacher-login', {
                    msg1: "",
                    msg2: "Wrong password"
                });
            }
        })
        .catch(err => {
            console.log('Error is ', err.message);
        })
});
app.post('/teacherUpdate', (req, res) => {
    var update = {name: req.body.newname, teacherid: req.body.newteacherid, department: req.body.newdepartment, courseid: req.body.newcourseid, contact: req.body.newcontact}
    Teacher.updateOne({teacherid: req.body.teacherid}, update)
        .then((profile) => {
            // console.log(profile)
        })
        .catch(err => {
            console.log('Error is ', err.message);
        })
    res.render('teacherProfile', {
        name: req.body.newname, teacherid: req.body.newteacherid, department: req.body.newdepartment, courseid: req.body.newcourseid, contact: req.body.newcontact,
        msg: "updated"
    });
});
app.listen(3000);