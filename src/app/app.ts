import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  // RouterOutlet toont de pagina die bij de huidige route hoort.
  // RouterLink gebruiken we om te navigeren zonder de volledige pagina te herladen.
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  appTitle = 'Front-End examenvoorbereiding';

  // Deze lijst bepaalt welke links in de toolbar staan.
  // routerLink gebruikt de route om naar het juiste component te navigeren.
  navLinks = [
    {
      label: 'Databinding',
      route: '/databinding',
    },
    {
      label: 'Studenten',
      route: '/students',
    },
    {
      label: 'Input & Output',
      route: '/input-output',
    },
    {
      label: 'Reactive Form',
      route: '/reactive-form',
    }
  ];

  constructor(private router: Router) {}

  isActiveRoute(route: string): boolean {
    // Deze method controleert of de huidige URL gelijk is aan de route van de link.
    // In de HTML gebruiken we dit met [class.active].
    return this.router.url === route;
  }
}
