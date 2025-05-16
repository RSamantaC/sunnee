// Interfaccia IProdotto 
interface IProdotto {
    tipo: string;
    id: string;
    taglia: string;
    colore: string;
    stato: 'disponibile' | 'esaurito';
    assegnaCliente(cliente: ICliente): void;
  }
  
  // Interfaccia ICliente
  interface ICliente {
    nome: string;
    cognome: string;
    email: string;
    metodoPagamento: string;
    ordinaProdotto(prodotto: IProdotto): void;
  }

  // Interfaccia IProcessoProduzione
  interface IProcessoProduzione {
    nomeProcesso: string;
    descrizione: string;
    prodottiInProduzione: IProdotto[];
    aggiungiProdotto(prodotto: IProdotto): void;
  }

  // Classi
class Prodotto implements IProdotto {
  tipo: string;
  id: string;
  taglia: string;
  colore: string;
  stato: 'disponibile' | 'esaurito';
  cliente: ICliente | null = null;

  constructor(tipo: string, id: string, taglia: string, colore: string, stato: 'disponibile' | 'esaurito') {
    this.tipo = tipo;
    this.id = id;
    this.taglia = taglia;
    this.colore = colore;
    this.stato = stato;
  }

  assegnaCliente(cliente: ICliente): void {
    if (this.stato === 'disponibile') {
      this.cliente = cliente;
      this.stato = 'esaurito';
      console.log(`Prodotto ${this.id} assegnato a ${cliente.nome}`);
    } else {
      console.log(`Prodotto ${this.id} non disponibile.`);
    }
  }
}

class Cliente implements ICliente {
  nome: string;
  cognome: string;
  email: string;
  metodoPagamento: string;

  constructor(nome: string, cognome: string, email: string, metodoPagamento: string) {
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.metodoPagamento = metodoPagamento;
  }

  ordinaProdotto(prodotto: IProdotto): void {
    prodotto.assegnaCliente(this);
  }
}

class ProcessoProduzione implements IProcessoProduzione {
  nomeProcesso: string;
  descrizione: string;
  prodottiInProduzione: IProdotto[] = [];

  constructor(nomeProcesso: string, descrizione: string) {
    this.nomeProcesso = nomeProcesso;
    this.descrizione = descrizione;
  }

  aggiungiProdotto(prodotto: IProdotto): void {
    this.prodottiInProduzione.push(prodotto);
    console.log(`Aggiunto ${prodotto.id} al processo ${this.nomeProcesso}`);
  }
}

const costume = new Prodotto('costume da bagno', 'C001', 'M', 'blu', 'disponibile');
const pareo = new Prodotto('pareo', 'P001', 'unica', 'verde acqua', 'disponibile');
const infradito = new Prodotto('infradito', 'M001', 'unica', 'bianco', 'disponibile');

const cliente1 = new Cliente('Gianni', 'Rossi', 'gianni@sunnee.it', 'Carta di credito');
const cliente2 = new Cliente('Giorgio', 'De Luigi', 'giorgio@sunnee.it', 'PayPal');

const processo = new ProcessoProduzione('Riciclo costumi', 'Vecchi costumi riciclati');

processo.aggiungiProdotto(costume);
processo.aggiungiProdotto(pareo);

cliente1.ordinaProdotto(costume);
cliente2.ordinaProdotto(infradito);
// Test errore
cliente2.ordinaProdotto(costume);

console.log(costume);
console.log(infradito);
console.log(processo);

  
  