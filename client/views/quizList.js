'use strict'

const m = require('mithril')

var quiz = require("../models/quiz")

function view() {
    return m(".card-deck", quiz.list.map(function (q) {
        return m(".card .my-3 .mx-auto",
            m(".card-body", [
                m("h4", {class: "card-title"}, q.title),
                m("p", {class: "card-text"}, q.description),
                m("a", {class: "btn btn-primary", href: '/question/' + q._id + '/0'}, "Aloita"),
            ]))
    }))
}

module.exports = {
    oninit: quiz.loadList,
    view: view,
}