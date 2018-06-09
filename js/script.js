
var minutes = 25;
var breakMinutes = 5;
var minuteDisplay = document.querySelector('#minutes');
var secondDisplay = document.querySelector('#seconds');
var startButton = document.querySelector('#startButton');
var statusDiv = document.querySelector('#status');
var lessWork = document.querySelector('#lessWork');
var moreWork = document.querySelector('#moreWork');
var lessBreak = document.querySelector('#lessBreak');
var moreBreak = document.querySelector('#moreBreak') ;
var workLengthEl = document.querySelector('#workLength');
var breakLengthEl = document.querySelector('#breakLength');
var chime = document.querySelector('audio');

workLengthEl.innerHTML = minutes;
breakLengthEl.innerHTML = breakMinutes;
secondDisplay.innerHTML = '00';
minuteDisplay.innerHTML = '00';

lessWork.addEventListener('click', function(){
    if(minutes === 1)return;
    minutes--;
    workLengthEl.innerHTML = minutes;
});
moreWork.addEventListener('click', function(){
    minutes++;
    workLengthEl.innerHTML = minutes;
});
lessBreak.addEventListener('click', function(){
    if(breakMinutes === 1)return;
    breakMinutes--;
    breakLengthEl.innerHTML = breakMinutes;
});
moreBreak.addEventListener('click', function(){
    breakMinutes++;
    breakLengthEl.innerHTML = breakMinutes;
});


function timesUp() {
    chime.play();
    statusDiv.innerHTML = 'On Break';
    var breakTimer = breakMinutes * 60000;
    display(breakTimer);
    setTimeout(getToWork, breakMinutes * 60000);
}

function display(timer){
    var doStuff = setInterval(function () {//display countdown to break
        if (timer > 0) {
            timer -= 1000;//take 1 sec off the clock
            var minutesTracker = Math.floor(timer / 60000).toString();
            if (minutesTracker.length === 1) {//maintain 00:00 format
                var temp = minutesTracker.split('');
                temp.unshift('0');
                minutesTracker = temp.join('');
            }
            minuteDisplay.innerHTML = minutesTracker;
            secondsTracker = Math.floor(timer / 1000 - minutesTracker * 60).toString();
            if (secondsTracker.length === 1) {//maintain 00:00 format
                var temp = secondsTracker.split('');
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

function reset(){
    location.reload();
}
function getToWork() {
    minuteDisplay.innerHTML = minutes;
    startButton.removeEventListener('click', getToWork);//prevent multiple calls
    startButton.innerHTML = '<i class="fa fa-refresh"></i>';
    startButton.addEventListener('click', reset)
    statusDiv.innerHTML = 'In Session';
    var workTimer = minutes * 60000;
    display(workTimer);
    setTimeout(timesUp, minutes * 60000);
}

startButton.addEventListener('click', getToWork);