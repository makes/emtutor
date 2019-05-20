const m = require('mithril');

function view(vnode) {
    return m('.modal.fade', {
        id: 'loginModal',
        tabindex: '-1',
        role: 'dialog',
        'aria-labelledby': 'modalLabel',
        'aria-hidden': 'true',
    }, m('.modal-dialog', { role: 'document' },
        m('.modal-content', [
            m('.modal-header', [
                m('h2', { style: 'color: red;', id: 'modalLabel' }, 'Login'),
                m('button.close', { type: 'button', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                    m('span', { 'aria-hidden': 'true' }, '×'))]),
            m('.modal-body', [
                m('p', [
                    m('label', { style: 'color: red;' }, m('b', 'User Name')),
                    m('input.form-control', { name: 'uname', type: 'text', id: 'uname' })]),
                m('p', [
                    m('label', { style: 'color: red;' }, m('b', 'Password')),
                    m('input.form-control', { name: 'pass', type: 'password', id: 'upass' })]),
                m('p', [
                    m('button.btn.btn-danger', { id: 'loginForm', type: 'button' }, 'Login')])])])));
}

module.exports = {
    view,
};
