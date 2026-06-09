import { Routes } from '@angular/router';
import { Databinding } from './features/Databinding/databinding';
import { Home } from './features/Home/home';
import { InputOutput } from './features/InputOutput/input-output';
import { ReactiveForm } from './features/ReactiveForm/reactive-form';
import { StudentDetail } from './features/Student/student-detail/student-detail';
import { StudentFeature } from './features/Student/student';
import { Summary } from './features/Summary/summary';

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
    path: 'students/:id',
    component: StudentDetail
  },
  {
    path: 'input-output',
    component: InputOutput
  },
  {
    path: 'reactive-form',
    component: ReactiveForm
  },
  {
    path: 'summary',
    component: Summary
  },
  // Wildcard route:
  // Als een gebruiker naar een onbekende URL gaat, sturen we hem terug naar home.
  {
    path: '**',
    redirectTo: ''
  }
];
