import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let selectedDate = null;
let countdownInterval = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  minDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const now = new Date();

    if (selectedDate <= now) {
      startBtn.disabled = true;
      iziToast.error({
        title: "Hata",
        message: "Please choose a date in the future",
        position: "topRight",
      });
    } else {
      startBtn.disabled = false;
    }
  },
};
flatpickr("#datetime-picker", options);

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  input.disabled = true;

  countdownInterval = setInterval(() => {
    const now = new Date();
    const diff = selectedDate - now;

    if (diff <= 0) {
      clearInterval(countdownInterval);
      updateTimer(0, 0, 0, 0);
      return;
    }

    const time = convertMs(diff);
    updateTimer(time.days, time.hours, time.minutes, time.seconds);
  }, 1000);
});


  function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

  console.log(convertMs(2000)); 
  console.log(convertMs(140000)); 
  console.log(convertMs(24140000)); 


function updateTimer(days, hours, minutes, seconds) {
  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

function pad(value) {
  return String(value).padStart(2, "0");
}
