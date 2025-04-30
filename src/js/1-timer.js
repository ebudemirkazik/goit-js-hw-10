import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");

const daysSpan = document.querySelector("[data-days]");
const hoursSpan = document.querySelector("[data-hours]");
const minutesSpan = document.querySelector("[data-minutes]");
const secondsSpan = document.querySelector("[data-seconds]");

startButton.disabled = true;
let selectedDate = null;
let countdownInterval = null;

// Flatpickr ayarları
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    console.log("Seçilen tarih:", selectedDate);
  },
};


// Flatpickr başlatılıyor
flatpickr(datetimePicker, options);

// Başlat butonu
startButton.addEventListener("click", () => {
  if (!selectedDate) {
    alert("Lütfen bir tarih seçin!");
    return;
  }

  clearInterval(countdownInterval); // Önceki sayaç varsa durdur

  countdownInterval = setInterval(() => {
    const now = new Date();
    const diff = selectedDate - now;

    if (diff <= 0) {
      clearInterval(countdownInterval);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);

    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
  }, 1000);
});

// Yardımcı fonksiyonlar
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}