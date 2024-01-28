// Array para armazenar os números já sorteados
let listaNumerosSorteados = [];

// Limite para o número sorteado (o número secreto estará entre 1 e limiteNumeroSorteadoMaximo)
let limiteNumeroSorteadoMaximo = 10;

// Variável que armazena o número secreto gerado aleatoriamente
let numeroSecreto = gerarNumeroAleatorio();

// Contador de tentativas
let numeroTentativas = 1;

// Função para verificar o chute do jogador
function verificarChute() {
    // Obter o valor digitado pelo jogador
    let chute = document.querySelector('input').value;

    // Mensagem para exibir o número de tentativas
    let palavraTentativa = numeroTentativas == 1 ? 'tentativa' : 'tentativas';
    let mensagemTentativas = `Você descobriu o número secreto com ${numeroTentativas} ${palavraTentativa}!`;

    // Verificar se o chute está correto
    if (chute == numeroSecreto) {
        // Exibir mensagem de acerto na tela
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', mensagemTentativas);
        // Habilitar o botão de reiniciar
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else { 
        // Se o chute estiver incorreto, indicar se o número secreto é maior ou menor
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
        } else {
            exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
        }
    }
    // Incrementar o número de tentativas
    numeroTentativas ++;
    limparCampo();
}

// Função para exibir texto na tela e falar o texto em português brasileiro
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

// Função para gerar um número aleatório que não foi sorteado anteriormente
function gerarNumeroAleatorio() {
    let numeroSorteado = parseInt(Math.random() * limiteNumeroSorteadoMaximo + 1);
    // Reiniciar a lista de números sorteados se atingir o limite
    if (listaNumerosSorteados.length == limiteNumeroSorteadoMaximo) {
        listaNumerosSorteados = [];
    }
    // Se o número já foi sorteado, chamar a função novamente para obter um novo número
    if (listaNumerosSorteados.includes(numeroSorteado)){
        return gerarNumeroAleatorio();
    } else {
        // Adicionar o número à lista de números sorteados e retorná-lo
        listaNumerosSorteados.push(numeroSorteado);
        return numeroSorteado;
    }
}

// Função para limpar o campo de input
function limparCampo(){
    let chute = document.querySelector('input');
    chute.value = '';
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroTentativas = 1;
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    exibirMensagemInicial();
    // Desabilitar o botão de reiniciar
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

// Função para exibir a mensagem inicial na tela
function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${limiteNumeroSorteadoMaximo}`);
}

// Chamar a função para exibir a mensagem inicial quando a página carrega
exibirMensagemInicial();
