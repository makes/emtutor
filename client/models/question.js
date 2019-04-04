'use strict'

var m = require("mithril")

var question = {
    current: {},
    load: function (vnode) {
        vnode.state.loading = true;
        return m.request({
            method: "GET",
            url: "/api/question/" + vnode.attrs.quiz + "/" + vnode.attrs.question,
            withCredentials: true,
        })
            .then(function (result) {
                question.current = result
                vnode.state.loading = false;
            })
    },
}

module.exports = question
