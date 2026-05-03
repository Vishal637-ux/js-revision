  const questions = [
  {
    q: "Arjuna ka prashn kya hai is shloka me?",
    a: "Kaun zyada perfect hai — jo bhakti me lage hain ya jo avyakt Brahman ko poojte hain?"
  },
  {
    q: "‘Satata-yuktā’ log kaun hote hain?",
    a: "Jo hamesha Bhagwan ki bhakti me lage rehte hain"
  },
  {
    q: "Bhakt kya karte hain Krishna ke prati?",
    a: "Unki proper worship (paryupāsate) karte hain"
  },
  {
    q: "‘Akṣaram avyaktam’ ka kya matlab hai?",
    a: "Jo nirakar aur indriyon se pare hai"
  },
  {
    q: "Arjuna kis baat ka comparison kar raha hai?",
    a: "Bhakti (personal worship) aur impersonal Brahman worship"
  },
  {
    q: "Transcendentalists ko kitne categories me divide kiya gaya hai?",
    a: "Do — impersonalist aur personalist"
  },
  {
    q: "Personalist devotee kya karta hai?",
    a: "Apni puri energy se Supreme Lord ki seva karta hai"
  },
  {
    q: "Impersonalist ka approach kya hai?",
    a: "Wo nirakar Brahman par meditation karta hai"
  },
  {
    q: "Bhakti-yoga ko kaise describe kiya gaya hai?",
    a: "Absolute Truth ko realize karne ka highest process"
  },
  {
    q: "Bhakti-yoga ka sabse bada advantage kya hai?",
    a: "Ye sabse direct aur easiest way hai Bhagwan se judne ka"
  },
  {
    q: "Personalist kise kaha gaya hai?",
    a: "Jo Bhagwan ki direct devotional service karta hai"
  },
  {
    q: "Impersonalist kise kaha gaya hai?",
    a: "Jo nirakar Brahman par dhyan karta hai"
  },
  {
    q: "Arjuna kya jaana chahta hai?",
    a: "Kaunsa process easier aur more perfect hai"
  },
  {
    q: "Impersonal meditation ko difficult kyu bataya gaya hai?",
    a: "Kyuki wo senses se pare aur unmanifested hai"
  },
  {
    q: "Bhakti yoga ko kya banata hai special?",
    a: "Ye direct connection deta hai Supreme Personality se"
  },
  {
    q: "Arjuna ka inclination kis taraf hai?",
    a: "Krishna ke personal form ki taraf"
  },
  {
    q: "Arjuna apni position ke baare me kya confirm karna chahta hai?",
    a: "Kya personal bhakti ka path sahi hai"
  },
  {
    q: "Impersonalists kya prefer karte hain?",
    a: "Brahma-jyotir par meditation"
  },
  {
    q: "Bhagavad Gita ke is chapter ke according highest realization kya hai?",
    a: "Bhakti-yoga (devotional service)"
  },
  {
    q: "Personal devotion ka main focus kya hai?",
    a: "Supreme Lord ki direct seva"
  },
  {
    q: "Impersonal path ka main focus kya hai?",
    a: "Nirakar Absolute Truth par dhyan"
  },
  {
    q: "Arjuna ke question ka main purpose kya hai?",
    a: "Dono paths me se best aur easiest ko samajhna"
  },
  {
    q: "Is shloka ka core theme kya hai?",
    a: "Personal vs impersonal worship ka comparison"
  }
];


function generatQuote(){  
const text = document.getElementById("question");


const index = Math.floor(Math.random()*questions.length);
text.textContent = questions[index].q;
}


setInterval(generatQuote,2000);


//  Chnage the background color in every 5 second



     






