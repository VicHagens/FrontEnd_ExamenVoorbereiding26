import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Student, StudentBalance } from '../models/student';

@Injectable({
  // providedIn: 'root' maakt deze service een singleton.
  // Angular maakt dus normaal maar 1 instantie van deze service voor de volledige app.
  providedIn: 'root'
})
export class StudentService {
  // We bewaren het maximum hier op een centrale plaats.
  // Als het maximum ooit verandert, moeten we het maar op 1 plek aanpassen.
  private maxPunten = 180;

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    // Deze method haalt de studenten gewoon uit het JSON-bestand.
    // Hier gebruiken we bewust nog geen RxJS .pipe(), zodat de gewone JSON-service duidelijk blijft.
    return this.http.get<Student[]>('/students.json');
  }

  getStudentsWithBalance(): Observable<StudentBalance[]> {
    return this.http.get<Student[]>('/students.json').pipe(
      // tap() wordt vaak gebruikt om even te kijken wat er door de stream komt.
      // Het verandert de data niet.
      tap((students) => console.log('Studenten uit JSON:', students)),

      // map() verandert de data wel.
      // Hier maken we van elke Student een StudentBalance met extra berekende velden.
      map((students) =>
        students.map((student) => {
          const resterendePunten = this.maxPunten - student.behaaldePunten;
          const percentage = Math.round((student.behaaldePunten / this.maxPunten) * 100);
          const status = this.getStatus(student.behaaldePunten);

          return new StudentBalance(
            student.id,
            student.voornaam,
            student.achternaam,
            student.studentnummer,
            student.email,
            student.behaaldePunten,
            resterendePunten,
            percentage,
            status
          );
        })
      ),

      // Deze tap() toont de aangepaste data na de map().
      // Zo zie je duidelijk het verschil tussen tap() en map().
      tap((studentsWithBalance) => console.log('Studenten met berekende balans:', studentsWithBalance))
    );
  }

  private getStatus(behaaldePunten: number): string {
    if (behaaldePunten >= 135) {
      return 'Goed op weg';
    }

    if (behaaldePunten >= 90) {
      return 'Nog haalbaar';
    }

    return 'Extra oefenen';
  }
}
