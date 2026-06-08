import { Component } from '@angular/core';
import { Overview } from './overview/overview';
import { OverviewBalance } from './overview-balance/overview-balance';

@Component({
  selector: 'app-student-feature',
  // Deze pagina verzamelt twee kleinere componenten.
  // Zo blijft elk component verantwoordelijk voor een duidelijk stukje van de oefening.
  imports: [Overview, OverviewBalance],
  templateUrl: './student.html',
  styleUrl: './student.css'
})
export class StudentFeature {}
