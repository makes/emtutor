const m = require('mithril');

const question = {
    current: {},
    load: (vnode) => {
        vnode.state.loading = true;
        return m.request({
            method: 'GET',
            url: `/api/question/${vnode.attrs.quiz}/${vnode.attrs.question}`,
            withCredentials: true,
        }).then((result) => {
            question.current = result;
            vnode.state.loading = false;
        });
    },
};

module.exports = question;
