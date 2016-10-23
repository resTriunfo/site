express = require("express")
fs = require("fs")
app = express()
expressLayouts = require('express-ejs-layouts')
ejs = require("ejs")
nodemailer = require("nodemailer")
mongoose = require("mongoose")
mongoose.connect(process.env.MONGOLAB_URI)
path = require("path")
u = require("underscore")
bodyParser = require("body-parser")
passport = require('passport')
cookieParser = require('cookie-parser')
session = require('express-session');
requireDir = require('require-dir')
LocalStrategy = require('passport-local').Strategy;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(session({secret: "cookie_secret", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressLayouts)

app.set('view engine', 'ejs')
app.set('layout', 'layout')

var directories = ['functions', 'routes', 'models']
directories.forEach(function(directory){
    requireDir(directory)
});

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(port, ip_address)

app.get("/userlist", isLoggedIn, function(req,res){
    User.find(function (err,users) {
        if(err) res.send(err);
        res.json(users)
    })
})

app.get("/clientlist", function(req,res){
    Client.find(function (err,users) {
        if(err) res.send(err);
        res.json(users)
    })
})

app.get("/obralist", function(req,res){
    Obra.find(function (err,obras) {
        if(err) res.send(err);
        res.json(obras)
    })
})

app.post("/contato", function(req,res){
    var mailOptions = {
        from: req.body.email,
        to: "sinuhe@mshin.com.br",
        subject: req.body.nome,
        text: req.body.mensagem
    }
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.render("page_contato.ejs", {message:"Ops, sua mensagem não pôde ser enviada"})

        }else{
            console.log('Message sent: ' + info.response);
            res.render("page_contato.ejs", {message: "Mensagem enviada com sucesso!"})
        }
    })
})



app.post("/restritousuarios", function(req,res){
    var body = req.body
    var novoUser = new User(body)
    novoUser.save(function(err){
        if(err){
            res.render("restritousuarios.ejs", {message:"Ops, algo deu errado"});
        }
        else{
            res.render("restritousuarios.ejs", {message:"Usuário Criado com Sucesso!"});
        }
    })
})

app.post("/calculodoc", function(req,res){
    res.render("resultadocalc.ejs", {titulo: "Resultado dos Cálculos", username: req.user.username, message:"", restritoPrincipal: "", restritoPerfil: "", restritoUsuarios: "", restritoFerramentas: "active", layout: "layoutRestrito", municipio: req.body.municipio, fite: req.body.fite, origem: req.body.origem, planta: req.body.planta, primeiroImovel: req.body.primeiroImovel, valorEntrada: req.body.valorEntrada, valorFinanciado: req.body.valorFinanciado });
})



app.post("/restritoclientes", function(req,res){
    var body = req.body
    var novoClient = new Client(body)
    novoClient.save(function(err){
        if(err){
            res.render("restritoimob.ejs", {message:"Ops, algo deu errado"});
        }
        else{
            res.render("restritoimob.ejs", {message:"Cliente Criado com Sucesso!"});
        }
    })
})


