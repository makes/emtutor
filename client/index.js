const domready = require('domready');
const m = require('mithril');

const landing = require('./views/landing.js');
const quizList = require('./views/quizList.js');
const quiz = require('./views/quiz.js');

/* No hashbang in URL */
m.route.prefix('');

/*
    Put view content under <body> element.
    /home is the default route.
*/
domready(() => {
    m.route(document.body, '/home', {
        '/home': landing,
        '/list': quizList,
        '/quiz/:key': quiz,
    });
});
