import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.querySelector(`#datetime-picker`);
const btn = document.querySelector(`button`);
const daysEl = document.querySelector(`[data-days]`);
const hoursEl = document.querySelector(`[data-hours]`);
const minutesEl = document.querySelector(`[data-minutes]`);
const secondsEl = document.querySelector(`[data-seconds]`);
let userSelectedDate = null;
let timerId = null

btn.disabled = true;

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
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= Date.now()) {
      iziToast.error({
      title: ``,
      message: `Please choose a date in the future`,
      position: `topRight`
    });
      btn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      btn.disabled = false;
    }
    console.log(selectedDates[0]);
  },
};


flatpickr(datetimePicker, options)

btn.addEventListener(`click`, e => {
  e.preventDefault();

  btn.disabled = true;
  datetimePicker.disabled = true;

  timerId = setInterval(() => {
    const currentDate = Date.now();
    const ms = userSelectedDate.getTime() - currentDate;

    if (ms <= 0) {
      clearInterval(timerId);
      daysEl.textContent = `00`;
      hoursEl.textContent = `00`;
      minutesEl.textContent = `00`;
      secondsEl.textContent = `00`;
      datetimePicker.disabled = false;
      btn.disabled = true;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(ms);
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }, 1000);
});
