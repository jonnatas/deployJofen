var objectId = require('mongodb').ObjectID;
var mongodb = require('mongodb'),
    MongoClient = require('mongodb').MongoClient;

var uri = 'mongodb://jofendb:++nildo1010@mongodb.uhserver.com:27017/jofen';

function ProdutosDAO() {

}


ProdutosDAO.prototype.inserirProduto = function(req, res, produto) {
    mongodb.MongoClient.connect(uri, function(err, db) {
        var produtos = db.collection('produtos');
        produtos.insert(produto, function(err, records) {
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
        db.close();
    });
}

ProdutosDAO.prototype.getProduto = function(req, res) {
    mongodb.MongoClient.connect(uri, function(err, db) {
        var produtos = db.collection('produtos');
        produtos.find(objectId(req.params.id)).toArray(function(err, results) {
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
        db.close();
    });
}

ProdutosDAO.prototype.delete = function(req, res) {
    mongodb.MongoClient.connect(uri, function(err, db) {
        var produtos = db.collection('produtos');
        produtos.remove({ _id: objectId(req.params.id) }, function(err, records) {
            if (err) {
                res.json(err);
            } else {
                res.json(records);
            }
            db.close();
        });
    });
}

ProdutosDAO.prototype.getAllProdutos = function(req, res) {
    mongodb.MongoClient.connect(uri, function(err, db) {
        var produtos = db.collection('produtos');
        produtos.find().toArray(function(err, results) {
            if (err) {
                res.json('/');
            } else {
                console.log(results);
                res.send({ produto: results });
            }
        });

        db.close();
    });
}

ProdutosDAO.prototype.update = function(req, res) {
    mongodb.MongoClient.connect(uri, function(err, db) {
        var produtos = db.collection('produtos');
        produtos.update({ _id: objectId(req.params.id) }, {
                $set: {
                    nome: req.body.nome,
                    descricao: req.body.descricao,
                    categoria: req.body.categoria
                }
            }, {},
            function(err, records) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(records);
                }
                db.close();
            });
    });
}

module.exports = function() {
    return ProdutosDAO;
}