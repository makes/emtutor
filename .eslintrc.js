module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "indent": ["error", 4],
        "no-console": "off",
        "prefer-destructuring": "off",
        "no-param-reassign": [2, { "props": false }],
        "no-underscore-dangle": ["error", { "allow": ["_id"] }]
    },
    "env": {
        "browser": true,
        "node": true
    }
};
