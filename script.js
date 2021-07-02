const cartasTabuleiro = $('.carta');
let cartaFoiVirada = false;
let primeiraCarta, segundaCarta;
let travaJogo = false;
let erros = 0;
let matchTotal = 0;
let nomeJogador;

comecaJogo();
verificaNome();

function comecaJogo() {
    $('#comecaJogo').on('click', function () {
        $('#comecaJogo').addClass('travado');
        $(".jogoDaMemoria").html($(".jogoDaMemoria .carta").sort(function () {
            return Math.random() - 0.5;
        }));
        travaJogo = true;
        setTimeout(() => {
            $(cartasTabuleiro).addClass('vira travada');
        }, 1000);
        setTimeout(() => {
            travaJogo = false;
            $(cartasTabuleiro).removeClass('vira travada');
        }, 1800);
        contaClicks();
        $(cartasTabuleiro).click(viraCarta);
    });
};

function viraCarta() {
    if (travaJogo) return;
    if (this === primeiraCarta) return;
    $(this).addClass('vira travada');
    if (!cartaFoiVirada) {
        cartaFoiVirada = true;
        primeiraCarta = this;
        return;
    };
    segundaCarta = this;
    verificaMatch();
};

function verificaMatch() {
    let match = primeiraCarta.dataset.linguagem === segundaCarta.dataset.linguagem;
    match ? deuMatch() : naoDeuMatch();
};

function deuMatch() {
    $(primeiraCarta).addClass('match');
    $(segundaCarta).addClass('match');
    matchTotal ++;
    if (matchTotal >= 6){
        fimDeJogo ();
    }
    resetaJogo();
};

function naoDeuMatch() {
    travaJogo = true
    setTimeout(() => {
        $(primeiraCarta).removeClass('vira travada');
        $(segundaCarta).removeClass('vira travada');
        resetaJogo();
    }, 900);
    erros += 1;
    $('#erros').html(erros);

};

function resetaJogo() {
    cartaFoiVirada = false;
    travaJogo = false;
    primeiraCarta = null;
    segundaCarta = null;
};

function contaClicks() {
    let contaClick = 1;
    $(cartasTabuleiro).click(function () {
        $('#clicks').html(contaClick++);
    });
};

function verificaNome() {
    if ($('#nomeJogador').val() == '') {
        $('#comecaJogo').addClass('travado');
    }  nomeOk();
};

function nomeOk(){
    $('#nomeJogador').on('focusout',function(){
        if ($('#nomeJogador').val() != ''){
            nomeJogador = $('#nomeJogador').val();
            $('#comecaJogo').removeClass('travado');
        };
    }); 
};

function fimDeJogo(){
    alert ('Parabéns ' + nomeJogador + ' você terminou o jogo' );
};