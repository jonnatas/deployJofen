var fs = require("fs");

module.exports = function(application, req, res) {
    application.get('/uploads/:imagem', function(req, res) {
        var img = req.params.imagem;

        fs.readFile('./uploads/' + img, function(err, content) {
            if (err) {
                console.log("Error: " + img + " " + err);
                res.render('notfound');
                return;
            }
            res.writeHead(200, { 'content-type': 'image/jpg' });
            res.end(content);
        });
    });
    application.get('*', function(req, res) {
        res.render('notfound');
    })
}