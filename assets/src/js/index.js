import '../scss/index.scss';
import '../../../node_modules/@fortawesome/fontawesome-free/js/all.min.js';

$(document).ready(function() {
    $("#filter-genre").click(function() {
        $(".dropdown").toggleClass("is-active");
    });

    $("#filter-genre").blur(function() {
        $(".dropdown").removeClass("is-active");
    });
});