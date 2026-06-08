import { Routes } from '@angular/router';
import { Databinding } from './features/Databinding/databinding';
import { StudentFeature } from './features/Student/student';

export const routes: Routes = [
  // Wanneer de gebruiker naar de startpagina gaat, sturen we hem door naar databinding.
  {
    path: '',
    redirectTo: 'databinding',
    pathMatch: 'full'
  },
  // Elke les/oefening krijgt hier later zijn eigen route.
  {
    path: 'databinding',
    component: Databinding
  },
  {
    path: 'students',
    component: StudentFeature
  }
];
