const domready = require('domready');
const m = require('mithril');

const quizList = require('./views/quizList.js');
const quiz = require('./views/quiz.js');

/* No hashbang in URL */
m.route.prefix('');

/*
    Put view content under <body> element.
    /list is the default route (home).
*/
domready(() => {
    m.route(document.body, '/list', {
        '/list': quizList,
        '/quiz/:key': quiz,
    });
});
