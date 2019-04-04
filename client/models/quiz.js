'use strict'

var m = require("mithril")

var quiz = {
    list: [],
    loadList: function () {
        return m.request({
            method: "GET",
            url: "/api/quizzes",
            withCredentials: true,
        })
            .then(function (result) {
                quiz.list = result
            })
    },
}

module.exports = quiz
