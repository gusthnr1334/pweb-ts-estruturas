const campoMeta = document.getElementById('meta');
const campoDeposito = document.getElementById('deposito');
const campoTaxa = document.getElementById('taxa');
const botao = document.getElementById('calcular');
const saida = document.getElementById('resultado');
const formatarReal = (valor) => `R$ ${valor.toFixed(2)}`;
const formatarMeses = (meses) => {
    const anos = Math.floor(meses / 12);
    const resto = meses % 12;
    const textoAnos = `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
    const textoMeses = `${resto} ${resto === 1 ? 'mês' : 'meses'}`;
    if (anos === 0) {
        return textoMeses;
    }
    return resto === 0 ? textoAnos : `${textoAnos} e ${textoMeses}`;
};
function calcularMeses(meta, deposito, taxa = 0.5) {
    let saldo = 0;
    let depositado = 0;
    let meses = 0;
    while (saldo < meta) {
        meses++;
        const aporte = meses % 12 === 0 ? deposito * 2 : deposito;
        saldo = saldo * (1 + taxa / 100) + aporte;
        depositado += aporte;
        if (meses === 600) {
            break;
        }
    }
    return { meses, saldo, depositado };
}
function exibirValor(rotulo, valor, formatar) {
    return `${rotulo}: ${formatar(valor)}`;
}
botao.addEventListener('click', () => {
    const meta = campoMeta.valueAsNumber;
    const deposito = campoDeposito.valueAsNumber;
    if (!(meta > 0) || !(deposito > 0)) {
        saida.textContent = 'Informe valores positivos';
        saida.className = 'erro';
        return;
    }
    const calculo = campoTaxa.value === ''
        ? calcularMeses(meta, deposito)
        : calcularMeses(meta, deposito, campoTaxa.valueAsNumber);
    if (calculo.saldo < meta) {
        saida.textContent = [
            'Meta inalcançável em 50 anos.',
            exibirValor('Saldo após 600 meses', calculo.saldo, formatarReal),
        ].join('\n');
        saida.className = 'erro';
        return;
    }
    const rotuloMeses = `${calculo.meses} ${calculo.meses === 1 ? 'mês' : 'meses'}`;
    saida.textContent = [
        `Você atinge a meta em ${rotuloMeses} (${formatarMeses(calculo.meses)}).`,
        exibirValor('Saldo final', calculo.saldo, formatarReal),
        exibirValor('Total depositado', calculo.depositado, formatarReal),
        exibirValor('Rendimento', calculo.saldo - calculo.depositado, formatarReal),
    ].join('\n');
    saida.className = 'sucesso';
});
export {};
//# sourceMappingURL=ex04.js.map