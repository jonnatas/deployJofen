module.exports = function(application, req, res) {
    //GET ALL Products
    application.get('/', function(req, res) {
        application.app.controllers.index(application, req, res);
    });

    //GET By ID
    application.get('/produto/:id([0-9a-f]{24})', function(req, res) {
        application.app.controllers.produtos.produto(application, req, res);
    });

    application.get('/produto/*', function(req, res) {
        res.render('notfound');
    });

    application.post('/produto_email', function(req, res) {
        application.app.controllers.produtos.send_email(application, req, res);

    });

    application.post('/produto', function(req, res) {
        application.app.controllers.produtos.cadastrar(application, req, res);
    });

    /*
        application.get('/cadastro', function(req, res) {
        application.app.controllers.produtos.add(application, req, res);
    });
    
        //PUT By ID update
        application.put('/produto/:id', function(req, res) {
            application.app.controllers.produtos.updateProduto(application, req, res);
        });

        application.get('/produtos', function(req, res) {
            application.app.controllers.produtos.allProdutos(application, req, res);
        });

        //DELETE By ID(remover)
        application.delete('/produto/:id', function(req, res) {
            application.app.controllers.produtos.deleteProduto(application, req, res);
        });
    */
}