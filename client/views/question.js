'use strict';

const m = require('mithril');

var question = require("../models/question");
var ecg = require("../lib/ecg.js");

function animateEcg(vnode) {
    resizeEcg(vnode);
    ecg.drawECG(vnode.dom, '/ecgdata/rec_1.dat');
    window.addEventListener('resize', function () { resizeEcg(vnode) }, false);
}

function resizeEcg(vnode) {
    vnode.dom.width = window.innerWidth; // resize
}

function view(vnode) {
    if (vnode.state.loading) {
        return m("h3", "Loading...")
    }
    var currentQuiz = vnode.attrs.quiz;
    var nextQuestion = parseInt(vnode.attrs.question) + 1;
    return [
        m("div", { id: "ecg", class: "container-fluid" },
            m("canvas", { id: "chart", height: "250", oncreate: animateEcg, onupdate: resizeEcg })),
        [
            m("h3", question.current.title),
            question.current.choices.map(function (choice) {
                return m("button",
                    { class: "btn btn-danger btn-lg btn-block", onClick: "window.location = '/question/" + currentQuiz + "/" + nextQuestion + "'" },
                    choice.title)
            })
        ]
    ]
}

module.exports = {
    oninit: function (vnode) { question.load(vnode) },
    view: view,
}