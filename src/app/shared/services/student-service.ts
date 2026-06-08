import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Student, StudentBalance } from '../models/student';

@Injectable({
  // providedIn: 'root' maakt deze service een singleton.
  // Angular maakt dus normaal maar 1 instantie van deze service voor de volledige app.
  providedIn: 'root'
})
export class StudentService {
  // De URL naar onze data staat in de environment.
  // Zo staat de link naar JSON of API niet hardcoded verspreid door de service.
  private apiUrl = `${environment.apiUrl}`;

  // We bewaren het maximum hier op een centrale plaats.
  // Als het maximum ooit verandert, moeten we het maar op 1 plek aanpassen.
  private maxPunten = 180;

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    // Deze method haalt de studenten gewoon uit het JSON-bestand.
    // tap() toont wat er opgehaald is, maar past de data niet aan.
    return this.http.get<Student[]>(this.apiUrl).pipe(
      tap((result) => console.log('Opgehaalde data:', result))
    );
  }

  getStudentById(id: number): Observable<Student | undefined> {
    // Bij een echte REST API zou dit vaak zo zijn:
    // return this.http.get<Student>(`${this.apiUrl}/${id}`);
    //
    // Omdat wij hier met een lokaal JSON-bestand werken, halen we eerst alle studenten op.
    // Daarna zoeken we met map() de student met het juiste id.
    return this.http.get<Student[]>(this.apiUrl).pipe(
      tap((students) => console.log('Alle studenten voor getStudentById:', students)),
      map((students) => students.find((student) => student.id === id)),
      tap((student) => console.log('Gevonden student:', student))
    );
  }

  getStudentsWithBalance(): Observable<StudentBalance[]> {
    return this.http.get<Student[]>(this.apiUrl).pipe(
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
