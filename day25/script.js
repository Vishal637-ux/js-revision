  
  
  
  
  let   quuiez=document.getElementById(".root")
  
 

let questions = [

{
    question: "Who has the most centuries in international cricket?",
    options: ["Sachin Tendulkar", "MS Dhoni", "Kedar Jadhav", "Virat Kohli"],
    answer: "Sachin Tendulkar"
},

{
    question: "Who is known as the God of Cricket?",
    options: ["Virat Kohli", "Sachin Tendulkar", "Rohit Sharma", "MS Dhoni"],
    answer: "Sachin Tendulkar"
},

{
    question: "Which country won the 2011 Cricket World Cup?",
    options: ["Australia", "England", "India", "Pakistan"],
    answer: "India"
},

{
    question: "Who is called Captain Cool?",
    options: ["Virat Kohli", "MS Dhoni", "Rohit Sharma", "Hardik Pandya"],
    answer: "MS Dhoni"
},

{
    question: "Which player is known as the Run Machine?",
    options: ["Virat Kohli", "Sachin Tendulkar", "KL Rahul", "Rohit Sharma"],
    answer: "Virat Kohli"
},

{
    question: "Which country has won the most Cricket World Cups?",
    options: ["India", "England", "Australia", "Pakistan"],
    answer: "Australia"
},

{
    question: "Who hit six sixes in an over in T20 World Cup?",
    options: ["Yuvraj Singh", "MS Dhoni", "Virat Kohli", "Rohit Sharma"],
    answer: "Yuvraj Singh"
},

{
    question: "Which cricketer is known as Hitman?",
    options: ["Rohit Sharma", "Virat Kohli", "Hardik Pandya", "Shubman Gill"],
    answer: "Rohit Sharma"
},

{
    question: "Who is the highest wicket taker in Test cricket?",
    options: ["Shane Warne", "Anil Kumble", "Muttiah Muralitharan", "James Anderson"],
    answer: "Muttiah Muralitharan"
},

{
    question: "Which IPL team has won the most titles?",
    options: ["CSK", "RCB", "Mumbai Indians", "KKR"],
    answer: "Mumbai Indians"
},

{
    question: "Who was the captain of India in 2007 T20 World Cup?",
    options: ["Virat Kohli", "MS Dhoni", "Rohit Sharma", "Sourav Ganguly"],
    answer: "MS Dhoni"
},

{
    question: "Which player is famous for helicopter shot?",
    options: ["Virat Kohli", "MS Dhoni", "Rohit Sharma", "Hardik Pandya"],
    answer: "MS Dhoni"
},

{
    question: "Who scored the first double century in ODI cricket?",
    options: ["Virender Sehwag", "Sachin Tendulkar", "Chris Gayle", "Rohit Sharma"],
    answer: "Sachin Tendulkar"
},

{
    question: "Which country invented cricket?",
    options: ["India", "Australia", "England", "South Africa"],
    answer: "England"
},

{
    question: "Who is known as Universe Boss?",
    options: ["Chris Gayle", "AB de Villiers", "Virat Kohli", "Andre Russell"],
    answer: "Chris Gayle"
},

{
    question: "Which Indian bowler took 10 wickets in a Test innings?",
    options: ["Zaheer Khan", "Anil Kumble", "Jasprit Bumrah", "Harbhajan Singh"],
    answer: "Anil Kumble"
},

{
    question: "Who has the highest individual score in ODI cricket?",
    options: ["Rohit Sharma", "Virat Kohli", "Martin Guptill", "Chris Gayle"],
    answer: "Rohit Sharma"
},

{
    question: "Which cricketer is known as Mr. 360?",
    options: ["AB de Villiers", "Virat Kohli", "Jos Buttler", "David Warner"],
    answer: "AB de Villiers"
},

{
    question: "Which stadium is called the largest cricket stadium in the world?",
    options: ["Wankhede Stadium", "Eden Gardens", "Narendra Modi Stadium", "Lords"],
    answer: "Narendra Modi Stadium"
},

{
    question: "Who won the first IPL trophy?",
    options: ["Mumbai Indians", "CS", "Rajasthan Royals", "KKR"],
    answer: "Rajastha Royal"
}

];



   




   let  randomquestion=function Randomquestion(){

  const  data = new Set ();


  While(data.size!=5){
       const index = Math.floor(Math.random*20);
       data.add[questionbank[index]];

  }

//   HOW TO CONVERT SET INTO ARRAY ;
  return [...data ];




}


//  HOW TO CREATE INDEX.HTML BY OWN 

// SELECT THE FORM AND INSERT ALL THE ELEMENT INTO IT 


// const form = document.querySelector()

 let div=document.createElement('div')
 div.className="container" ;
 let H=document.createElement('h1');
  H.innerHTML="cricket quiz "

  const form= document.getElementById('quizForm')

              
       form.document.createElement('div');
       div.className("questions");



 let problem=randomquestion


 
        
      let para=  document.createElement('p');
        


 }



   





