const campoConsumo = document.getElementById('consumo');
const campoTipo = document.getElementById('tipo');
const campoBandeira = document.getElementById('bandeira');
const botao = document.getElementById('calcular');
const saida = document.getElementById('resultado');
function tarifaPorKwh(tipo) {
    switch (tipo) {
        case 'residencial':
        case 'rural':
            return 0.8;
        case 'comercial':
        case 'industrial':
            return 0.95;
    }
}
function adicionalBandeira(consumo, bandeira = 'verde') {
    switch (bandeira) {
        case 'verde':
            return 0;
        case 'amarela':
            return consumo * 0.02;
        case 'vermelha1':
            return consumo * 0.04;
        case 'vermelha2':
            return consumo * 0.08;
    }
}
function mensagemBandeira(bandeira) {
    switch (bandeira) {
        case 'verde':
            return 'Condições favoráveis de geração de energia.';
        case 'amarela':
            return 'Condições de geração menos favoráveis.';
        case 'vermelha1':
        case 'vermelha2':
            return 'Condições mais caras de geração. Economize!';
        default:
            return '';
    }
}
function nomeBandeira(bandeira) {
    switch (bandeira) {
        case 'verde':
            return 'verde';
        case 'amarela':
            return 'amarela';
        case 'vermelha1':
            return 'vermelha (patamar 1)';
        case 'vermelha2':
            return 'vermelha (patamar 2)';
    }
}
const formatarReal = (valor) => `R$ ${valor.toFixed(2)}`;
// Resultado: 0. Sem o segundo argumento, bandeira assume o valor padrão 'verde', que não tem adicional.
console.log(adicionalBandeira(100));
botao.addEventListener('click', () => {
    const consumo = campoConsumo.valueAsNumber;
    if (!(consumo > 0)) {
        saida.textContent = 'Informe um consumo válido';
        saida.className = 'erro';
        return;
    }
    const tipo = campoTipo.value;
    const bandeira = campoBandeira.value;
    const energia = consumo * tarifaPorKwh(tipo);
    const adicional = adicionalBandeira(consumo, bandeira);
    const total = energia + adicional;
    saida.textContent = [
        `Energia: ${formatarReal(energia)}`,
        `Bandeira ${nomeBandeira(bandeira)}: ${formatarReal(adicional)}`,
        `Total: ${formatarReal(total)}`,
        mensagemBandeira(bandeira),
    ].join('\n');
    saida.className = bandeira !== 'verde' ? 'alerta' : '';
});
export {};
//# sourceMappingURL=ex02.js.map