'use strict'

const domready = require('domready')
const m = require('mithril')

//var QuestionList = require('./views/QuestionList')
var quizList = require('./views/quizList.js')
var question = require('./views/question.js')

var ecg = require('./lib/ecg.js')

/* No hashbang in URL */
m.route.prefix('')

/*
    Put view content under <body> element.
    /list is the default route (home).
*/
domready(function () {
    m.route(document.body, "/list", {
        "/list": quizList,
//      "/qlist": QuestionList,
        "/question/:quiz/:question": question,
    })
})
