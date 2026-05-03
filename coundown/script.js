// document.querySelector("button").addEventListener("click", () => {
//   alert("Welcome to Olympics 2028!");
// });



// function timing(){
// const timer = document.getElementById('');
// const now = new Date();
// const IndianTime = now.toLocaleTimeString();
// timer.innerHTML = IndianTime;
// }

// setInterval(timing,1000);


// const timer = document.getElementById('root');
// timer.style.fontSize = "200px";
// timer.style.display = "flex";
// timer.style.height = "100vh";
// timer.style.justifyContent = "center";
// timer.style.alignItems = "center";

 

//  baga krishna mala olympics 2028  pasuna ata parent kiti time baki ahe to baga ahe 


// 1. create target date
// 2. start setInterval
// 3. get current time
// 4. find difference
// 5. convert into days/hours/min/sec
// 6. update DOM
// 7. handle end case
const time= new Date("July 14, 2028 00:00:00").getTime();

 function updateCountdown(){
  const now = new Date().getTime();
  const diff = time - now;

  const days = Math.floor(diff/(1000*60*60*24));
  const hours = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
  const minutes = Math.floor((diff%(1000*60*60))/(1000*60));
  const seconds = Math.floor((diff%(1000*60))/1000);
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
 }

 setInterval(updateCountdown,1000);