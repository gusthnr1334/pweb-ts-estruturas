type Formatador = (valor: number) => string;

const campoItens = document.getElementById('itens') as HTMLTextAreaElement;
const campoCupom = document.getElementById('cupom') as HTMLInputElement;
const campoFidelidade = document.getElementById('fidelidade') as HTMLInputElement;
const botao = document.getElementById('fechar') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

const formatarReal: Formatador = (valor) => `R$ ${valor.toFixed(2)}`;

function lerPrecos(texto: string): { precos: number[]; ignorados: number } {
  const linhas = texto.split('\n');
  const precos: number[] = [];
  let ignorados = 0;

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i].trim();

    if (linha === '') {
      continue;
    }

    const preco = Number(linha.replace(',', '.'));

    if (!Number.isFinite(preco) || preco <= 0) {
      ignorados++;
      continue;
    }

    precos.push(preco);

    if (precos.length === 20) {
      break;
    }
  }

  return { precos, ignorados };
}

function somarItens(...precos: number[]): number {
  let soma = 0;
  for (const preco of precos) {
    soma += preco;
  }
  return soma;
}

function calcularDesconto(total: number, percentual: number): number;
function calcularDesconto(total: number, cupom: string): number;
function calcularDesconto(total: number, regra: number | string): number {
  if (typeof regra === 'number') {
    return (total * regra) / 100;
  }

  switch (regra.trim().toUpperCase()) {
    case 'BEMVINDO':
      return (total * 10) / 100;
    case 'PROMO20':
      return (total * 20) / 100;
    case 'MENOS15':
      return total >= 100 ? 15 : 0;
    default:
      return 0;
  }
}

botao.addEventListener('click', () => {
  const { precos, ignorados } = lerPrecos(campoItens.value);

  if (precos.length === 0) {
    saida.textContent = 'Nenhum item válido';
    saida.className = 'erro';
    return;
  }

  const subtotal = somarItens(...precos);
  const cupom = campoCupom.value.trim();
  const descontoCupom = cupom === '' ? 0 : calcularDesconto(subtotal, cupom);
  const aposCupom = subtotal - descontoCupom;
  const descontoFidelidade = campoFidelidade.checked ? calcularDesconto(aposCupom, 5) : 0;
  const total = aposCupom - descontoFidelidade;

  const linhas: string[] = [];

  const textoIgnorados =
    ignorados > 0 ? ` (${ignorados} ${ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas'})` : '';
  linhas.push(`Itens: ${precos.length}${textoIgnorados}`);
  linhas.push(`Subtotal: ${formatarReal(subtotal)}`);

  if (cupom !== '') {
    linhas.push(
      descontoCupom > 0
        ? `Cupom ${cupom.toUpperCase()}: - ${formatarReal(descontoCupom)}`
        : 'Cupom inválido ou não aplicável'
    );
  }

  if (campoFidelidade.checked) {
    linhas.push(`Fidelidade (5%): - ${formatarReal(descontoFidelidade)}`);
  }

  linhas.push(`Total a pagar: ${formatarReal(total)}`);

  saida.textContent = linhas.join('\n');
  saida.className = '';
});
