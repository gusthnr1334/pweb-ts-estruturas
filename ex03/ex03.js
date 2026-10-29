const campoPreco = document.getElementById('preco');
const campoEntrada = document.getElementById('entrada');
const botao = document.getElementById('simular');
const saida = document.getElementById('resultado');
const corpoTabela = document.getElementById('parcelas');
const formatarReal = (valor) => `R$ ${valor.toFixed(2)}`;
function calcularTotal(valor, parcelas) {
    return parcelas <= 3 ? valor : valor * 1.02 ** parcelas;
}
function simularParcelamento(preco, entrada) {
    const financiado = typeof entrada !== 'undefined' ? preco - entrada : preco;
    let linhas = '';
    for (let parcelas = 1; parcelas <= 12; parcelas++) {
        if (parcelas === 7 || parcelas === 8 || parcelas === 9 || parcelas === 11) {
            continue;
        }
        const total = calcularTotal(financiado, parcelas);
        const valorParcela = total / parcelas;
        if (valorParcela < 50) {
            break;
        }
        const juros = parcelas <= 3 ? 'sem juros' : '2% a.m.';
        linhas += `<tr><td>${parcelas}x</td><td>${formatarReal(valorParcela)}</td><td>${formatarReal(total)}</td><td>${juros}</td></tr>`;
    }
    return linhas;
}
botao.addEventListener('click', () => {
    const preco = campoPreco.valueAsNumber;
    if (!(preco > 0)) {
        saida.textContent = 'Informe um preço válido';
        corpoTabela.innerHTML = '';
        return;
    }
    let financiado;
    let linhas;
    if (campoEntrada.value === '') {
        financiado = preco;
        linhas = simularParcelamento(preco);
    }
    else {
        const entrada = campoEntrada.valueAsNumber;
        if (entrada >= preco) {
            saida.textContent = 'A entrada cobre o valor total. Não há parcelas.';
            corpoTabela.innerHTML = '';
            return;
        }
        financiado = preco - entrada;
        linhas = simularParcelamento(preco, entrada);
    }
    saida.textContent = `Valor financiado: ${formatarReal(financiado)}`;
    corpoTabela.innerHTML = linhas;
});
export {};
//# sourceMappingURL=ex03.js.map