module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "indent": ["error", 4],
        "no-console": "off",
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
        "prefer-destructuring": "off",
        "no-param-reassign": [2, { "props": false }],
        "no-underscore-dangle": ["error", { "allow": ["_id"] }],
        "no-nested-ternary": "off"
    },
    "env": {
        "browser": true,
        "node": true,
        "jquery": true
    }
};
