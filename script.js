// Elements and Colors
  // Texts
const workTimer = document.getElementById("work__time");
const breakTimer = document.getElementById("break__time");
  // Buttons
const startWorkBtn = document.getElementById("start__work__btn");
const startBreakBtn = document.getElementById("start__break__btn");
const resumeWorkBtn = document.getElementById("resume__work__btn");
const endWorkBtn = document.getElementById("end__work__btn");
 // Colors
const mainColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--main-color');
const secondaryColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--secondary-color');


// Initial Values
let hours;
let minutes;
let seconds;

// Flag to see if timer is working or not
let isWorking 
let isBreak 
// Interval Variable
let timerInterval;

reset();


// WORK LOGIC 
function startWork(){

  if (!isWorking){
    startInterval(workTimer);
    isWorking = true;
    startWorkBtn.disabled = true;
    startWorkBtn.style.backgroundColor= mainColor;
    startBreakBtn.classList.toggle("disablePointerEvents");
    resumeWorkBtn.classList.toggle("disablePointerEvents");
    endWorkBtn.classList.toggle("disablePointerEvents");
  }
  
}

// RESUME LOGIC
function resumeWork(){
  if(isBreak){
    stopInterval();
    isBreak = false;
  }
  if (!isWorking){
    startInterval(workTimer);
    isWorking = true;
  }

}


// BREAK LOGIC
function startBreak(){
  if(isWorking){
    isBreak = true;
    stopInterval();
    startInterval(breakTimer);
    isWorking = false;
  }
}

function endWork(){
  let timeWorked = workTimer.innerHTML;
  let timeOnBreak = breakTimer.innerHTML;
  alert("You Worked for "+timeWorked+ " and took a break for "+timeOnBreak);
  reset();
}

function reset(){
  startBreakBtn.classList.toggle("disablePointerEvents");
  resumeWorkBtn.classList.toggle("disablePointerEvents");
  endWorkBtn.classList.toggle("disablePointerEvents");
  startWorkBtn.disabled = false;
  startWorkBtn.style.backgroundColor= secondaryColor;
  hours = 0;
  minutes = 0;
  seconds = 0;
  isWorking  = false;
  isBreak = false;
  workTimer.innerHTML = "00 : 00 : 00";
  breakTimer.innerHTML = "00 : 00 : 00";
  stopInterval();
}

// HANDLING INTERVAL
function startInterval(timer){
  timerInterval = setInterval(() => {
    calculateTime(timer);
  }, 1000);
}


function stopInterval(){
  clearInterval(timerInterval);
}



// GLOBAL LOGIC 
  // Calculate and Format the time
function calculateTime (element){

    // Take the previous Value of the text
    let strArry = getPrevValue(element);
    seconds = parseInt(strArry[2]);
    minutes = parseInt(strArry[1]);
    hours = parseInt(strArry[0]);

    // increase seconds by 1 
    seconds++;


      // Calculate seconds, minutes and hours
        if (seconds == 60) {
        minutes++;
        seconds = 0;

        if (minutes == 60) {
            hours++;
            minutes = 0;
            seconds = 0;
        }
     }
    
      // Text Formatting 0 => 00 if less than 10
     if (seconds < 10 || seconds == 0) {
        seconds = '0' + seconds;
      }
      if (minutes < 10 || minutes == 0) {
        minutes = '0' + minutes;
      }
      if (hours < 10 || hours == 0) {
        hours = '0' + hours;
      }
      // Bind the text Together
      element.innerHTML = hours + " : " + minutes + " : " + seconds;
}
  // Get the Time from the Html element
function getPrevValue (element){
  return element.innerText.split(':');
}


// click events
startWorkBtn.addEventListener('click', startWork);
startBreakBtn.addEventListener('click', startBreak);
resumeWorkBtn.addEventListener('click', resumeWork);
endWorkBtn.addEventListener('click', endWork);

