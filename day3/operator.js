//  new  day 2 non primitive 

// array 

let arr=[2,4,"vishal","rohit"]
console.log(arr);

// object

let object={


    user_name:"rohit",
    account_number:33333,
    balance:444
}

console.log(object);

//  function

let fun= function(){

    console.log("hellow vishal")
}

console.log(fun())


// type conversion 


let  account_balance="100";
let num=Number(account_balance);


console.log(typeof account_balance);
console.log(typeof num);

//  type conversion 


let account_balance1="222";

//  string to nmumber

let numb=Number(account_balance);
console.log(typeof account_balance1);
console.log(typeof numb);

//  boolean to number 

let x = false 
console.log(Number(x));
let account="100xh";
console.log(x);
console.log(Number(account));

let bal= "3000s";

console.log()
//  how to convert into string 

let ab= 39;
console.log(typeof String(ab));

//  null  give 0 


let x1=null;

console.log(Number(x1));

// undefine  give NAN


let x2 ;
console.log(Number(x2));

//  boolean  give true 
let ax= true ;

console.log(String(ax))


//  arithmatic opeartor 
let a = 10;
let b = 3;

console.log(a + b); // 13
console.log(a % b); // 1
console.log(a ** b); // 1000

//  ASSIGNMENT OPERATOR 

let x3= 10;

x += 5;  // x = x + 5
console.log(x3); // 15

// COMAPARISION OPEARTOR 
console.log(5 == "5");   // true
console.log(5 === "5");  // false (type check)


//  LOGICAL OPERATOR 
let age = 20;

console.log(age > 18 && age < 30); // true
console.log(!(age > 18)); // false


//  ICREMENT 
let a1 = 5;

a1++; // 6
a1--; // 5
let x4 = 5;
console.log(x4++); // 5 (first print, then increase)

let y = 5;
console.log(++y); // 6 (increase first, then print)

// TERNORY OPERATOR 
// condition ? trueValue : falseValue;
let age3 = 18;

let result = age3 >= 18 ? "Adult" : "Minor";
console.log(result);

