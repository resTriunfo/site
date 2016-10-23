app.post('/login',
    passport.authenticate('local'),
    function (req, res) {
        var id = req.user._id
        User.findById(id, function (err, dados) {
            if (dados.perfil == "imobiliaria") {
                res.render("restritoimob.ejs", {titulo: "Área Restrita - Imobiliária", message:"", username: req.user.username, restritoPrincipal: "active", restritoPerfil: "", restritoUsuarios: "", restritoFerramentas: "", layout: "layoutRestrito"});
            }
            else {
                res.render("restritoadm.ejs", {titulo: "Área Restrita - Principal", message:"", username: req.user.username, restritoPrincipal: "active", restritoPerfil: "", restritoUsuarios: "", restritoFerramentas: "", layout: "layoutRestrito"});
            }
        })
    });

