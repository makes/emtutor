const m = require('mithril');

const question = require('../models/question');
const ecg = require('../lib/ecg.js');

function resizeEcg(vnode) {
    vnode.dom.width = window.innerWidth; // resize
}

function animateEcg(vnode) {
    resizeEcg(vnode);
    ecg.drawECG(vnode.dom, '/ecgdata/rec_1.dat');
    window.addEventListener('resize', () => { resizeEcg(vnode); }, false);
}

function view(vnode) {
    if (vnode.state.loading) {
        return m('h3', 'Loading...');
    }
    const currentQuiz = vnode.attrs.quiz;
    const nextQuestion = parseInt(vnode.attrs.question, 10) + 1;
    return [
        m('div', { id: 'ecg', class: 'container-fluid' },
            m('canvas', {
                id: 'chart', height: '250', oncreate: animateEcg, onupdate: resizeEcg,
            })),
        [
            m('h3', question.current.title),
            question.current.choices.map(choice => m('button', {
                class: 'btn btn-danger btn-lg btn-block', onClick: `window.location = '/question/${currentQuiz}/${nextQuestion}'`,
            }, choice.title)),
        ],
    ];
}

module.exports = {
    oninit: (vnode) => { question.load(vnode); },
    view,
};
