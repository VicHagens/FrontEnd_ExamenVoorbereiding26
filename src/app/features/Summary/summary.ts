import { Component } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.html',
  styleUrl: './summary.css'
})
export class Summary {
  // Deze pagina is de visuele versie van de README.
  // We bewaren de info in arrays, zodat de HTML overzichtelijk kan loopen met @for.
  sections = [
    {
      title: 'Databinding',
      description: 'Databinding verbindt data uit TypeScript met de HTML-template.',
      points: [
        '{{ ... }} toont data uit TypeScript.',
        '(click) voert een method uit na een gebruikersactie.',
        '[(ngModel)] koppelt een input in twee richtingen.',
        '[disabled] en [style.color] tonen property/style binding volgens de les.'
      ]
    },
    {
      title: 'Singleton, service laag en JSON',
      description: 'Een service zet data en logica apart van componenten.',
      points: [
        'providedIn: root maakt de service een singleton.',
        'Een model class beschrijft hoe studentdata eruitziet.',
        'HttpClient haalt data op uit students.json.',
        'tap() kijkt naar data, map() vormt data om.',
        'De async pipe leest waarden uit een Observable in de template.'
      ]
    },
    {
      title: 'Input & Output',
      description: 'Componenten kunnen data doorgeven en events terugsturen.',
      points: [
        '@Input() ontvangt data van de parent.',
        '@Output() stuurt een event van child naar parent.',
        'EventEmitter verstuurt de waarde.',
        '$event bevat de waarde die de child meestuurt.'
      ]
    },
    {
      title: 'Routing',
      description: 'Routing koppelt URLs aan componenten.',
      points: [
        'routerLink navigeert binnen Angular zonder volledige refresh.',
        'router-outlet toont het component van de actieve route.',
        "path: '' is de homepagina.",
        "path: '**' vangt onbekende routes op."
      ]
    },
    {
      title: 'Reactive Form',
      description: 'Reactive forms worden vooral opgebouwd in TypeScript.',
      points: [
        'FormGroup is het volledige formulier.',
        'FormControl is een veld in het formulier.',
        'Validators controleren de input.',
        '[formGroup] koppelt de HTML-form aan TypeScript.',
        'formControlName koppelt een input aan een FormControl.'
      ]
    }
  ];
}
