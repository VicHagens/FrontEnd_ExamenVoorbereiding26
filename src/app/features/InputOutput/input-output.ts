import { Component } from '@angular/core';
import { Student } from '../../shared/models/student';
import { StudentCard } from './student-card/student-card';

@Component({
  selector: 'app-input-output',
  imports: [StudentCard],
  templateUrl: './input-output.html',
  styleUrl: './input-output.css'
})
export class InputOutput {
  // Dit is de parent component.
  // De parent beheert de lijst met studenten en geeft telkens 1 student door aan de child.
  students = [
    new Student(1, 'Lina', 'Peeters', 'r000001', 'lina.peeters@student.school.be', 142),
    new Student(2, 'Noah', 'Janssens', 'r000002', 'noah.janssens@student.school.be', 96),
    new Student(3, 'Emma', 'Maes', 'r000003', 'emma.maes@student.school.be', 171)
  ];

  selectedStudent?: Student;

  selectStudent(student: Student) {
    // Deze method wordt uitgevoerd wanneer de child een event uitstuurt.
    // De waarde uit de child komt binnen via $event in de HTML.
    this.selectedStudent = student;
  }
}
