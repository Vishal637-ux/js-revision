//  mai number ka iput ka acceess lunga 
//  mai 2nd nuber input ka access lunga 
//  then  dono ko add dakrunga 
// result me show karunga
// let num1 = document.getElementById("first").value;
// let num2 = document.getElementById("second").value;
 
// // when some one click on button

  
// if(add){
// //  button sub dakbti hai to  sub 

// let add = Number(num1) + Number(num2);
// re.innerHTML=add;
// }
// else{
// //  if button add dabti hai to add karo 
// let sub=Number(num1)-Number(num2);
// re.innerHTML=sub;
// }



// function calculate(op) {

//   // STEP 1: input lo
//   let a = document.getElementById("num1").value;
//   let b = document.getElementById("num2").value;

//   // STEP 2: number me convert karo
//   let num1 = Number(a);
//   let num2 = Number(b);

//   let result;

//   // STEP 3: logic
//   if (op === "+") {
//     result = num1 + num2;
//   } else if (op === "-") {
//     result = num1 - num2;
//   }

//   // STEP 4: output
//   document.getElementById("result").innerText = "Result: " + result;
// }


// let addBtn = document.getElementById("addBtn");
// let subBtn = document.getElementById("subBtn");

// addBtn.addEventListener("click", function () {
//   calculate("+");
// });

// subBtn.addEventListener("click", function () {
//   calculate("-");
// });



let addBtn = document.getElementById("addBtn");
let subBtn = document.getElementById("subBtn");

addBtn.addEventListener("click", function () {
  calculate("+");
});

subBtn.addEventListener("click", function () {
  calculate("-");
});

function calculate(op) {
  let num1 = document.getElementById("num1").value;
  let num2 = document.getElementById("num2").value;

  let a = Number(num1);
  let b = Number(num2);

  let result;

  if (op === "+") {
    result = a + b;
  } else if (op === "-") {
    result = a - b;
  }

  // 👉 YAHI RESULT SHOW HOGA
  document.getElementById("result").innerText = "Result: " + result;
}


