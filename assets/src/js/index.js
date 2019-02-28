import '../scss/index.scss';
import '../../../node_modules/@fortawesome/fontawesome-free/js/all.min.js';
import Main from './main.js';
import React from 'react';
import ReactDOM from 'react-dom';

/*$(document).ready(function() {
    $("#filter-genre").click(function() {
        $(".dropdown").toggleClass("is-active");
    });

    $("#filter-genre").blur(function() {
        $(".dropdown").removeClass("is-active");
    });
});*/

ReactDOM.render(
    <Main />,
    document.getElementById('root')
  );