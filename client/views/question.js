const m = require('mithril');

const question = require('../models/question.js');
const ecg = require('../lib/ecg.js');

function resizeEcg(vnode) {
    vnode.dom.width = window.innerWidth; // resize
}

function animateEcg(vnode) {
    resizeEcg(vnode);
    ecg.drawECG(vnode.dom, '/ecgdata/rec_1.dat');
    window.addEventListener('resize', () => { resizeEcg(vnode); }, false);
}

const feedbackModal = {
    content: '',
    correctAnswer: Boolean,
    isVisible: () => feedbackModal.content !== '',
    setContent: (text) => { feedbackModal.content = text; },
    view: vnode => m('.modal.fade[tabindex=-1][role=dialog]',
        [
            m('.modal-dialog[role=document]', [
                m('.modal-content', [
                    m('.modal-header', [
                        m('h5.modal-title', vnode.attrs.title || 'Are you sure?'),
                    ]),
                    m('.modal-body', [
                        m('div', vnode.attrs.body || ''),
                    ]),
                    m('.modal-footer', vnode.attrs.buttons),
                ]),
            ]),
        ]),
    oncreate: (vnode) => {
        $(vnode.dom).modal('show');
    },
};

function view(vnode) {
    if (vnode.state.loading) {
        return m('h3', 'Loading...');
    }
    const currentQuiz = vnode.attrs.quiz;
    const nextQuestion = parseInt(vnode.attrs.question, 10) + 1;
    return [m('div', { id: 'ecg', class: 'container-fluid' }, [
        m('canvas', {
            id: 'chart', height: '250', oncreate: animateEcg, onupdate: resizeEcg,
        }),
        m('h3', question.current.title),
        question.current.choices.map(choice => m('button', {
            class: 'btn btn-danger btn-lg btn-block',
            onclick: () => feedbackModal.setContent(choice.feedback),
        }, choice.title)),
    ]),
    feedbackModal.isVisible()
        ? m(feedbackModal, {
            title: 'Otsikkoteksti',
            body: feedbackModal.content,
            buttons: [
                m('button.btn.btn-primary[type=button]',
                    { onClick: `window.location = '/question/${currentQuiz}/${nextQuestion}'` },
                    'Seuraava'),
            ],
        })
        : null,
    ];
}

module.exports = {
    oninit: (vnode) => { question.load(vnode); },
    view,
};
