import { AsyncPipe, PercentPipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../../../shared/models/student';
import { StudentService } from '../../../shared/services/student-service';

@Component({
  selector: 'app-student-detail',
  imports: [AsyncPipe, RouterLink, PercentPipe, UpperCasePipe],
  templateUrl: './student-detail.html',
  styleUrl: './student-detail.css'
})
export class StudentDetail implements OnInit {
  student$?: Observable<Student | undefined>;
  studentId = 0;
  maxPunten = 180;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    // ActivatedRoute geeft informatie over de huidige route.
    // In app.routes.ts staat de route als 'students/:id'.
    // Daarom kunnen we hier de parameter id uitlezen.
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.student$ = this.studentService.getStudentById(this.studentId);
  }

  calculatePercentage(behaaldePunten: number): number {
    return behaaldePunten / this.maxPunten;
  }
}
