import { Routes } from '@angular/router';
import { Databinding } from './features/Databinding/databinding';
import { Home } from './features/Home/home';
import { InputOutput } from './features/InputOutput/input-output';
import { StudentFeature } from './features/Student/student';

export const routes: Routes = [
  // De lege path '' is de startpagina van de applicatie.
  // Daardoor ziet de gebruiker eerst een homepagina in plaats van meteen een oefening.
  {
    path: '',
    component: Home
  },
  // Elke les/oefening krijgt hier later zijn eigen route.
  {
    path: 'databinding',
    component: Databinding
  },
  {
    path: 'students',
    component: StudentFeature
  },
  {
    path: 'input-output',
    component: InputOutput
  },
  // Wildcard route:
  // Als een gebruiker naar een onbekende URL gaat, sturen we hem terug naar home.
  {
    path: '**',
    redirectTo: ''
  }
];
