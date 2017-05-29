var objectId = require('mongodb').ObjectID;

function ProdutosDAO(connection) {
    this._connection = connection();
}

ProdutosDAO.prototype.inserirProduto = function(req, res, produto) {
    this._connection.open(function(err, mongoclient) {
        mongoclient.collection("produtos", function(err, collection) {
            collection.insert(produto, function(err, records) {
                if (err) {
                    res.render('cadastro', {
                        validation: {},
                        dadosForm: {},
                        imagem_status: { sucesso: err }
                    });
                } else {
                    res.render('cadastro', {
                        validation: {},
                        dadosForm: {},
                        imagem_status: { sucesso: "inclusão realizada com sucesso" }
                    });
                }
            })
            mongoclient.close();
        });
    });
}

ProdutosDAO.prototype.delete = function(req, res) {
    this._connection.open(function(err, mongoclient) {
        mongoclient.collection("produtos", function(err, collection) {
            collection.remove({ _id: objectId(req.params.id) }, function(err, records) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(records);
                }
                mongoclient.close();
            });
        });
    });
}

ProdutosDAO.prototype.getAllProdutos = function(req, res) {
    this._connection.open(function(err, mongoclient) {
        mongoclient.collection("produtos", function(err, collection) {
            collection.find().toArray(function(err, results) {
                if (err) {
                    res.json('/');
                } else {
                    console.log(results);
                    res.render('produtos', { produto: results });
                }
            });

            mongoclient.close();
        });
    });
}

ProdutosDAO.prototype.getProduto = function(req, res) {
    this._connection.open(function(err, mongoclient) {
        mongoclient.collection("produtos", function(err, collection) {
            collection.find(objectId(req.params.id)).toArray(function(err, results) {
                if (err) {
                    res.render('/');
                } else {
                    res.render('produto', {
                        produto: results,
                        validation: {},
                        dadosForm: {},
                        sucesso: {}
                    });
                }
            });
            mongoclient.close();
        });
    });
}

ProdutosDAO.prototype.update = function(req, res) {
    this._connection.open(function(err, mongoclient) {
        mongoclient.collection("produtos", function(err, collection) {
            collection.update({ _id: objectId(req.params.id) }, { $set: { nome: req.body.nome, descricao: req.body.descricao, categoria: req.body.categoria } }, {},
                function(err, records) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(records);
                    }
                    mongoclient.close();
                });
        });
    });
}

module.exports = function() {
    return ProdutosDAO;
}