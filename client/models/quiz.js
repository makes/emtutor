const m = require('mithril');

const quiz = {
    list: [],
    loadList: () => m.request({
        method: 'GET',
        url: '/api/quizzes',
        withCredentials: true,
    }).then((result) => {
        quiz.list = result;
    }),
};

module.exports = quiz;
