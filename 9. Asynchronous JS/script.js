"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener("load", function () {
//     //   console.log(request.responseText);
//     const [data] = JSON.parse(request.responseText);
//     console.log(data);

//     const html = `
//         <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)}M people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//         </article>
//   `;

//     countriesContainer.insertAdjacentHTML("beforeend", html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData("bharat");

const htmlRender = function (data, className = "") {
  const html = `
        <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
  `;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  //   countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  //   countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener("load", function () {
//     //   console.log(request.responseText);
//     const [data] = JSON.parse(request.responseText);
//     console.log(data);

//     htmlRender(data);

//     // Neighbour country callback
//     const [neighbour] = data.borders;
//     if (!neighbour) return;

//     const request2 = new XMLHttpRequest();
//     request2.open("GET", `https://restcountries.com/v2/name/${neighbour}`);
//     request2.send();

//     request2.addEventListener("load", function () {
//       const [data2] = JSON.parse(request2.responseText);
//       //   console.log(data2.languages);

//       htmlRender(data2, "neighbour");
//     });
//   });
// };

// getCountryAndNeighbour("Canada");

// ------------------- Promise ------------------------------
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(`Country not found (${res.status})`);
//       }
//       return res.json();
//     })
//     .then((data) => {
//       htmlRender(data[0]);

//       const [neighbour] = data[0].borders;
//       if (!neighbour) return;

//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then((res) => res.json())
//     .then((data) => {
//       //   console.log(data);
//       htmlRender(data, "neighbour");
//     })
//     .catch((err) => {
//       console.log(err);
//       renderError(err.message);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((res) => {
    if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);
    return res.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, "Country not found")
    .then((data) => {
      htmlRender(data[0]);

      const [neighbour] = data[0].borders;
      if (!neighbour) throw new Error("No neighbour found");

      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        "Country not found"
      );
    })
    .then((data) => {
      htmlRender(data, "neighbour");
    })
    .catch((err) => {
      console.log(err);
      renderError(err.message);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener("click", function () {
  getCountryData("australia");
});
