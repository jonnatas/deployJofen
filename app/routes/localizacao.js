module.exports = function(application, req, res) {
    application.get('/localizacao', function(req, res) {
        application.app.controllers.localizacao.localizacao(application, req, res);
    });
}