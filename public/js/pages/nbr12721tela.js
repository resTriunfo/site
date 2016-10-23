var CadastroObras = function () {

    return {

        initMessage: function(){

                if ($("div#message").text() == "Obra Cadastrada com Sucesso!") {
                    $("div#message").attr("class" , "alert alert-success fade in")
                }
            if ($("div#message").text() == "Obra Editada com Sucesso!") {
                $("div#message").attr("class" , "alert alert-success fade in")
            }
                if ($("div#message").text() == "Ops, algo deu errado") {
                    $("div#message").attr("class" , "alert alert-danger fade in")
                }

        },


        populateTable: function(){
            var tableContent = "";
            $.getJSON("/obralist",function(data){
                $.each(data, function(){
                    tableContent += '<tr>';
                    tableContent += '<td>' + this.nomeProj +'</td>';
                    tableContent += '<td><form method="get" action="/editformulario/'+this._id+'"><button class="btn btn-warning btn-xs"><i class="fa fa-pencil-square-o"></i> Editar</button></td></form></td>';
                    tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '"><button class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Deletar</button></a></td>';
                    tableContent += '<td><a href="/nbr12721impressao/'+this._id+'"> IP</a> - <a href="/nbr12721impressao1/'+this._id+'"> I</a> - <a href="/nbr12721impressao2/'+this._id+'"> II</a> - <a href="/nbr12721impressao3/'+this._id+'"> III</a> - <a href="/nbr12721impressao4/'+this._id+'"> IV</a> - <a href="/nbr12721impressao5/'+this._id+'"> V</a> - <a href="/nbr12721impressao6/'+this._id+'"> VI</a> - <a href="/nbr12721impressao7/'+this._id+'"> VII</a> - <a href="/nbr12721impressao8/'+this._id+'"> VIII</a></td>';
                    tableContent += '</tr>';

                });
                $('#tabelaobras').html(tableContent);


            })
        }




    };


}();
