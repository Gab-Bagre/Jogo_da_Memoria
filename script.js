const cartasTabuleiro = $('.carta')
    let cartaFoiVirada = false    
    let primeiraCarta, segundaCarta
   
function viraCarta() {
    $(this).addClass('vira')

    if(!cartaFoiVirada) {
        cartaFoiVirada = true
        primeiraCarta = this
    } else {
        cartaFoiVirada = false
        segundaCarta = this
        console.log('duas cartas foram clicadas')
        
        if (primeiraCarta.dataset.linguagem === segundaCarta.dataset.linguagem) {
            $(primeiraCarta).off('click', viraCarta) 
            $(segundaCarta).off('click', viraCarta) 
            console.log ("duas cartas iguais foram clicadas")
        } else {
           $(primeiraCarta).removeClass('vira')  
           $(segundaCarta).removeClass('vira')  
        }
    }
}

$(cartasTabuleiro).on('click',viraCarta)
