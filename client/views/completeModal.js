const m = require('mithril');

function view(vnode) {
    return m('.modal.fade', {
        id: 'completeModal',
        tabindex: '-1',
        role: 'dialog',
        'aria-labelledby': 'modalLabel',
        'aria-hidden': 'true',
    }, m('.modal-dialog', { role: 'document' },
        m('.modal-content', [
            m('.modal-header', [
                m('h2', { style: 'color: red;', id: 'modalLabel' }, 'Your profile is completed!'),
                m('button.close', { type: 'button', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                    m('span', { 'aria-hidden': 'true' }, '×'))]),
            m('.modal-body', [
                m('p', { style: 'color: red' }, 'Here are your details:'),
                m('p', 'Email: todo'),
                m('p', 'Phone: todo'),
                m('p', 'Education: todo'),
                m('p', 'Area of Interest: todo'),

                m('button.btn.btn-danger', {
                    id: 'done',
                    type: 'button',
                    'data-dismiss': 'modal',
                }, 'Done')])])));
}

module.exports = {
    view,
};
