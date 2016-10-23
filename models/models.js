
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    perfil: String

})
User = mongoose.model("User",userSchema)

var clientSchema = mongoose.Schema({
    username: String,
    telephone: String,
    email: String,
    renda: String,
    datanasc: String,
    promotor: String
})
Client = mongoose.model("Client", clientSchema)


var nbrSchema = mongoose.Schema({
    dataPreench: String,
    nomeInc: String,
    cnpjInc: String,
    cpfInc: String,
    enderecoInc: String,
    profissionalTec: String,
    creaTec: String,
    artTec: String,
    enderecoTec: String,
    nomeProj: String,
    localProj: String,
    cidadeProj: String,
    designacaoProj: String,
    quantidadeProj: String,
    padraoProj: String,
    pavimentosProj: String,
    vagasAutonomas: String,
    vagasAcessorio: String,
    vagasComum: String,
    areaProj: String,
    dataAprov: String,
    numeroAlvara: String,
    pav: [{
        nomeArea: "String",
        pavimento: "String",
        nPropPrivCob: "Number",
        nPropPrivDif: "Number",
        coefNPropPrivDif: "Number",
        nPropPrivEquiv: "Number",
        nPropComCob: "Number",
        nPropComDif: "Number",
        coefNPropComDif: "Number",
        nPropComEquiv: "Number",
        propComCob: "Number",
        propComDif: "Number",
        coefPropComDif: "Number",
        propComEquiv: "Number",
        qtdPav: "Number",
        qtdUni: "Number",
        unidAut: "String"}],
    pavTotal: {},

})
Obra = mongoose.model("Obra",nbrSchema)