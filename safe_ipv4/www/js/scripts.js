var qtd_IP;
var ipDao = new Dao("ips");
var idAtual = 0;
//var checado;


var ipsDigitados = {}; // {} -> Objeto
var arrayIpResultante = []; // [] -> vetor

$(document).ready(function() {
    $("#pag2").hide();
    $("#pag3").hide();
    $("#erro").hide();
    $("#alertaAdicionado").hide();
    $("#alertaAlterado").hide();
    $("#alertaExcluido").hide();
    

    $("#btnExibeLista").click( function() {
        
        calcula_range();
        
    });

    $("#btnVoltarHome").click( function() {
        $("#pag2").hide();
        $("#pag3").hide();
        $("#erro").hide();
        $("#pag1").show();

    });

    $("#btnVoltarLista").click(function() {
        $("#pag3").hide();
        $("#pag2").show();
    });

    $("#btnSalvar").click(function() {
        var ip = {};
        ip.codigo = $("#txtCodigo").val();
        ip.nome = $("#txtNome").val();
        ip.descricao = $("#txtDescricao").val();
        ip.ip = $("#ipSelecionado").html().trim();

        if(idAtual < 0){
            ipDao.inserir(ip);
            listar();
            $("#pag3").hide();
            $("#pag2").show();
            $("#alertaAdicionado").show();
            
            setTimeout(function(){
                $("#alertaAdicionado").hide();
            },2000);

        }else{
            editar();
            $("#pag3").hide();
            $("#pag2").show();
            $("#alertaAlterado").show();
           
            setTimeout(function(){
                $("#alertaAlterado").hide();
            },2000);
        }

    });

    $("#btnExcluir").click(function() {
        excluir(idAtual);
        listar();
        $("#pag1").hide();
        $("#pag3").hide();
        $("#pag2").show();
        $("#alertaExcluido").show();

        setTimeout(function(){
            $("#alertaExcluido").hide();
        },2000);
    });

});


function calcula_range(){ // Calcula range de ips

    ipsDigitados = {};

    // IP Inicial 
    var ipInicio1 = $("#txtIPinicial1").val();
    var ipInicio2 = $("#txtIPinicial2").val();
    var ipInicio3 = $("#txtIPinicial3").val();
    var ipInicio4 = $("#txtIPinicial4").val();

    //IP Final
    var ipFinal1 = $("#txtIPfinal1").val();
    var ipFinal2 = $("#txtIPfinal2").val();
    var ipFinal3 = $("#txtIPfinal3").val();
    var ipFinal4 = $("#txtIPfinal4").val();

    // adicionando no objeto 'ipsDigitados'
    ipsDigitados.ipInicio1 = ipInicio1;
    ipsDigitados.ipInicio2 = ipInicio2;
    ipsDigitados.ipInicio3 = ipInicio3;
    ipsDigitados.ipInicio4 = ipInicio4;
    ipsDigitados.ipFinal4 = ipFinal4;


    //console.log("ip inicial 1: " +ipInicio1);
    
    if(((ipInicio1 == ipFinal1) && (ipInicio2 == ipFinal2)) && (ipInicio3 == ipFinal3)) {
        qtd_IP = ipFinal4 - ipInicio4;
        if(qtd_IP <= 0){
            $("#erro").show();
            setTimeout(function(){
                $("#erro").hide();
            },2000);

        }else{
            $("#pag1").hide();
            $("#pag3").hide();
            ipsDigitados.calculo = qtd_IP;
           
           listar();
        }

    }else{
        // colocar os campos null - enviar um alert informando o erro
        $("#erro").show();
        setTimeout(function(){
            $("#erro").hide();
        },2000);
    }

//     var teste = $("#teste");
//    teste.html("<div class='container'><b>Quantidade: </b>" +qtd_IP+ "</div>");  

}


function listar() {
    idAtual = -1;
    
    $("#listaIps").html("");    
    var aux = 0;
    for(i=0; i<(ipsDigitados.calculo+1); i++) {
        var ultimoDigito = parseFloat(ipsDigitados.ipInicio4)+aux;
        var ipRes = ipsDigitados.ipInicio1+"."+ipsDigitados.ipInicio2+"."+ipsDigitados.ipInicio3+"."+ultimoDigito;
        var checado;
        checado = "";
        for(j in ips){

            if(ips[j].ip == ipRes){  
                checado = "<i class='fas fa-check cor-check'></i>";
            }
        }

        $("#listaIps").append("<a href='#' onclick='detalhar_lista("+i+")'"+
                    "class='list-group-item list-group-item-action'>" +
                    " " + "<b>" + (i+1) + "</b>" + " - " + ipRes + checado +
                    "</a>");

        aux++;
        arrayIpResultante.push(ipRes);
    }

    $("#pag2").show();       
};

function detalhar_lista(index){
    console.log(arrayIpResultante[index]);
    
    $("#ipSelecionado").html(arrayIpResultante[index]);

    var encontrou = false;
    for(var a in ips){
        if(arrayIpResultante[index] == ips[a].ip){
            $("#txtCodigo").val(ips[a].codigo);
            $("#txtNome").val(ips[a].nome);
            $("#txtDescricao").val(ips[a].descricao);

            encontrou = true;
            idAtual = 1;
        }
    }

    if(!encontrou){
        $("#txtCodigo").val("");
        $("#txtNome").val("");
        $("#txtDescricao").val("");
        idAtual = -1;
    }
    
    $("#pag1").hide();
    $("#pag2").hide();
    $("#pag3").show();

}

function editar(){
    var ipDaSelecao = $("#ipSelecionado").html();

    for(var a in ips){
        if(ipDaSelecao == ips[a].ip){
           ips[a].codigo = $("#txtCodigo").val();
           ips[a].nome = $("#txtNome").val();
           ips[a].descricao =  $("#txtDescricao").val();
        }
    }

    db.setItem("ips", JSON.stringify(ips));

}

function excluir(){

    var ipDaSelecao = $("#ipSelecionado").html();

    for(var a in ips){
        if(ipDaSelecao == ips[a].ip){
            // Splice -> teste.splice(indice, qtidade de itens a ser excluidos);
           ips.splice(a,1);
        }
    }

    db.setItem("ips", JSON.stringify(ips));
}
