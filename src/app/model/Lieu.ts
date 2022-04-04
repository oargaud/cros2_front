
export class Lieu{

  id: number;

  name: string;
  pays: string;
  departement: string;
  codepostale: string;
  typederue: string;
  numeroderue: string;
  latitude: string;
  longitude: string;

  public constructor(init?: Partial<Lieu>) {
    Object.assign(this, init);
  }
  
}
