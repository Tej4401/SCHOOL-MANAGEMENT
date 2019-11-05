const fs = require('fs');
fs.readFile('example.txt', 'utf-8', (err, file) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(file);
    }
});
fs.writeFile('example.txt',"this is an example",(err)=>{
    if (err){
        console.log(err);
    }
    else{
        console.log('file successfully created');
    }
});
fs.readFile('example.txt','utf-8',(err,file) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(file);
    }
});