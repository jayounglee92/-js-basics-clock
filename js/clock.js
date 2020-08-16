
const NINE_HOURS_MILLISECONDS = 32400000;
const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

const SECOND_MILLISECONDS = 1000;
const MINUTE_MILLISECONDS = SECOND_MILLISECONDS * 60;
const HOUR_MILLISECONDS = MINUTE_MILLISECONDS * 60;
const DAY_MILLISECONDS = HOUR_MILLISECONDS * 24;

function getTime() {
  // Don't delete this.
  /*
  const xmasDay = new Date("2020-12-24:00:00:00+0900");
  let nowDate  = new Date();
  nowDate = nowDate.getTime();

  let gap = xmasDay - nowDate;
  let days = Math.floor(gap/DAY_MILLISECONDS);
  let hours = Math.floor((gap/HOUR_MILLISECONDS) % 24);
  let minutes = Math.floor((gap/MINUTE_MILLISECONDS) % 60);
  let seconds = Math.floor((gap/SECOND_MILLISECONDS) % 60);
  clockTitle.innerText = `${days}d ${hours < 10 ? `0${hours}` : hours}h ${minutes < 10 ? `0${minutes}` : minutes}m ${seconds < 10 ? `0${seconds}` : seconds}s`;
  */
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const time = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
  clockTitle.innerHTML = time;

}
function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();