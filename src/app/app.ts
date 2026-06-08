import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  // RouterOutlet toont de pagina die bij de huidige route hoort.
  // RouterLink gebruiken we om te navigeren zonder de volledige pagina te herladen.
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  appTitle = 'Front-End examenvoorbereiding';

  // Deze lijst bepaalt welke onderdelen in de navigatie staan.
  // Als we later Singleton implementeren, kunnen we hier een extra item toevoegen.
  topics = [
    {
      label: 'Databinding',
      route: '/databinding',
      description: 'One-way, event, two-way en attribute binding'
    },
    {
      label: 'Studenten',
      route: '/students',
      description: 'Singleton service, model, JSON en RxJS pipe'
    }
  ];
}
