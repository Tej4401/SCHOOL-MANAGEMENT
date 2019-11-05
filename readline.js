const readline = require('readline');
let num1 = 10;
let num2 = 4;
var answer = 14;
const r1 = readline.createInterface({input : process.stdin, output : process.stdout})
r1.question('what is ' + num1 + ' + ' + num2 + ' ?\n',(userInput)=>{
    if(userInput.trim() == answer){
        console.log('correct');
    }
    else{
        console.log('wrong');
    }
    r1.close();
})