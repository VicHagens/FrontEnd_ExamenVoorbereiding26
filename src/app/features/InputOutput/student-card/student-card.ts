import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../../shared/models/student';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.html',
  styleUrl: './student-card.css'
})
export class StudentCard {
  // @Input ontvangt data van de parent.
  // In dit voorbeeld krijgt elke child card 1 student binnen.
  @Input() student!: Student;

  // @Output stuurt een event van de child terug naar de parent.
  // De parent kan naar dit event luisteren met (studentSelected).
  @Output() studentSelected = new EventEmitter<Student>();

  sendStudentToParent() {
    // emit() verstuurt de student naar de parent.
    // In de parent HTML komt deze waarde binnen als $event.
    this.studentSelected.emit(this.student);
  }
}
