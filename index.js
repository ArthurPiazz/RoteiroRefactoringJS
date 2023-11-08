const { readFileSync } = require('fs');
var Repositorio = require("./repositorio.js");
var ServicoCalculoFatura = require("./servico.js")
var formatarMoeda = require("./util.js")
var gerarFaturaStr = require("./apresentacao.js")

  /*function gerarFaturaHtml (fatura, calc) {
    let Html = `<html>\n<p>Fatura ${fatura.cliente}</p>\n<ul>\n`;
    for (let apre of fatura.apresentacoes) {
      Html += `<li>${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)</li>\n`;
  }
  Html += `</ul>\n<p>Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura))}</p>\n`;
  Html += `<p>Créditos acumulados: ${calc.calcularTotalCreditos(fatura)}</p>\n</html>`;
  return Html;

  }*/


const calc = new ServicoCalculoFatura(new Repositorio());
const faturas = JSON.parse(readFileSync('./faturas.json'));
const faturaStr = gerarFaturaStr(faturas, calc);
//const faturaHTML = gerarFaturaHtml(faturas, pecas, calc)
console.log(faturaStr);
//console.log(faturaHTML);
