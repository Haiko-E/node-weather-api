// HTML elements
const form = document.querySelector('form');
const input = document.querySelector('input');
const h2 = document.querySelector('#title');
const p = document.querySelector('#temp');

// HTML Eventlistener
form.addEventListener('submit', (e) => {
  h2.textContent = 'loading';
  p.textContent = '';
  e.preventDefault();
  fetch(`/weather?address=${input.value}`)
    .then((res) => res.json())
    .then((data) => {
      h2.textContent = data.location;
      p.textContent = data.temperature;
    });
});
