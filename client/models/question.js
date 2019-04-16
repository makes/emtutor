const m = require('mithril');

const question = {
    index: Number,
    current: {},
    load: (vnode) => {
        vnode.state.loading = true;
        return m.request({
            method: 'GET',
            url: `/api/quiz/${vnode.attrs.quiz}/${vnode.attrs.key}`,
            withCredentials: true,
        }).then((result) => {
            question.current = result;
            question.index = vnode.attrs.key;
            vnode.state.loading = false;
        }).catch((error) => {
            console.log(error);
        });
    },
};

module.exports = question;
