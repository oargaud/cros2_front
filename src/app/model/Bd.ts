import { Saga } from './saga';
import { Artiste } from './artiste';
import { Edition } from './Edition';
import { Photo, Pret } from '.';
import { Lieu } from './Lieu';

export class Bd{

  id: number;
  titre: string = "";
  tome: string = "";
  statut: string;
  saga: Saga;
  edition: Edition;
  photo: Photo;
  illustrateurs: Artiste[] = [];
  scenaristes: Artiste[] = [];
  pret: Pret;
  stockage: Lieu;

  public constructor(init?: Partial<Bd>) {
    Object.assign(this, init);
  }

}

