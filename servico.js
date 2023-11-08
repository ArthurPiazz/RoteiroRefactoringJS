module.exports = class ServicoCalculoFatura {
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