import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../shared/models/student';

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.css'
})
export class ReactiveForm {
  // Bij reactive forms maken we de structuur van het formulier in TypeScript.
  // Een FormGroup is een groep van FormControls.
  studentForm = new FormGroup({
    // Elke FormControl stelt 1 veld in het formulier voor.
    // Validators bepalen welke regels dat veld moet volgen.
    voornaam: new FormControl('', [Validators.required, Validators.minLength(2)]),
    achternaam: new FormControl('', [Validators.required, Validators.minLength(2)]),
    studentnummer: new FormControl('', [
      Validators.required,
      // r gevolgd door 6 cijfers, bijvoorbeeld r000001.
      Validators.pattern(/^r\d{6}$/)
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    // Dit veld zit niet in het Student model.
    // Het is enkel toegevoegd om een select met option en @for te tonen.
    country: new FormControl(1),
    behaaldePunten: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(180)
    ]),
    // FormArray:
    // Hiermee kan je een dynamische lijst van velden bijhouden.
    // Hier gebruiken we het om meerdere vakken/cursussen toe te voegen.
    courses: new FormArray([
      new FormControl('Front-End Development', Validators.required)
    ])
  });

  savedStudent?: Student;
  private nextId = 10;

  countryList = [
    { id: 1, name: 'Belgie' },
    { id: 2, name: 'Nederland' },
    { id: 3, name: 'Frankrijk' }
  ];

  get courses(): FormArray<FormControl<string | null>> {
    // Deze getter maakt de HTML leesbaarder.
    // In plaats van telkens studentForm.get('courses') te schrijven, gebruiken we courses.
    return this.studentForm.get('courses') as FormArray<FormControl<string | null>>;
  }

  addCourse() {
    // push() voegt een nieuwe FormControl toe aan de FormArray.
    this.courses.push(new FormControl('', Validators.required));
  }

  removeCourse(index: number) {
    // removeAt() verwijdert een FormControl op basis van de index.
    this.courses.removeAt(index);
  }

  isInvalid(controlName: string): boolean {
    const control = this.studentForm.get(controlName);

    // invalid betekent dat het veld niet voldoet aan de validators.
    // touched betekent dat de gebruiker het veld al heeft aangeraakt.
    // Zo tonen we foutmeldingen pas nadat de gebruiker met het veld bezig was.
    return !!control && control.invalid && control.touched;
  }

  saveStudent() {
    // Als het formulier ongeldig is, markeren we alle velden als touched.
    // Daardoor worden de foutmeldingen zichtbaar.
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const formValue = this.studentForm.value;

    // We maken een Student object met de waarden uit het formulier.
    // De fallback waarden zijn vooral voor TypeScript, want de validators controleren de input al.
    this.savedStudent = new Student(
      this.nextId,
      formValue.voornaam ?? '',
      formValue.achternaam ?? '',
      formValue.studentnummer ?? '',
      formValue.email ?? '',
      formValue.behaaldePunten ?? 0
    );

    this.nextId++;
    this.studentForm.reset({
      voornaam: '',
      achternaam: '',
      studentnummer: '',
      email: '',
      country: 1,
      behaaldePunten: 0,
      courses: ['Front-End Development']
    });
  }
}
