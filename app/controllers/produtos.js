var fs = require('fs');
var nodemailer = require('nodemailer');

module.exports.allProdutos = function(application, req, res) {
    var ProdutosDAO = new application.app.models.ProdutosDAO();
    ProdutosDAO.getAllProdutos(req, res)
}

module.exports.produto = function(application, req, res) {
    var ProdutosDAO = new application.app.models.ProdutosDAO();
    ProdutosDAO.getProduto(req, res);
}

module.exports.updateProduto = function(application, req, res) {
    var dadosForm = req.body;
    req.assert('nome', 'Nome não pode ser vazio').notEmpty();
    req.assert('descricao', 'descricao não pode ser vazio').notEmpty();
    req.assert('categoria', 'categoria não pode ser vazio').notEmpty();

    erros = req.validationErrors();

    if (erros) {
        res.render('cadastro', {
            validation: erros,
            dadosForm: dadosForm,
            imagem_status: {}
        });
        return;
    }

    var ProdutosDAO = new application.app.models.ProdutosDAO();
    ProdutosDAO.update(req, res);
}

module.exports.add = function(application, req, res) {
    res.render('cadastro', { validation: {}, dadosForm: {}, imagem_status: {} });
}

module.exports.deleteProduto = function(application, req, res) {
    var ProdutosDAO = new application.app.models.ProdutosDAO();
    ProdutosDAO.delete(req, res);
}

module.exports.cadastrar = function(application, req, res) {
    var file = req.files.imagem;
    var path_origem = req.files.imagem.originalFilename;
    var dadosForm = {
        url_imagem: path_origem,
        nome: req.body.nome,
        descricao: req.body.descricao,
        categoria: req.body.categoria
    }
    var path_origem = req.files.imagem.path;
    var path_destino = './uploads/' + req.files.imagem.originalFilename;

    if (file.size === 0) {
        fs.unlinkSync(file.path);
        res.render('cadastro', {
            validation: {},
            dadosForm: dadosForm,
            imagem_status: { sucesso: "Error. imagem em branco" }
        });
        return
    }

    req.checkBody({
        'nome': {
            notEmpty: true,
            errorMessage: 'nome inválido não pode ser vazio'
        },
        'descricao': {
            notEmpty: true,
            errorMessage: 'descricao não pode ser vazio'
        },
        'categoria': {
            notEmpty: true,
            errorMessage: 'categoria não pode ser vazio'
        }
    });

    erros = req.validationErrors();

    if (erros) {
        res.render('cadastro', {
            validation: erros,
            dadosForm: dadosForm,
            imagem_status: {}
        });
        return;
    }

    fs.rename(path_origem, path_destino, function(err) {
        if (err) {
            res.render('cadastro', {
                validation: {},
                dadosForm: dadosForm,
                imagem_status: { sucesso: "Error. imagem " + path_origem + " invalida! " }
            });
            return;
        }
    });

    var ProdutosDAO = new application.app.models.ProdutosDAO();
    ProdutosDAO.inserirProduto(req, res, dadosForm);
}

module.exports.send_email = function(application, req, res) {
    var dadosForm = {
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        mensagem: req.body.mensagem
    }

    var PP = {
        id: req.body.produtoid,
        url_imagem: req.body.produtoUrl_imagem,
        nome: req.body.produtoNome,
        descricao: req.body.produtoDescricao,
        categoria: req.body.produtoCategoria
    };

    req.checkBody({
        'nome': {
            notEmpty: true,
            errorMessage: 'nome inválido não pode ser vazio'
        },
        'email': {
            notEmpty: true,
            errorMessage: 'email não pode ser vazio'
        },
        'telefone': {
            notEmpty: true,
            errorMessage: 'telefone não pode ser vazio'
        },
        'mensagem': {
            notEmpty: true,
            errorMessage: 'mensagem não pode ser vazio'
        }
    });

    erros = req.validationErrors();

    if (erros) {
        res.render('produto', {
            produto: PP,
            validation: erros,
            dadosForm: dadosForm,
            sucesso: {}
        });
        return;
    }

    var transporter = nodemailer.createTransport({
        host: "smtp.jofen.com.br",
        aliases: ["*"],
        port: 587,
        secure: false, // secure:true for port 465, secure:false for port 587
        auth: {
            user: 'site@jofen.com.br',
            pass: 'jofen151'
        }
    });

    var mailOptions = {
        from: 'site <site@jofen.com.br>',
        //to: 'jonatastestelennon@gmail.com, comercial2@jofen.com.br',
        to: 'jonatastestelennon@gmail.com, site@jofen.com.br',
        subject: 'Contato site jofen: ' + PP.nome,
        html: '<H1> Email: ' + req.body.email + '</H1>Nome: ' + '<h2>' + req.body.nome + ' </H2> <h3> Telefone: ' + req.body.telefone + '</h3><p>Mensagem: ' + req.body.mensagem + '</p>'
    };

    var sendMail = transporter.sendMail(mailOptions, function(error,
        info) {
        if (error) {
            res.render('produto', {
                produto: PP,
                validation: {},
                dadosForm: {},
                sucesso: { mail: "Não foi registrar os seus dados, verifique seu email." }
            });
        } else {
            res.render('produto', {
                produto: PP,
                validation: {},
                dadosForm: {},
                sucesso: { mail: "Email enviado!" }
            });
        }
    });
}