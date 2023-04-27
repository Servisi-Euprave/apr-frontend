import { Person } from './person';

export interface Company {
  password?: string;
  vlasnik: Person;
  pib?: number;
  naziv: string;
  adresaSedista: string;
  mesto: string;
  postanskiBroj: string;
  delatnost: Delatnost;
  sediste: NSTJ;
  likvidirana?: boolean;
}

export enum Delatnost {
  Ekonomija = 'EKONOMSKI_I_FINANSIJSKI_ODNOSI',
  Odbrana = 'ODBRANA',
  Edukacija = 'EDUKACIJA',
  OpsteUsluge = 'OPSTE_JAVNE_USLUGE',
  Zdravstvo = 'ZDRAVSTVO',
}

export interface NSTJ {
  oznaka: string;
  naziv?: string;
}
