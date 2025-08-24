import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const radios = document.querySelectorAll('input[type="radio"]');
const delayInput = document.querySelector('input[type="number"]');

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(delayInput.value);
  let selectedOption = null;

  for (const radio of radios) {
    if (radio.checked) {
      selectedOption = radio.value;
      break;
    }
  }

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedOption === 'fulfilled') {
        resolve(delay);
      } else if (selectedOption === 'rejected') {
        reject(delay);
      }
    }, delay);
  })
    .then(delay => {
      iziToast.success({
        title: '',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: `topRight`
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '',
        message: `❌ Rejected promise in ${delay}ms`,
        position: `topRight`
      });
    });
});
