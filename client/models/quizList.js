const m = require('mithril');

const quizList = {
    list: [],
    loadList: () => m.request({
        method: 'GET',
        url: '/api/quizzes',
        withCredentials: true,
    }).then((result) => {
        quizList.list = result;
    }),
};

module.exports = quizList;
