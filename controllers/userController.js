
const account = require('./account/lib.js');

module.exports = function (app) {
    app.post('/login',account.login);
    app.post('/signup',account.signup);
    app.post('/getUserData',account.getUserData);
    app.post('/setUserInfo',account.setUserInfo);
    app.post('/newEmail',account.newEmail);
    app.post('/setMoovieList',account.setMoovieList);
}
