//Declarations
// import searchBox from './search-module'; // Imp;orting a function from a module

const btn = document.getElementById("myButton");
const searchBox = document.querySelector("#searchBox");
const puzzleText = document.getElementById("enterText");
const puzzleTable = document.querySelector('#puzzleTable');
const introSection = document.querySelector(".intro")
const searchArea = document.querySelector(".searchArea");
const result = document.querySelector("#searchResult");
const  allLilnesObj = new Object();
// const puzzleTableReverse = document.querySelector('#puzzleTableReverse');
let puzzleString, columnNum ;

let horizontal_L_R = [], horizontal_R_L = [], 
vertical_T_B = [], vertical_B_T = [], 
diagonal_TL_BR = [], diagonal_BR_TL = [], 
diagonal_BL_TR = [], diagnoal_TR_BL  = []
allLines =[];

// Add Event listner to the button click event.
btn.addEventListener('click', myButtonClicked); // On click call the myButtonclicked function

searchBox.addEventListener("keyup", checkStringLength);

searchBox.addEventListener("keyup", checkStringLength);

searchBox.addEventListener('keydown', enterbuttonClicked);
function enterbuttonClicked(event){
    
     if (event.key === 'Enter') {
        // Prevent the default action (e.g., form submission and page reload)
        event.preventDefault();
        // console.log('Enter key pressed! Action triggered.');
    }
}

// Button click function
function myButtonClicked (event) {
    event.preventDefault(); // Prevent the default behaviour of the button
    btn.disabled = true; // Disable the button after submit
    puzzleText.disabled = true;
    introSection.classList.add("hideMe");
    searchArea.classList.remove("hideMe");
    
    puzzleString = puzzleText.value.toUpperCase();
    columnNum = puzzleString.search(',');
   
    createArray(puzzleString);
    createTable(horizontal_L_R, puzzleTable); //Create the table
    
    createReverse(horizontal_L_R, horizontal_R_L);
    // createTable(horizontal_R_L, puzzleTableReverse); //Create the reverse table for testing

    createVertical(horizontal_L_R, vertical_T_B);
    createReverse(vertical_T_B, vertical_B_T);

    createDiagonal(horizontal_L_R, diagonal_BL_TR);
    createReverse(diagonal_BL_TR, diagnoal_TR_BL);

    createDiagonal(horizontal_R_L, diagonal_BR_TL);
    createReverse(diagonal_BR_TL, diagonal_TL_BR);

// allLines = [horizontal_L_R, horizontal_R_L, vertical_T_B, vertical_B_T, diagonal_BL_TR, diagnoal_TR_BL, diagonal_TL_BR, diagonal_BR_TL]

// Adding the arrays to all lines Object as properties
allLilnesObj.horizontal_L_R = horizontal_L_R;
allLilnesObj.horizontal_R_L = horizontal_R_L;
allLilnesObj.vertical_T_B = vertical_T_B;
allLilnesObj.vertical_B_T = vertical_B_T;
allLilnesObj.diagonal_BL_TR  = diagonal_BL_TR;
allLilnesObj.diagnoal_TR_BL = diagnoal_TR_BL;
allLilnesObj.diagonal_TL_BR = diagonal_TL_BR;
allLilnesObj.diagonal_BR_TL = diagonal_BR_TL    ;

searchBox.focus();

 }

function createArray(str){
 let item ="";
 for (let i=0; i<=str.length; i++)
    {
        if(str[i]=="," || i==str.length){
            horizontal_L_R.push(item);
            item = "";
            continue;}
        else{ item+= str[i];  }
    }
}

// Function to display the table
function createTable(arr, table){
   table.innerHTML = ''; //Delete the contents of the exsisting table body

    arr.forEach(element => {
        tblRow = document.createElement("tr")
        for (const char of element) {
            tblCell = document.createElement("td")
            tblCell.innerText = char
            tblRow.appendChild(tblCell);
        
        }
        table.appendChild(tblRow);
        });
}

// Function to create reverse array
function createReverse (arr, reverseArr) {
    arr.forEach(element => {
       reverseArr.push([...element].reverse().join('')); //Using the spread operator to reverse the string
    });
    }

// Function to create Vertical array
function createVertical(arr, vertical){
    const len = arr.length;
    let element="";
    for (i=0; i<len; i++){

            for(j=0; j<len; j++){
                element += arr[j][i];
            }
        vertical.push(element);
        element="";       
    }
}


// Function to create Diagonal array
function createDiagonal(arr, diagonal){
    const len = arr.length; // get then length of the array.
    let element="";

// Diagonal assending 
    for (let i=0; i<len; i++){
            // console.log(`i: ${i}`)
            let element="";
            let k=0;
        for(let j=i; j>=0; j--){
           element += arr[j][k];
            // console.log(`j: ${j}`) ; 
            // console.log(`i: ${i}, j: ${j}, k: ${k}`);
            k++;

         }
         diagonal.push(element);
          
    }

    // Diagonal decending
    for (let i=len-1; i>0; i--){
            // console.log(`--------i: ${i}`)
                let element="";
                let k = len-1;
                let a = (k-i+1);
             
            for (let j=1; j<=i; j++ ){
                // console.log(`j: ${j}, k: ${k}, a: ${a}`);
                element += arr[k][a];

                k--;
                a++;

            }
            diagonal.push(element);
    // console.log(`i: ${i}, j: ${j}, k: ${k}`);
         }              
    }


 
function checkStringLength(event){
     event.preventDefault(); 
    // console.log("searchMe function triggered")
    txt = searchBox.value;
    result.innerText = ""

    if (txt.length>2)
    {
        result.innerText = ""
        result.innerText = searchMe(txt.toUpperCase());
    }  
    else {result.innerText = "Enter atleast 3 letters"}



function searchMe(txt) {
 let msg="";
for (const [key, value] of Object.entries(allLilnesObj)){
//  console.log(`${key}: ${value}`);

    for (const item of value)
        if (item.search(txt)>=0){
            console.log(item.search(txt));
        return msg = `Found in ${getLineName(key)} on line number ${value.indexOf(item)+1}`;
        break;
        console.log("Break");
    }

};

 return msg ="Not Found";
}

}

function getLineName(arrName){
let name;
switch (arrName){

case 'horizontal_L_R':
    name = 'Horizontal line Left to Right (\u2192)';
break; 

case 'horizontal_R_L':
     name = `Horizontal line Right to Left (\u2190)`;
break; 

case 'vertical_T_B':
    name = `Vertical line top to bottom (\u2193)`;
break; 

case 'vertical_B_T':
    name = `Vertical line bottom to top (\u2191)`;
break; 

case 'diagonal_BL_TR':
    name = `Diagonal line bottom left to top right (\u2197)`;
break; 

case 'diagnoal_TR_BL':
    name = `Diagonal top right to bottom left (\u2199)`;
break; 

case 'diagonal_TL_BR':
    name = `Diagonal top left to bottom right (\u2198)`;
break; 

case 'diagonal_BR_TL':
    name = `Diagonal bottom right to top left (\u2196)`;
break; 

default: name = "Default";

}
return name

}