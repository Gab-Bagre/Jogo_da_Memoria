// variaveis do jogo
const cartasTabuleiro = $('.carta');
let cartaFoiVirada = false;
let primeiraCarta, segundaCarta;
let travaJogo = false;
let erros = 0;

comecaJogo ();

function comecaJogo() {
    $('#comecaJogo').on('click', function () {
        $('#comecaJogo').addClass('travado');
        $(".jogoDaMemoria").html($(".jogoDaMemoria .carta").sort(function(){
            return Math.random()-0.5;
        }));
        travaJogo = true
         setTimeout(() => {
            $(cartasTabuleiro).addClass('vira travada');
        }, 900)
        setTimeout(() => {
            travaJogo = false
            $(cartasTabuleiro).removeClass('vira travada');
        }, 1800)
    
        contaClicks()
        $(cartasTabuleiro).click(viraCarta);
    })  
}

function viraCarta() {
    if (travaJogo) return;
    if (this === primeiraCarta) return;
    $(this).addClass('vira travada');
    if (!cartaFoiVirada) {
        cartaFoiVirada = true;
        primeiraCarta = this;
        return;
    }
    segundaCarta = this;
    verificaMatch();
}

function verificaMatch() {
    let match = primeiraCarta.dataset.linguagem === segundaCarta.dataset.linguagem;
    match ? deuMatch() : naoDeuMatch();
}

function deuMatch() {
    $(primeiraCarta).addClass('match');
    $(segundaCarta).addClass('match');
    resetaJogo();
}

function naoDeuMatch() {
    travaJogo = true
    setTimeout(() => {
        $(primeiraCarta).removeClass('vira travada');
        $(segundaCarta).removeClass('vira travada');
        resetaJogo();
    }, 900);
    erros +=1;
    $('#erros').html(erros);
    
}

function resetaJogo() {
    cartaFoiVirada = false;
    travaJogo = false;
    primeiraCarta = null;
    segundaCarta =  null ;   
}

function contaClicks (){ 
    let conta = 1;
    $(cartasTabuleiro).click(function(){
        $('#clicks').html(conta++);
    });
 };
