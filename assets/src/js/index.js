import '../scss/index.scss';
import '../../../node_modules/@fortawesome/fontawesome-free/js/all.min.js';
import React from 'react';
import ReactDOM from 'react-dom';

import MainComponent from './MainComponent.js';
import AddToListButton from './MovieList/AddToListButton.js';

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

document.querySelectorAll('.react-component').forEach(renderAppInElement);
