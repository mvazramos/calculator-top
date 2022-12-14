const inputScreen = document.getElementById("input");
const resultScreen = document.getElementById("result")
const deleteButton =  document.getElementById("delete");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

let inputArray = [];
let result=0;

const operations = ["÷","*","+","-"]

const buttonsDictionary = {
    "seven":"7",
    "eight":"8",
    "nine":"9",
    "four":"4",
    "five":"5",
    "six":"6",
    "one":"1",
    "two":"2",
    "three":"3",
    "zero":"0",
    "dot":".",
    "divide":"÷",
    "add":"+",
    "subtract":"-",
    "multiply":"*"
};

const numpadKeyDict = {
    "Numpad7":"7",
    "Numpad8":"8",
    "Numpad9":"9",
    "Numpad4":"4",
    "Numpad5":"5",
    "Numpad6":"6",
    "Numpad1":"1",
    "Numpad2":"2",
    "Numpad3":"3",
    "Numpad0":"0",
    "NumpadDecimal":".",
    "NumpadDivide":"÷",
    "NumpadAdd":"+",
    "NumpadSubtract":"-",
    "NumpadMultiply":"*"
}


for (let key in buttonsDictionary){

    let button = document.getElementById(key);

    button.addEventListener("click", (e)=>{
        
        addArray(buttonsDictionary[key]);

        inputScreen.innerHTML=printOperationsArray(inputArray);
    });
}


document.addEventListener('keyup', (e) => {

    let code = e.code;
    if(numpadKeyDict.hasOwnProperty(code)){
        addArray(numpadKeyDict[code]);

        inputScreen.innerHTML=printOperationsArray(inputArray);
    }
    else if(code==="Backspace"){
        let a;
        if(inputArray.length>0){
            a =inputArray.pop();
            
            if(a.length>1){
                a=a.slice(0,a.length-1);
                inputArray.push(a);
            }
            inputScreen.innerHTML=printOperationsArray(inputArray)
        }
    }else if(code==="Delete"){
        inputArray=[];
        inputScreen.innerHTML="";
        resultScreen.innerHTML="";
    }else if(code==="Enter" || code==="NumpadEnter"){
        result  = compute(inputArray);

        if(result!=="Error"){
            inputArray = [result.toString()]; 
            if(result === 0){
                inputArray=[];
                result=0;
            }
        }

        resultScreen.innerHTML= result;
    }else{
        console.log(e);
    }

  });



deleteButton.addEventListener("click",(e)=>{    
    let a;
    if(inputArray.length>0){
        a =inputArray.pop();
        
        if(a.length>1){
            a=a.slice(0,a.length-1);
            inputArray.push(a);
        }
        inputScreen.innerHTML=printOperationsArray(inputArray)
    }
   
})

clearButton.addEventListener("click", (e)=>{
    inputArray=[];
    inputScreen.innerHTML="";
    resultScreen.innerHTML="";
})

equalsButton.addEventListener("click",(e)=>{
    result  = compute(inputArray);

    if(result!=="Error"){
        inputArray = [result.toString()]; 
        if(result === 0){
            inputArray=[];
            result=0;
        }
    }


    resultScreen.innerHTML= result;
    
})


function addArray(x){
    
    tempIndex = inputArray.length-1;

    if(inputArray.length===0) {
        if(!operations.includes(x)){
            inputArray.push(x);
        }
    }


    else if(!operations.includes(x)){

        if(!operations.includes(inputArray[tempIndex])){
            inputArray[tempIndex] += x;
        }
        else{
            inputArray.push(x);
        }

    }

    else if(operations.includes(x)){
        if(!operations.includes(inputArray[tempIndex])){
            inputArray.push(x);
        }
        
    }
    

}


function printOperationsArray(arr){
    let temp="";
    for (let i = 0; i < arr.length; i++) {
        temp+=arr[i]
    }
    return temp 
}


function add(x,y){
    return x+y;
}

function subtract(x,y){
    return x-y;
}

function multiply(x,y){
    return x*y;
}

function divide(x,y){
    return x/y;
}


function findIndexes(arr, value){
    let index_array=[]

    for (let i = 0; i < arr.length; i++) {
        if(arr[i]===value){
            index_array.push(i)
        }
        
    }
    
    return index_array;

}


function compute(arrInput){

    arr = [...arrInput];
    arr = convertToNumeric(arr);
    let total=0;


    lastIndex = arr.length-1
    if(lastIndex<0){

        return "Error";

    }
    else if(lastIndex>0){


        if(operations.includes(arr[lastIndex])){

            return "Error";

        }
    }
    


    for (let j = 0; j < operations.length; j++) {

        let temp = findIndexes(arr,operations[j])
        let size = temp.length

        let i=0

        while(i<size) {

                let prev =temp[0]-1
                let post =temp[0]+1

                if(operations[j]==="÷"){
                    total=divide(parseFloat(arr[prev]),parseFloat(arr[post]));
                }
                else if(operations[j]==="+"){
                    total=add(parseFloat(arr[prev]),parseFloat(arr[post]));
                }
                else if(operations[j]==="-"){
                    total=subtract(parseFloat(arr[prev]),parseFloat(arr[post]));
                }
                else if(operations[j]==="*"){
                    total=multiply(parseFloat(arr[prev]),parseFloat(arr[post]));
                }


                arr.splice(prev,3,total);
                
                if (findIndexes(arr,operations[0]).length>0){
                    
                    temp = findIndexes(arr,operations[0])
                }

            i++;  
        }
    
        
    }

    return Math.round(arr[0]*1000)/1000;
}


function convertToNumeric(arr){
    let temp = []
    for (let i = 0; i < arr.length; i++) {
        let x = parseFloat(arr[i])
        if(!Number.isNaN(x)){
            temp.push(x);
        }else{
            temp.push(arr[i]);
        }
        
    }
    return temp;
}

