const m = require('mithril');

function view(vnode) {
    return m('.modal.fade', {
        id: 'profileModal',
        tabindex: '-1',
        role: 'dialog',
        'aria-labelledby': 'modalLabel',
        'aria-hidden': 'true',
    }, m('.modal-dialog', { role: 'document' },
        m('.modal-content', [
            m('.modal-header', [
                m('h2', { style: 'color: red;', id: 'modalLabel' }, 'Complete your profile'),
                m('button.close', { type: 'button', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                    m('span', { 'aria-hidden': 'true' }, '×'))]),
            m('.modal-body', [
                m('p', [
                    m('label', { style: 'color: red;' }, m('b', 'Email')),
                    m('input.form-control', { name: 'email', type: 'email', id: 'email' })]),
                m('p', [
                    m('label', { style: 'color: red;' }, m('b', 'Mobile Number')),
                    m('input.form-control', { name: 'phone', type: 'tel', id: 'phone' })]),
                m('p', [
                    m('label', { style: 'color: red;' }, m('b', 'Education')),
                    m('input.form-control', { name: 'education', type: 'text', id: 'education' })]),
                m('p', [
                    m('label', { style: 'color: red;' }, m('b', 'Area of Interest')),
                    m('input.form-control', { name: 'aoi', type: 'text', id: 'aoi' })]),
                m('p', [
                    m('button.btn.btn-danger', {
                        id: 'saveBtn',
                        type: 'button',
                        'data-dismiss': 'modal',
                        'data-toggle': 'modal',
                        'data-target': '#completeModal',
                    }, 'Save')])])])));
}

module.exports = {
    view,
};
