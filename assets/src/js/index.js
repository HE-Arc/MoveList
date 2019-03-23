import '../scss/index.scss';
import '../../../node_modules/@fortawesome/fontawesome-free/js/all.min.js';
import React from 'react';
import ReactDOM from 'react-dom';

import MainComponent from './ReactComponents/MainComponent.js';
import AddToListButton from './ReactComponents/MovieList/AddToListButton.js';

// https://stackoverflow.com/questions/31933359/using-react-in-a-multi-page-app
const APPS = {
  MainComponent,
  AddToListButton,
};

function renderAppInElement(el) {
  let App = APPS[el.id];

  if (!App)
  {
    return;
  }

  // get props from elements data attribute, like the post_id
  const props = Object.assign({}, el.dataset);
  ReactDOM.render(<App {...props} />, el);
}

document.addEventListener('DOMContentLoaded', () =>
{
  // https://bulma.io/documentation/components/navbar/
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  if ($navbarBurgers.length > 0)
  {
    $navbarBurgers.forEach( el =>
    {
      el.addEventListener('click', () =>
      {
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

document.querySelectorAll('.react-component').forEach(renderAppInElement);
