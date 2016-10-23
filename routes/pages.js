app.get("/", function(req,res){
    res.render("index.ejs", {titulo: "Maschio Shin Construtora e Incorporadora LTDA", layout: "blanklayout"});
})

app.get("/index", function(req,res){
    res.render("index.ejs", {titulo: "Maschio Shin Construtora e Incorporadora LTDA", layout: "blanklayout"});
})

app.get("/404", function(req,res){
    res.render("page_404.ejs", {titulo: "Erro 404 - Página não encontrada", description: "Erro 404 - Página não encontrada", message:"", homeClass: "", empreendimentosClass: "", contatoClass: ""});
})

app.get("/googlef25ee2c6ab692948.html", function(req,res){
    res.render("googlef25ee2c6ab692948.ejs", {titulo: "Página de verificação do Google", layout: "blanklayout"});
})

app.get("/sitemap.xml", function(req,res){
    res.send("sitemap.xml")
})

app.get("/contato", function(req,res){
    res.render("page_contato.ejs", {titulo: "Contato", description: "Entre em contato conosco! Preencha nosso formulário, entre em contato ou ligue!", message:"", homeClass: "", empreendimentosClass: "", contatoClass: "active"});
})

app.get("/empreendimentos", function(req,res){
    res.render("page_empreendimentos.ejs", {titulo: "Empreendimentos", description: "Conheça os empreendimentos da Construtora Maschio Shin. Faça já sua reserva!", homeClass: "", empreendimentosClass: "active", contatoClass: ""});
})

app.get("/faq", function(req,res){
    res.render("page_faq.ejs", {titulo: "Perguntas Frequentes", description: "Perguntas Frequentes sobre compra de imóvel, construção e incorporação",message:"", homeClass: "", empreendimentosClass: "", contatoClass: ""});
})

app.get("/login", function(req,res){
    res.render("page_login.ejs", {titulo: "Login", description: "Acesso a área restrita do nosso site", message:"", homeClass: "", empreendimentosClass: "", contatoClass: ""});
})

app.get("/residencial_sao_sebastiao", function(req,res){
    res.render("residencial_sao_sebastiao.ejs", {titulo: "Residencial São Sebastião", description: "Conheça o Residencial São Sebastião, o mais novo lançamento de Cotia. Reserve já sua unidade!", message:"", homeClass: "", empreendimentosClass: "active", contatoClass: ""});
})

app.get("/nbr12721", function(req,res){
    res.render("nbr12721.ejs", {titulo: "NBR 12.721", description: "Elaboramos quadros da NBR 12.721. Faça já seu orçamento conosco!", message:"", homeClass: "", empreendimentosClass: "", contatoClass: ""});
})

app.get("/itbieregistro", function(req,res){
    res.render("itbieregistro.ejs", {titulo: "Cálculo do ITBI e do Registro", description: "Aprenda como funciona o cálculo do ITBI e do Registro imobiliário", message:"", homeClass: "", empreendimentosClass: "", contatoClass: ""});
})

//*********************************** PÁGINAS DA ÁREA RESTRITA *************************************

app.get("/restritoadm", isLoggedIn, function(req,res){
    res.render("restritoadm.ejs", {titulo: "Área Restrita - Principal", message:"", username: req.user.username, restritoPrincipal: "active", restritoPerfil: "", restritoUsuarios: "", restritoFerramentas: "", layout: "layoutRestrito"});
})

app.get("/restritoperfil", isLoggedIn, function(req,res){
    res.render("restritoperfil.ejs", {titulo: "Área Restrita - Perfil", message:"", username: req.user.username, restritoPrincipal: "", restritoPerfil: "active", restritoUsuarios: "", restritoFerramentas: "", layout: "layoutRestrito"});
})

app.get("/restritousuarios", isLoggedIn, function(req,res){
    res.render("restritousuarios.ejs", {titulo: "Área Restrita - Usuários", message:"", username: req.user.username, restritoPrincipal: "", restritoPerfil: "", restritoUsuarios: "active", restritoFerramentas: "", layout: "layoutRestrito"});
})

app.get("/restritoferramentas", isLoggedIn, function(req,res){
    res.render("restritoferramentas.ejs", {titulo: "Área Restrita - Ferramentas", message:"", username: req.user.username, restritoPrincipal: "", restritoPerfil: "", restritoUsuarios: "", restritoFerramentas: "active", layout: "layoutRestrito"});
})

app.get("/nbr12721tela", isLoggedIn, function(req,res){
    res.render("nbr12721tela.ejs", {titulo: "Área Restrita - NBR 12.721", message:"", username: req.user.username, restritoPrincipal: "", restritoPerfil: "", restritoUsuarios: "", restritoFerramentas: "active", layout: "layoutRestrito"});
})

app.get('/formularionbr12721', isLoggedIn, function(req, res) {
    res.render('formularionbr12721.ejs', {titulo: "NBR 12.721 - Formulários", message:"", layout: "blanklayout"});
});

app.get("/restritoimob/:user", isLoggedIn, function(req,res){
    res.render("restritoimob.ejs", {titulo: "Área Restrita - Imobiliária", message:"", username: req.user.username, restritoPrincipal: "active", restritoPerfil: "", restritoUsuarios: "", restritoFerramentas: "", layout: "layoutRestrito"});
})

app.get("/calculodoc", isLoggedIn, function(req,res){
    res.render("calculodoc.ejs", {titulo: "Calculadora Documentação", message:"", username: req.user.username, restritoPrincipal: "", restritoPerfil: "", restritoUsuarios: "", restritoFerramentas: "active", layout: "layoutRestrito"});
})