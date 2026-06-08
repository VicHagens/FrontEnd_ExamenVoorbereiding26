// Een model beschrijft hoe data eruitziet.
// In deze cursus gebruiken we hiervoor classes.
export class Student {
  constructor(
    public id: number,
    public voornaam: string,
    public achternaam: string,
    public studentnummer: string,
    public email: string,
    public behaaldePunten: number
  ) {}
}

// Dit model bevat de waarden die we nodig hebben voor de balance overview.
// We gebruiken bewust geen extends, zodat het simpel en duidelijk blijft.
export class StudentBalance {
  constructor(
    public id: number,
    public voornaam: string,
    public achternaam: string,
    public studentnummer: string,
    public email: string,
    public behaaldePunten: number,
    public resterendePunten: number,
    public percentage: number,
    public status: string
  ) {}
}
