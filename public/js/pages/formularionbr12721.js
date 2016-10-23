var ContactPage = function () {

    return {



        //Message Function
        initMessage: function(){
            $(document).ready(function(){
                if ($("div#message").text() == "Dados Salvos com Sucesso!") {
                    $("div#message").attr("class" , "alert alert-success fade in")
                }
                if ($("div#message").text() == "Ops, algo deu errado") {
                    $("div#message").attr("class" , "alert alert-danger fade in")
                }
            })
        }




    };
}();



