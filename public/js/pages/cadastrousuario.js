var CadastroUsuario = function () {

    return {



        //Message Function
        initMessage: function(){
            $(document).ready(function(){
                if ($("div#message").text() == "Usuário Criado com Sucesso!") {
                    $("div#message").attr("class" , "alert alert-success fade in")
                }
                if ($("div#message").text() == "Ops, algo deu errado") {
                    $("div#message").attr("class" , "alert alert-danger fade in")
                }
            })
        },

        populateTable: function(){
            var tableContent = "";
            $.getJSON("/userlist",function(data){
                $.each(data, function(){
                    tableContent += '<tr>';
                    tableContent += '<td>'+ this.username +'</td>';
                    tableContent += '<td>' + this.password +'</td>';
                    tableContent += '<td>' + this.perfil +'</td>';
                    tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '"><button class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i> Deletar</button></a></td>';
                    tableContent += '</tr>';
                });
                $('#tabela').html(tableContent);


            })
        }




    };


}();
