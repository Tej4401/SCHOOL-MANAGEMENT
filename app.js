const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var MONGO_URI = "mongodb+srv://tej:tpa4401@first-bvv78.gcp.mongodb.net/school?retryWrites=true&w=majority";
var Student = require('./student.js');
var Teacher = require('./teacher.js');
var Parent = require('./parent.js');
// var User = require('./user.js');
const app = express();
let date_ob = new Date();
// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();
cur_date = date + '-' +  month + '-' + year;
// console.log(date, month, year);
var cur_count = 0;
app.set('view engine', 'ejs');
app.set('views', 'views');
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DATABASE connected Properly!'))
    .catch((err) => console.log('Error is ', err.message));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.json());
app.get('/admin-login', (req, res, next) => {
    res.render('admin-login', {
        msg1: "",
        msg2: ""
    });
})
app.post('/admin', (req, res, next) => {
    if (req.body.password == "password") {
        res.render('admin');
    }
})
app.post('/details', (req, res, next) => {
    if (req.body.category == "faculty") {
        res.render('faculty-admin', {
            msg: ""
        });
    }
    else if (req.body.category == "student") {
        res.render('student-admin', {
            msg: ""
        });
    };
})
app.post('/studentDelete', (req, res, next) => {
    Student.deleteOne({ rollno: req.body.rollno }, function (err, question) {
        if (err) {
            console.log(err);
        }
    });
    res.render('deleted');
})
app.post('/facultyDelete', (req, res, next) => {
    Teacher.deleteOne({ teacherid: req.body.teacherid }, function (err, question) {
        if (err) {
            console.log(err);
        }
    });
    res.render('deleted');
})
app.post('/student-view', (req, res, next) => {
    Student.find({ rollno: req.body.rollno })
        .then((student) => {
            if (student.length != 0) {
                res.render('studentAdmin', {
                    name: student[0].name,
                    rollno: student[0].rollno,
                    dob: student[0].dob,
                    sex: student[0].sex,
                    clas: student[0].class,
                    section: student[0].section,
                    msg: ""
                });
            }
            else {
                res.render('student-admin', {
                    msg: "roll number not found"
                });
            }
        })
        .catch(err => {
            console.log('Error is ', err.message);
        })
})
app.post('/faculty-view', (req, res, next) => {
    Teacher.find({ teacherid: req.body.teacherid })
        .then((teacher) => {
            if (teacher.length != 0) {
                res.render('teacherAdmin', {
                    name: teacher[0].name,
                    teacherid: teacher[0].teacherid,
                    courseid: teacher[0].courseid,
                    department: teacher[0].department,
                    contact: teacher[0].contact,
                    msg: ""
                });
            }
            else {
                res.render('faculty-admin', {
                    msg: " teacher id not found"
                });
            }
        })
        .catch(err => {
            console.log('Error is ', err.message);
        })
})
app.get('/student-login', (req, res, next) => {
    res.render('student-login', {
        msg1: "",
        msg2: ""
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
app.get('/department', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'department.html'));
})
app.get('/', (req, res, next) => {
//    cur_count = cur_count + 1;
    // User.find({ date: cur_date })
        // .then((user) => {
        //     if (user.length == 0) {
        //         var user =  new User({
        //             date : cur_date,
        //             count : cur_count
        //         })
        //         user.save()
                // db.collection("User").insertOne(user, function (err, res) {
                //     if (err) throw err;
                //     console.log("1 record inserted");
                //     db.close();  
                // });
        //     }
        //     else {
        //         var update = {
        //             date: cur_date,
        //             count: cur_count 
        //         }
        //         User.updateOne({ date: cur_date }, update)
        //             .then((profile) => {
        //                 // console.log(profile)
        //             })
        //             .catch(err => {
        //                 console.log('Error is ', err.message);
        //             })
        //     }
        // })
        // .catch((err) => console.log('Error is ', err.message));
    res.render('index',{
        loggedIn:false
    });
})
app.get('/home', (req, res, next) => {
    console.log(req.get('COOKIE'))
    res.render('index',{
        loggedIn: true
    });
})
app.get('/profile',(req,res,next)=>{
    console.log(req.get('COOKIE').split(';')[0].trim().split('=')[0])
    Student.find({ rollno: req.get('COOKIE').split(';')[0].trim().split('=')[1] })
        .then((student) => {
                res.render('studentProfile', {
                    name: student[0].name,
                    rollno: student[0].rollno,
                    dob: student[0].dob,
                    sex: student[0].sex,
                    clas: student[0].class,
                    section: student[0].section,
                    msg: ""
                });
        })
        .catch(err => {
            console.log('Error is ', err.message);
        })
})
app.post('/parentPost', (req, res) => {
    Parent.find({ studentid: req.body.studentid, name: req.body.name })
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
    Parent.find({ studentid: req.body.studentid, name: req.body.name })
        .then((parent) => {
            if (parent[0].password == req.body.password) {
                res.render('parentProfile', {
                    name: parent[0].name,
                    studentid: parent[0].studentid,
                    dob: parent[0].dob,
                    contact: parent[0].contact,
                    relation: parent[0].relation,
                    msg: ""
                });
            }
            else {
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
    var update = { name: req.body.newname, studentid: req.body.newstudentid, contact: req.body.newcontact, dob: req.body.newdob }
    Parent.updateOne({ name: req.body.name, studentid: req.body.studentid }, update)
        .then((profile) => {
            // console.log(profile)
        })
        .catch(err => {
            console.log('Error is ', err.message);
        })
    res.render('parentProfile', {
        name: req.body.newname, studentid: req.body.newstudentid, contact: req.body.newcontact, dob: req.body.newdob, relation: req.body.relation, msg: "Updated"
    })
});
app.post('/studentPost', (req, res) => {
    Student.find({ rollno: req.body.rollno })
        .then((student) => {
            if (student.length == 0) {
                var student = new Student(req.body);
                student.save();
                res.render('student-login', {
                    msg1: "Successfully signed up",
                    msg2: ""
                });
            } else {
                res.render('student-login', {
                    msg1: "Rollno already in use",
                    msg2: ""
                });
            }
        })
        .catch((err) => console.log('Error is ', err.message));
});
app.post('/studentUpdate', (req, res) => {
    var update = { name: req.body.newname, rollno: req.body.newrollno, class: req.body.newclass, dob: req.body.newdob, section: req.body.newsection }
    Student.updateOne({ rollno: req.body.newrollno }, update)
        .then((profile) => {
            // console.log(profile)
        })
        .catch(err => {
            console.log('Error is ', err.message);
        })
    res.render('studentProfile', {
        name: req.body.newname, rollno: req.body.newrollno, clas: req.body.newclass, dob: req.body.newdob, section: req.body.newsection, sex: req.body.sex, msg: "updated"
    })
});
app.post('/studentProfile', (req, res) => {
    Student.find({ rollno: req.body.rollno })
        .then((student) => {
            if (student[0].password == req.body.password) {
                res.cookie('loggedIn',req.body.rollno,{
                    httpOnly:true
                });
                // res.cookie('log', true, {
                //     httpOnly: true
                // });
                res.render('studentProfile', {
                    name: student[0].name,
                    rollno: student[0].rollno,
                    dob: student[0].dob,
                    sex: student[0].sex,
                    clas: student[0].class,
                    section: student[0].section,
                    msg: ""
                });
            }
            else {
                res.render('student-login', {
                    msg1: "",
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
                    msg1: "Duplicate Teacher ID",
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
                    msg: ""
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
    var update = { name: req.body.newname, teacherid: req.body.newteacherid, department: req.body.newdepartment, courseid: req.body.newcourseid, contact: req.body.newcontact }
    Teacher.updateOne({ teacherid: req.body.teacherid }, update)
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
