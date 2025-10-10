
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", e => {
  e.preventDefault();
  const delay = e.currentTarget.delay.value;
  const state = e.currentTarget.state.value;

  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: "topRight",
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: "topRight",
      });
    });
    form.reset();
});

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {   
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
        } else {
        reject(delay);
      }
    }, delay);
  });
}