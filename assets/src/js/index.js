import '../scss/index.scss';sh. She won't try a bidet because she doesn't want poop water splashing on her. I can't keep up with the comments. I'm pooped. (I'm trying to find humor in this because I'm really upset :(

So yeah.
import '../../../node_modules/@fortawesome/fontawesome-free/js/all.min.js';
import React from 'react';
import ReactDOM from 'react-dom';

import MainComponent from './MainComponent.js';

// https://stackoverflow.com/questions/31933359/using-react-in-a-multi-page-app
const APPS = {
  MainComponent,
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
