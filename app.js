//let titulo = document.querySelector("h2")
//titulo.innerHTML = "Jogo do numero secreto"

//let paragrafo = document.querySelector("p")
//paragrafo.innerHTML = "Escolha um numero entre 1 a 10"
let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativa = 1;

function mudarTexto(tag, corpo) {
    let texto = document.querySelector(tag);
    texto.innerHTML = corpo;
    responsiveVoice.speak(corpo, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirTextoInicial () {
    mudarTexto("h2", "Jogo do número secreto");
    mudarTexto("p", "Escolha um numero entre 1 e 10");
}

exibirTextoInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        mudarTexto('h2', 'Acertou!');
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você acertou o numero secreto com ${tentativa} ${palavraTentativa}`
        mudarTexto('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
        mudarTexto('p', 'O número secreto é menor');
    } else {
        mudarTexto('p', 'O número secreto é maior');
    }
    tentativa++
    limparCampo();
}
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosDaLista = listaNumerosSorteados.length;

    if (quantidadeDeElementosDaLista == 10) {
        listaNumerosSorteados = [];
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio()
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}
 
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    exibirTextoInicial();
    tentativa = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}