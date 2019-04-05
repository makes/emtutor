const m = require('mithril');

const quiz = require('../models/quiz.js');

function view() {
    return m('.card-deck', quiz.list.map(q => m('.card .my-3 .mx-auto',
        m('.card-body', [
            m('h4', { class: 'card-title' }, q.title),
            m('p', { class: 'card-text' }, q.description),
            m('a', { class: 'btn btn-primary', href: `/question/${q._id}/0` }, 'Aloita'),
        ]))));
}

module.exports = {
    oninit: quiz.loadList,
    view,
};
