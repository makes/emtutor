const m = require('mithril');

const quiz = require('../models/quiz.js');
const ecg = require('../lib/ecg.js');

const question = {
    index: 0,
    current: null,
};

function resizeEcg(vnode) {
    vnode.dom.width = window.innerWidth; // resize
}

function animateEcg(vnode) {
    resizeEcg(vnode);
    ecg.drawECG(vnode.dom, '/ecgdata/rec_1.dat');
    window.addEventListener('resize', () => { resizeEcg(vnode); }, false);
}

function isLastQuestion() {
    return question.index === quiz.num_questions - 1;
}

let quizEnded = false;
let score = 0;

const feedbackModal = {
    content: '',
    correctAnswer: Boolean,
    bootstrapModal: null,
    show: () => { feedbackModal.bootstrapModal.modal('show'); },
    hide: () => { feedbackModal.bootstrapModal.modal('hide'); },
    setContent: (text) => { feedbackModal.content = text; feedbackModal.show(); },
    view: vnode => m('.modal.fade[tabindex=-1][role=dialog][data-backdrop=static][data-keyboard=false]',
        [
            m('.modal-dialog[role=document]', [
                m('.modal-content', [
                    m('.modal-header', [
                        m('h5.modal-title', vnode.attrs.title || ''),
                    ]),
                    m('.modal-body', [
                        m('div', vnode.attrs.body || ''),
                    ]),
                    m('.modal-footer', vnode.attrs.buttons),
                ]),
            ]),
        ]),
    oncreate: (vnode) => {
        feedbackModal.bootstrapModal = $(vnode.dom);
    },
};

function view(vnode) {
    if (vnode.state.loading) {
        return m('h3', 'Loading...');
    }
    question.current = quiz.current.questions[question.index];
    return [
        m('div', { id: 'ecg' },
            m('canvas', {
                id: 'chart', oncreate: animateEcg, height: '250', /* onupdate: resizeEcg, */
            })),
        m('div', { id: 'question' }, [
            m('h3', `${question.current.title} (${question.index + 1}/${quiz.num_questions})`),
            m('button', {
                class: 'btn btn-info btn-lg btn-block',
                onclick: () => {
                    ecg.pauseECG();
                },
            }, 'Play/Pause'),


            question.current.choices.map(choice => m('button', {
                class: 'btn btn-danger btn-lg btn-block',
                onclick: () => {
                    feedbackModal.setContent(choice.feedback);
                    if (choice.isCorrect) score += 1;
                },
            }, choice.title)),
        ]),


        m(feedbackModal, {
            title: '',
            body: feedbackModal.content,
            buttons: [
                quizEnded
                    ? m('a.btn.btn-primary[type=button][href=/list]', 'Valmis')
                    : isLastQuestion()
                        ? m('button.btn.btn-primary[type=button]', {
                            onclick: () => {
                                feedbackModal.setContent(`Onnea! Sait ${score}/${quiz.num_questions} pistettä.`);
                                quizEnded = true;
                            },
                        }, 'Seuraava')
                        : m('button.btn.btn-primary[type=button]', {
                            onclick: () => {
                                feedbackModal.hide();
                                question.index += 1;
                                question.current = quiz.current.questions[question.index];
                            },
                        }, 'Seuraava'),
            ],
        }),
    ];
}

module.exports = {
    oninit: (vnode) => {
        quiz.load(vnode);
    },
    view,
};
