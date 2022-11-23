var currTime = document.getElementById("current-time");
var snoozeCount = 3
var snoozeAlarmList = []
function currentTime() {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  const snoozeTime = hh + " " + mm + " " + ss
  console.log("upper", snoozeTime)
  console.log("check", snoozeAlarmList, snoozeTime, snoozeAlarmList.includes(snoozeTime))

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  let time = hh + ":" + mm + ":" + ss;

  currTime.innerText = time;
  let t = setTimeout(function () {
    currentTime();
    if (alarm_List.includes(time) || snoozeAlarmList.includes(snoozeTime) ) {
      ringing(time);
    }
  }, 1000);
}
currentTime();

function formatTime(time) {
  if (time < 10 && time.length != 2) {
    return "0" + time;
  }
  return time;
}
const myList = document.querySelector(".set-alarm-list");

let alarm_List = [];
const userInput = document.querySelector(".user-input");
userInput.addEventListener("submit", function (e) {
  e.preventDefault();
  const hour = userInput.hour.value;
  const min = userInput.min.value;
  const sec = userInput.sec.value;
  let new_h = formatTime(hour);
  if (new_h === "0") {
    new_h = "00";
  }
  let new_m = formatTime(min);
  if (new_m === "0") {
    new_m = "00";
  }
  let new_s = formatTime(sec);
  if (new_s === "0") {
    new_s = "00";
  }

  const new_Alarm = `${new_h}:${new_m}:${new_s}`;
  if (isNaN(new_Alarm)) {
    if (!alarm_List.includes(new_Alarm)) {
      alarm_List.push(new_Alarm);
      shownew_Alarm(new_Alarm);
      addAlarm.reset();
    } else {
      alert(`Alarm for ${new_Alarm} already set.`);
    }
  } else {
    alert("invalid Time Entered");
  }
});

function shownew_Alarm(new_Alarm) {
  const html = `
    <li class= "time-list">
        <span class= "time">${new_Alarm}</span>
        <button class="deleteAlarm time-control" id= "delete-button" onclick = "remove(this.value)" value=${new_Alarm}>Delete</button>
    </li>
    <br>`;
  myList.innerHTML += html;
}

function snooze() {
  if(snoozeCount > 0){
    let currentDate = new Date()
    currentDate.setMinutes(currentDate.getMinutes() + 5)
    snoozeAlarmList.push( `${currentDate.getHours()} ${currentDate.getMinutes()} ${currentDate.getSeconds()}`) 
    snoozeCount--
  }
  
}

const audio = new Audio("./media/har-har.mp3");

audio.loop = true;

function ringing(time) {
  audio.play();
  audio.play();
  alert(`Hey! it is ${time}`);
}

const clearAlarm = () => {
  audio.pause();
  clearTimeout(alarmTimeout);
  alert("Alarm cleared");
};

const mylist = document.getElementsByClassName("set-alarm-list");
myList.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteAlarm")) {
    e.target.parentElement.remove();
  }
});

const remove = (value) => {
  let newList = alarm_List.filter((time) => time != value);
  alarm_List.length = 0;
  alarm_List.push.apply(alarm_List, newList);
};
