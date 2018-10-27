
let minutes = 25;
let breakMinutes = 5;
const minuteDisplay = document.querySelector('#minutes');
const secondDisplay = document.querySelector('#seconds');
const startButton = document.querySelector('#startButton');
const statusDiv = document.querySelector('#status');
const lessWork = document.querySelector('#lessWork');
const moreWork = document.querySelector('#moreWork');
const lessBreak = document.querySelector('#lessBreak');
const moreBreak = document.querySelector('#moreBreak') ;
const workLengthEl = document.querySelector('#workLength');
const breakLengthEl = document.querySelector('#breakLength');
const chime = document.querySelector('audio');

workLengthEl.innerHTML = minutes;
breakLengthEl.innerHTML = breakMinutes;
secondDisplay.innerHTML = '00';
minuteDisplay.innerHTML = '00';

lessWork.addEventListener('click', function(){
    if(minutes <= 5)return;
    minutes-= 5;
    workLengthEl.innerHTML = minutes;
});
moreWork.addEventListener('click', function(){
    minutes+= 5;
    workLengthEl.innerHTML = minutes;
});
lessBreak.addEventListener('click', function(){
    if(breakMinutes <= 5)return;
    breakMinutes-= 5;
    breakLengthEl.innerHTML = breakMinutes;
});
moreBreak.addEventListener('click', function(){
    breakMinutes+= 5;
    breakLengthEl.innerHTML = breakMinutes;
});


timesUp = () => {
    chime.play();
    statusDiv.innerHTML = 'On Break';
    let breakTimer = breakMinutes * 60000;
    display(breakTimer);
    setTimeout(getToWork, breakMinutes * 60000);
}

display = (timer) => {
    let doStuff = setInterval( () => {//display countdown to break
        if (timer > 0) {
            timer -= 1000;//take 1 sec off the clock
            let minutesTracker = Math.floor(timer / 60000).toString();
            if (minutesTracker.length === 1) {//maintain 00:00 format
                let temp = minutesTracker.split('');
                temp.unshift('0');
                minutesTracker = temp.join('');
            }
            minuteDisplay.innerHTML = minutesTracker;
            secondsTracker = Math.floor(timer / 1000 - minutesTracker * 60).toString();
            if (secondsTracker.length === 1) {//maintain 00:00 format
                let temp = secondsTracker.split('');
                temp.unshift('0');
                secondsTracker = temp.join('');
            }
            secondDisplay.innerHTML = secondsTracker;
        }
        if (timer === 0) {
            clearInterval(doStuff);
        }
    }, 1000);
}

reset = () => {
    location.reload();
}
getToWork = () => {
    minuteDisplay.innerHTML = minutes;
    startButton.removeEventListener('click', getToWork);//prevent multiple calls
    startButton.innerHTML = '<i class="fa fa-refresh"></i>';
    startButton.addEventListener('click', reset)
    statusDiv.innerHTML = 'In Session';
    let workTimer = minutes * 60000;
    display(workTimer);
    setTimeout(timesUp, minutes * 60000);
}

startButton.addEventListener('click', getToWork);