const { readFileSync } = require('fs');

class Repositorio {
  constructor() {
    this.pecas = JSON.parse(readFileSync('./pecas.json'));
  }
  getPeca(apre) {
    return this.pecas[apre.id];
  }
}


  class ServicoCalculoFatura {
    constructor(repo) {
      this.repo = repo;
    }
    calcularCredito(apre) {
      let creditos = 0;
      creditos += Math.max(apre.audiencia - 30, 0);
      if (this.repo.getPeca(apre).tipo === "comedia") 
        creditos += Math.floor(apre.audiencia / 5);
      return creditos;   
    }
    calcularTotalApresentacao(apre) {
      let total = 0;
      switch (this.repo.getPeca(apre).tipo) {
      case "tragedia":
        total = 40000;
        if (apre.audiencia > 30) {
          return total += 1000 * (apre.audiencia - 30);
        }else{
          return total
        }
        break;
      case "comedia":
        total = 30000;
        if (apre.audiencia > 20) {
           total += 10000 + 500 * (apre.audiencia - 20);
        }
        return total += 300 * apre.audiencia;
        break;
      default:
          throw new Error(`Peça desconhecia: ${this.repo.getPeca(apre).tipo}`);
      }
    }
    calcularTotalCreditos(fatura){
      let creditos = 0;
      for (let apre of fatura.apresentacoes) {
        creditos += this.calcularCredito(apre)
      }
      return creditos
    }
    calcularTotalFatura(fatura){
      let total = 0;
      for (let apre of fatura.apresentacoes) {
        total += this.calcularTotalApresentacao(apre)
      }
      return total;
    }
  }

  function getPeca(apresentacao) {
    return pecas[apresentacao.id];
  }
  function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR",
      { style: "currency", currency: "BRL",
        minimumFractionDigits: 2 }).format(valor/100);
  }  
  function gerarFaturaStr (fatura, calc) {
    let faturaStr = `Fatura ${fatura.cliente}\n`;
    for (let apre of fatura.apresentacoes) {
        faturaStr += `  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
    }
    faturaStr += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura))}\n`;
    faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura)} \n`;
    return faturaStr;
  }
  function gerarFaturaHtml (fatura, calc) {
    let Html = `<html>\n<p>Fatura ${fatura.cliente}</p>\n<ul>\n`;
    for (let apre of fatura.apresentacoes) {
      Html += `<li>${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)</li>\n`;
  }
  Html += `</ul>\n<p>Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura))}</p>\n`;
  Html += `<p>Créditos acumulados: ${calc.calcularTotalCreditos(fatura)}</p>\n</html>`;
  return Html;

  }


const calc = new ServicoCalculoFatura(new Repositorio());
const faturas = JSON.parse(readFileSync('./faturas.json'));
const faturaStr = gerarFaturaStr(faturas, calc);
//const faturaHTML = gerarFaturaHtml(faturas, pecas, calc)
console.log(faturaStr);
//console.log(faturaHTML);
