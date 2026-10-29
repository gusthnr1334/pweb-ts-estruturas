const campoPreco = document.getElementById('preco') as HTMLInputElement;
const campoEntrada = document.getElementById('entrada') as HTMLInputElement;
const botao = document.getElementById('simular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;
const corpoTabela = document.getElementById('parcelas') as HTMLElement;

const formatarReal = (valor: number): string => `R$ ${valor.toFixed(2)}`;

function calcularTotal(valor: number, parcelas: number): number {
  return parcelas <= 3 ? valor : valor * 1.02 ** parcelas;
}

function simularParcelamento(preco: number, entrada?: number): string {
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

  let financiado: number;
  let linhas: string;

  if (campoEntrada.value === '') {
    financiado = preco;
    linhas = simularParcelamento(preco);
  } else {
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
