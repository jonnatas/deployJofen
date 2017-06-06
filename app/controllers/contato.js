var nodemailer = require('nodemailer');

module.exports.contato = function(application, req, res) {
    res.render('contato', { validation: {}, dadosForm: {}, sucesso: {} });
}

module.exports.mail = function(application, req, res) {
    var dadosForm = {
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        assunto: req.body.assunto,
        mensagem: req.body.mensagem,
    }

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
        'assunto': {
            notEmpty: true,
            errorMessage: 'assunto não pode ser vazio'
        },
        'mensagem': {
            notEmpty: true,
            errorMessage: 'mensagem não pode ser vazio'
        }
    });

    erros = req.validationErrors();

    if (erros) {
        res.render('contato', {
            validation: erros,
            dadosForm: dadosForm,
            sucesso: {}
        });
        return;
    }

    //        var transporter = nodemailer.createTransport('smtp://jofenfinanceiro%40outlook.com:jofen1481@smtp-mail.outlook.com');
    /*
        var transporter = nodemailer.createTransport({
            host: "in-v3.mailjet.com",
            port: 587,
            secure: false, // secure:true for port 465, secure:false for port 587
            auth: {
                user: '72ecbef5f29924785fcf6e83a465ef70',
                pass: 'bbdcfa904cd86d2a473008c396cd016e'
            }
        });
    */
    var transporter = nodemailer.createTransport({
        host: "in-v3.mailjet.com",
        port: 587,
        auth: {
            user: '72ecbef5f29924785fcf6e83a465ef70',
            pass: 'bbdcfa904cd86d2a473008c396cd016e'
        },
        tls: {
            ciphers: "SSLv3"
        }
    });

    var mailOptions = {
        from: req.body.nome + ' <site@jofen.com.br>',
        to: 'site@jofen.com.br',
        //        to: 'site@jofen.com.br, comercial2@jofen.com.br',
        subject: 'Contato site jofen: ' + req.body.assunto,
        html: '<H1>Email: ' + req.body.email + '</H1>Nome: ' + '<h2>' + req.body.nome + ' </H2> <h3> Telefone: ' + req.body.telefone + '</h3><p>Mensagem: ' + req.body.mensagem + '</p>'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        console.log(mailOptions);
        if (error) {
            console.log(error);
            res.render('contato', {
                validation: {},
                dadosForm: {},
                sucesso: { mail: "Não foi registrar os seus dados, verifique seu email. " + error }
            });
        } else {
            console.log("Email enviado: " + info);
            res.render('contato', {
                validation: {},
                dadosForm: {},
                sucesso: { mail: "Email enviado!" }
            });
        }
    });
}