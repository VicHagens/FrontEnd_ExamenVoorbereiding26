import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  // Deze lijst wordt gebruikt om op de homepagina kaarten te tonen.
  // Elke kaart linkt naar een route in app.routes.ts.
  lessons = [
    {
      title: 'Databinding',
      route: '/databinding',
      description: 'One-way binding, event binding, two-way binding en attribute binding.'
    },
    {
      title: 'Studenten service laag',
      route: '/students',
      description: 'Singleton service, model, JSON, environment, RxJS pipe en async pipe.'
    },
    {
      title: 'Input & Output',
      route: '/input-output',
      description: 'Inputparameters, parent to child en child to parent.'
    },
    {
      title: 'Reactive Form',
      route: '/reactive-form',
      description: 'FormGroup, FormControl, Validators, validatie en submit.'
    },
    {
      title: 'Samenvatting',
      route: '/summary',
      description: 'Een mooiere site-versie van de README met alle onderdelen kort op een rij.'
    }
  ];
}
