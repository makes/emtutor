const m = require('mithril');

const quiz = {
    current: {},
    num_questions: Number,
    load: (vnode) => {
        vnode.state.loading = true;
        return m.request({
            method: 'GET',
            url: `/api/quiz/${vnode.attrs.key}`,
            withCredentials: true,
        }).then((result) => {
            quiz.current = result;
            quiz.num_questions = result.questions.length;
            vnode.state.loading = false;
        }).catch((error) => {
            console.log(error);
        });
    },
};

module.exports = quiz;
