import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentBalance } from '../../../shared/models/student';
import { StudentService } from '../../../shared/services/student-service';

@Component({
  selector: 'app-overview-balance',
  imports: [AsyncPipe],
  templateUrl: './overview-balance.html',
  styleUrl: './overview-balance.css'
})
export class OverviewBalance {
  studentsWithBalance$: Observable<StudentBalance[]>;

  constructor(private studentService: StudentService) {
    // Deze component gebruikt de servicemethod met RxJS .pipe(tap(), map()).
    // Ook hier gebruiken we async in de HTML om automatisch te subscriben.
    this.studentsWithBalance$ = this.studentService.getStudentsWithBalance();
  }
}
