import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  // RouterOutlet toont de pagina die bij de huidige route hoort.
  // RouterLink gebruiken we om te navigeren zonder de volledige pagina te herladen.
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  appTitle = 'Front-End examenvoorbereiding';

  constructor(private router: Router) {}

  isActiveRoute(route: string): boolean {
    // Deze method controleert of de huidige URL gelijk is aan de route van de link.
    // In de HTML gebruiken we dit met [class.active].
    return this.router.url === route;
  }
}
