import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../../../shared/models/student';
import { StudentService } from '../../../shared/services/student-service';

@Component({
  selector: 'app-overview',
  imports: [AsyncPipe, UpperCasePipe, RouterLink],
  templateUrl: './overview.html',
  styleUrl: './overview.css'
})
export class Overview {
  students$: Observable<Student[]>;

  constructor(private studentService: StudentService) {
    // Deze component gebruikt de gewone servicemethod.
    // De service haalt studenten uit JSON.
    // We bewaren de Observable in students$ en laten de async pipe in de HTML subscriben.
    this.students$ = this.studentService.getStudents();
  }
}
