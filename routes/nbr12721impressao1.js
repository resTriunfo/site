

app.get("/nbr12721impressao1/:id", isLoggedIn, function(req,res){
    var id = req.params.id
    Obra.findById(id,function(err,dados){
        res.render("nbr12721impressao1.ejs",{
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
            pavTotal: dados.pavTotal,
            message:""})
    })
})
