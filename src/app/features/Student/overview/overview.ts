import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Student } from '../../../shared/models/student';
import { StudentService } from '../../../shared/services/student-service';
import { FilterTextbox } from '../filter-textbox/filter-textbox';

@Component({
  selector: 'app-overview',
  imports: [AsyncPipe, UpperCasePipe, RouterLink, FilterTextbox],
  templateUrl: './overview.html',
  styleUrl: './overview.css'
})
export class Overview {
  private students$: Observable<Student[]>;
  filteredStudents$: Observable<Student[]>;

  constructor(private studentService: StudentService) {
    // Deze component gebruikt de gewone servicemethod.
    // De service haalt studenten uit JSON.
    // students$ blijft altijd de originele lijst.
    this.students$ = this.studentService.getStudents();
    this.filteredStudents$ = this.students$;
  }

  filtering(searchText: string) {
    // Als het filterveld leeg is, tonen we opnieuw alle studenten.
    if (!searchText) {
      this.filteredStudents$ = this.students$;
      return;
    }

    const search = searchText.toLowerCase();

    // map() werkt op de Observable.
    // filter() werkt op de array met studenten die uit de Observable komt.
    this.filteredStudents$ = this.students$.pipe(
      map((students) =>
        students.filter((student) => {
          return (
            student.voornaam.toLowerCase().indexOf(search) > -1 ||
            student.achternaam.toLowerCase().indexOf(search) > -1 ||
            student.studentnummer.toLowerCase().indexOf(search) > -1 ||
            student.email.toLowerCase().indexOf(search) > -1 ||
            student.behaaldePunten.toString().indexOf(searchText) > -1
          );
        })
      )
    );
  }
}
