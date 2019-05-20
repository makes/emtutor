const m = require('mithril');

function view(vnode) {
    return m('.modal.fade', {
        id: 'registerModal',
        tabindex: '-1',
        role: 'dialog',
        'aria-labelledby': 'modalLabel',
        'aria-hidden': 'true',
    }, m('.modal-dialog', { role: 'document' },
        m('.modal-content', [
            m('.modal-header', [
                m('h2', { style: 'color: red;', id: 'modalLabel' }, 'Registration'),
                m('button.close', { type: 'button', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                    m('span', { 'aria-hidden': 'true' }, '×'))]),
            m('.modal-body', [
                m('p', [
                    m('label', { style: 'color: red;' }, m('b', 'User Name')),
                    m('input.form-control', { name: 'uname', type: 'text', id: 'name' })]),
                m('p', [
                    m('label', { style: 'color: red;' }, m('b', 'Password')),
                    m('input.form-control', { name: 'pass', type: 'password', id: 'pass' })]),
                m('p', [
                    m('button.btn.btn-danger', {
                        id: 'regForm',
                        type: 'button',
                        'data-dismiss': 'modal',
                        'data-toggle': 'modal',
                        'data-target': '#profileModal',
                    }, 'Register')])])])));
}

module.exports = {
    view,
};
