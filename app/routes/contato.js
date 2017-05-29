module.exports = function(application, req, res) {
    application.get('/contato', function(req, res) {
        application.app.controllers.contato.contato(application, req, res);
    });

    application.post('/getmail', function(req, res) {
        application.app.controllers.contato.mail(application, req, res);
    });
}