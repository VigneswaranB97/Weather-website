// const { response } = require("express");

// console.log("Client Side");

// fetch("https://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

fetch("http://localhost:3000/weather?address=saidapet").then((response) => {
  response.json().then((data) => {
    console.log(data.error ? data.error : `${data.location}, ${data.weather}`);
  });
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.getElementById("message-1");
const msg2 = document.getElementById("message-2");
msg1.textContent = ``;
msg2.textContent = ``;

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(search.value);
  msg1.textContent = `Loading...`;

  fetch(`/weather?address=${search.value}`).then((response) => {
    response.json().then((data) => {
      // console.log(
      //   data.error ? data.error : `${data.location}, ${data.weather}`
      // );
      if (data.error) {
        msg1.textContent = `${data.error}`;
      } else {
        msg1.textContent = `Weather for ${data.location}`;
        msg2.textContent = `${data.weather}`;
      }
    });
  });
});
