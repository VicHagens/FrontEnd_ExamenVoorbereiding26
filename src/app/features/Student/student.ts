import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../shared/models/student';
import { StudentService } from '../../shared/services/student-service';
import { Overview } from './overview/overview';
import { OverviewBalance } from './overview-balance/overview-balance';

@Component({
  selector: 'app-student-feature',
  // Deze pagina verzamelt twee kleinere componenten.
  // Zo blijft elk component verantwoordelijk voor een duidelijk stukje van de oefening.
  imports: [Overview, OverviewBalance, AsyncPipe],
  templateUrl: './student.html',
  styleUrl: './student.css'
})
export class StudentFeature {
  // Deze ids gebruiken we om getStudentById() te demonstreren.
  studentIds = [1, 2, 3, 4];

  selectedStudent$?: Observable<Student | undefined>;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    // ngOnInit wordt uitgevoerd wanneer Angular deze component klaarzet.
    // Dit is een klassieke plaats om startdata te laden.
    this.loadStudentById(1);
  }

  loadStudentById(id: number) {
    // Hier roept de component de service laag aan.
    // De service beslist hoe de student wordt opgehaald.
    this.selectedStudent$ = this.studentService.getStudentById(id);
  }
}
