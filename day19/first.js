const krishna = document.getElementById("first");
krishna.innerHTML = "Hello  vishwanath prji";

const kriashna2 = document.querySelector("third");

// kriashna2.style.backgroundColor="pink";\

const newItem = document.createElement("li");
newItem.textContent = "React";
document.getElementById("third").appendChild(newItem);
newItem.style.color = "red";
document.getElementById("first").textContent = "Hello DOM Learner!";

let obj=document.getElementById("third").style.backgroundColor = "lightblue";
console.log(obj);

const header2 = document.getElementById("second");
header2.remove();
document.getElementById("first").addEventListener("click", () => {
    alert("You clicked the header!");
});


