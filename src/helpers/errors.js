// errors.js
const errorPriorities = {
    Fatal: 5,
    High: 4,
    Medium: 3,
    Low: 2,
};

const errors = {
    TEST: {
        code: 1001,
        messageTR: 'TEST',
        messageEN: 'TEST',
        statusCode: 403,
        priority: errorPriorities.Low,
    },


};

Object.freeze(errors);
Object.freeze(errorPriorities);

module.exports = { errorPriorities, errors };

