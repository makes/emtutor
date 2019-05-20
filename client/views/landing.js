const m = require('mithril');

const loginModal = require('./loginModal.js');
const registerModal = require('./registerModal.js');
const profileModal = require('./profileModal.js');
const completeModal = require('./completeModal.js');

function view(vnode) {
    return m('main',
        { style: 'background: url("landing_background.png") fixed no-repeat center; background-size: cover; margin: 0; min-height: 100%; display: grid;' },
        [m('.glass',
            m('ul.list-group.list-group-flush',
                m('li',
                    m('img', {
                        src: 'emtutor-logo.svg',
                        style: 'max-width: 300px; height: auto; padding: 5px;',
                    })),
                m('li.card-body', { id: 'description' },
                    m('p.text-center', 'Welcome to emtutor - the eLearning platform for medical care personnel.')),
                m('li', { style: 'text-align: center;' },
                    [m('button.btn.btn-danger', {
                        type: 'button',
                        id: 'loginBtn',
                        style: 'margin-right: 5px;',
                        'data-toggle': 'modal',
                        'data-target': '#loginModal',
                    }, 'Login'),
                    m('button.btn.btn-danger', {
                        type: 'button',
                        id: 'regBtn',
                        style: 'margin-right: 5px;',
                        'data-toggle': 'modal',
                        'data-target': '#registerModal',
                    }, 'Register'),
                    m('a.btn.btn-danger', {
                        id: 'skipBtn',
                        href: '/list',
                        style: 'margin-top: 5px;',
                    }, 'Continue without registering')]))),
        m(loginModal),
        m(registerModal),
        m(profileModal),
        m(completeModal),
        ]);
}

module.exports = {
    view,
};
