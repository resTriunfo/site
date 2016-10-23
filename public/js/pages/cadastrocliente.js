var CadastroCliente = function () {

    return {



        //Message Function
        initMessage: function(){
            $(document).ready(function(){
                if ($("div#message").text() == "Cliente Criado com Sucesso!") {
                    $("div#message").attr("class" , "alert alert-success fade in")
                }
                if ($("div#message").text() == "Ops, algo deu errado") {
                    $("div#message").attr("class" , "alert alert-danger fade in")
                }
            })
        },

        populateTable: function(){
            var tableContent = "";
            $.getJSON("/clientlist",function(data){
                $.each(data, function(){
                    tableContent += '<tr>';
                    tableContent += '<td>'+ this.username +'</td>';
                    tableContent += '<td width="16%"><span class="nowrap">' + this.telephone +'</span></td>';
                    tableContent += '<td>' + this.email +'</td>';
                    tableContent += '<td>' + this.renda +'</td>';
                    tableContent += '<td>' + this.datanasc +'</td>';
                    tableContent += '<td>' + this.promotor +'</td>';
                    tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '"><button class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Deletar</button></a></td>';
                    tableContent += '</tr>';
                });
                $('#tabela').html(tableContent);


            })
        }




    };


}();