// dao.js
var ips;
var db;

$(document).ready(function() {

    ips = JSON.parse(db.getItem("ips"));

});
function Dao(_nomeTabela){
    this.nomeTabela = _nomeTabela;
   
    try{
        if (window.localStorage){
            this.db = window.localStorage;
            db = window.localStorage;   
        }

    } catch(e) {
        console.log("Erro");
        return undefined;
    }

    this.listar = function(){
        this.dados = JSON.parse(this.db.getItem(this.nomeTabela));
        if(this.dados == null){
            this.dados =[];
        }
        return this.dados;      

    };

    this.inserir = function(objeto){
        // if(ips.length <= 0){
        //     ips = [];
        // }

        if(ips == undefined){
            ips = [];
         }
        
        ips.push(objeto);
        this.db.setItem(this.nomeTabela, JSON.stringify(ips));
        ips = JSON.parse(db.getItem(this.nomeTabela));

    };

    this.alterar = function(index, objeto){
        this.dados[index] = objeto;
        this.db.setItem(this.nomeTabela, JSON.stringify(this.dados));
        ips = JSON.parse(db.getItem(this.nomeTabela));

    };

    this.excluir = function(index){
        this.dados.splice(index, 1);
        this.db.setItem(this.nomeTabela, JSON.stringify(this.dados));
        ips = JSON.parse(db.getItem(this.nomeTabela));

    };

}