app.delete('/deleteuser/:id', function(req, res) {
    var userToDelete = req.params.id;
    User.findByIdAndRemove(userToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

app.delete('/deleteclient/:id', function(req, res) {
    var userToDelete = req.params.id;
    Client.findByIdAndRemove(userToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});


app.delete('/deleteobra/:id', function(req, res) {
    var obraToDelete = req.params.id;
    Obra.findByIdAndRemove(obraToDelete, function(err, result) {
        res.send((result === 1) ? { message: '' } : { msg:'error: ' + err });
    });
});


app.get('/editformulario/:id',isLoggedIn, function(req, res) {
    var id = req.params.id
    Obra.findById(id,function(err,dados){
        res.render("editformulario.ejs",{
            titulo: "Editar dados da Obra",
            layout: "blanklayout",
            dataPreench: dados.dataPreench,
            idObra: dados._id,
            nomeInc: dados.nomeInc,
            cnpjInc: dados.cnpjInc,
            cpfInc: dados.cpfInc,
            enderecoInc: dados.enderecoInc,
            profissionalTec: dados.profissionalTec,
            creaTec: dados.creaTec,
            artTec: dados.artTec,
            enderecoTec: dados.enderecoTec,
            nomeProj: dados.nomeProj,
            localProj: dados.localProj,
            cidadeProj: dados.cidadeProj,
            designacaoProj: dados.designacaoProj,
            quantidadeProj: dados.quantidadeProj,
            padraoProj: dados.padraoProj,
            pavimentosProj: dados.pavimentosProj,
            vagasAutonomas: dados.vagasAutonomas,
            vagasAcessorio: dados.vagasAcessorio,
            vagasComum: dados.vagasComum,
            areaProj: dados.areaProj,
            dataAprov: dados.dataAprov,
            numeroAlvara: dados.numeroAlvara,
            pav: dados.pav,
            message:""})

    })
});


app.post("/formularionbr12721", isLoggedIn,  function(req,res){


    var arrayNames = []
    req.body.pav.forEach(function(pavs){
        if(!u.contains(arrayNames, pavs.pavimento)){
            arrayNames.push(pavs.pavimento)
        }
    })

    var finalArray = []
    arrayNames.forEach(function(name){
        var object = {
            pavimento : name,
            nPropPrivCob: 0,
            nPropPrivDif: 0,
            nPropPrivEquiv: 0,
            nPropComCob: 0,
            nPropComDif: 0,
            nPropComEquiv: 0,
            propComCob: 0,
            propComDif: 0,
            propComEquiv: 0,
            qtdPav: 0
        }
        finalArray.push(object)
    })

    req.body.pav.forEach(function(pavs){
        finalArray.forEach(function(consolidated){
            var a = (Number(pavs.nPropPrivCob) * Number(pavs.qtdUni) / Number(pavs.qtdPav))
            var b = (Number(pavs.nPropPrivDif) * Number(pavs.qtdUni) / Number(pavs.qtdPav))
            var c = (Number(pavs.nPropPrivDif) * Number(pavs.qtdUni) / Number(pavs.qtdPav))
            var d = (Number(pavs.nPropComCob) * Number(pavs.qtdUni) / Number(pavs.qtdPav))
            var e = (Number(pavs.nPropComDif) * Number(pavs.qtdUni) / Number(pavs.qtdPav))
            var f = (Number(pavs.nPropComDif) * Number(pavs.qtdUni) / Number(pavs.qtdPav))
            var g = (Number(pavs.propComCob) * Number(pavs.qtdUni) / Number(pavs.qtdPav))
            var h = (Number(pavs.propComDif) * Number(pavs.qtdUni) / Number(pavs.qtdPav))
            var i = (Number(pavs.propComDif) * Number(pavs.qtdUni) / Number(pavs.qtdPav))
            var j = (Number(pavs.qtdPav))
            if(consolidated.pavimento == pavs.pavimento){
                consolidated.nPropPrivCob += a
                consolidated.nPropPrivDif += b
                consolidated.nPropPrivEquiv += c * Number(pavs.coefNPropPrivDif)
                consolidated.nPropComCob += d
                consolidated.nPropComDif += e
                consolidated.nPropComEquiv += f * Number(pavs.coefNPropComDif)
                consolidated.propComCob += g
                consolidated.propComDif += h
                consolidated.propComEquiv += i * Number(pavs.coefPropComDif)
                consolidated.qtdPav = j


            }
        })
    })




    var a = req.body
    a.pavTotal = finalArray
    console.log(a)

    var novaObra = new Obra(a)
    novaObra.save(function(err){
        if(err){
            res.render("nbr12721tela.ejs", {titulo: "Área Restrita - NBR 12.721", message:"Ops, algo deu errado", username: req.user.username, restritoPrincipal: "", restritoPerfil: "", restritoUsuarios: "", restritoFerramentas: "active", layout: "layoutRestrito"});
        }
        else{
            res.render("nbr12721tela.ejs", {titulo: "Área Restrita - NBR 12.721", message:"Obra Cadastrada com Sucesso!", username: req.user.username, restritoPrincipal: "", restritoPerfil: "", restritoUsuarios: "", restritoFerramentas: "active", layout: "layoutRestrito"});
        }
    })
})


app.post('/editformulario/:id',isLoggedIn, function(req, res) {
    var arrayNames = []
    req.body.pav.forEach(function(pavs){
        if(!u.contains(arrayNames, pavs.pavimento)){
            arrayNames.push(pavs.pavimento)
        }
    })


    var finalArray = []
    arrayNames.forEach(function(name){
        var object = {
            pavimento : name,
            nPropPrivCob: 0,
            nPropPrivDif: 0,
            nPropPrivEquiv: 0,
            nPropComCob: 0,
            nPropComDif: 0,
            nPropComEquiv: 0,
            propComCob: 0,
            propComDif: 0,
            propComEquiv: 0,
            qtdPav: 0
        }
        finalArray.push(object)
    })

    req.body.pav.forEach(function(pavs){
        finalArray.forEach(function(consolidated){
            var a = (Number(pavs.nPropPrivCob) * Number(pavs.qtdUni) / Number(pavs.qtdPav))
            var b = (Number(pavs.nPropPrivDif) * Number(pavs.qtdUni) / Number(pavs.qtdPav))
            var c = (Number(pavs.nPropPrivDif) * Number(pavs.qtdUni) / Number(pavs.qtdPav) * Number(pavs.coefNPropPrivDif))
            var d = (Number(pavs.nPropComCob) * Number(pavs.qtdUni) / Number(pavs.qtdPav))
            var e = (Number(pavs.nPropComDif) * Number(pavs.qtdUni) / Number(pavs.qtdPav))
            var f = (Number(pavs.nPropComDif) * Number(pavs.qtdUni) / Number(pavs.qtdPav) * Number(pavs.coefNPropComDif))
            var g = (Number(pavs.propComCob) * Number(pavs.qtdUni) / Number(pavs.qtdPav))
            var h = (Number(pavs.propComDif) * Number(pavs.qtdUni) / Number(pavs.qtdPav))
            var i = (Number(pavs.propComDif) * Number(pavs.qtdUni) / Number(pavs.qtdPav) * Number(pavs.coefPropComDif))
            var j = (Number(pavs.qtdPav))
            if(consolidated.pavimento == pavs.pavimento){
                consolidated.nPropPrivCob += a
                consolidated.nPropPrivDif += b
                consolidated.nPropPrivEquiv += c
                consolidated.nPropComCob += d
                consolidated.nPropComDif += e
                consolidated.nPropComEquiv += f
                consolidated.propComCob += g
                consolidated.propComDif += h
                consolidated.propComEquiv += i
                consolidated.qtdPav = j


            }
        })
    })


    var a = req.body
    a.pavTotal = finalArray


    Obra.findByIdAndUpdate(req.params.id, a,function (err){

        if(err){
            res.render("nbr12721tela.ejs", {titulo: "Área Restrita - NBR 12.721", message:"Ops, algo deu errado", username: req.user.username, restritoPrincipal: "", restritoPerfil: "", restritoUsuarios: "", restritoFerramentas: "active", layout: "layoutRestrito"});
            console.log(err)
        }else{
            res.render("nbr12721tela.ejs", {titulo: "Área Restrita - NBR 12.721", message:"Obra Cadastrada com Sucesso!", username: req.user.username, restritoPrincipal: "", restritoPerfil: "", restritoUsuarios: "", restritoFerramentas: "active", layout: "layoutRestrito"});

        }
    });
});