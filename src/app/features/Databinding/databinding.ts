import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-databinding',
  // FormsModule is nodig voor two-way binding met [(ngModel)].
  imports: [FormsModule],
  templateUrl: './databinding.html',
  styleUrl: './databinding.css'
})
export class Databinding {
  // ONE-WAY BINDING:
  // Deze data staat in TypeScript en wordt getoond in de HTML met {{ }}.
  // De data gaat dus van de class naar de template.
  pageTitle = 'Databinding oefening';
  explanation = 'Hier oefenen we one-way binding, event binding, two-way binding en attribute binding.';

  // PROPERTY BINDING:
  // Volgens de les valt dit onder attribute binding.
  // De waarde bepaalt of de knop in de HTML disabled is.
  isResetDisabled = true;

  // STYLE BINDING:
  // Volgens de les valt dit ook onder attribute binding.
  // Deze waarde wordt gebruikt om de kleur van tekst dynamisch te veranderen.
  textColor = 'seagreen';

  // TWO-WAY BINDING:
  // Deze waarde is gekoppeld aan een inputveld met [(ngModel)].
  // Als je typt in de input, verandert deze property automatisch mee.
  studentName = 'Student';

  // EVENT BINDING:
  // Deze teller wordt aangepast wanneer de gebruiker op een knop klikt.
  clickCount = 0;

  // TEMPLATE REFERENCE VARIABLE:
  // Deze tekst vullen we met de waarde uit een input die we in de HTML aanspreken met #quickName.
  templateReferenceMessage = 'Nog geen waarde opgehaald.';

  // Deze lijst gebruiken we in de HTML met de nieuwe @for syntax.
  // @for is de moderne Angular-manier om over een lijst te loopen.
  bindingExamples = ['One-way binding', 'Event binding', 'Two-way binding', 'Attribute binding'];

  increaseClickCount() {
    // Deze method wordt uitgevoerd door (click) in de HTML.
    // Elke klik verhoogt de teller met 1.
    this.clickCount++;

    // Na minstens 1 klik mag de resetknop gebruikt worden.
    this.isResetDisabled = false;
  }

  resetClickCount() {
    // Deze method zet de teller terug op 0.
    this.clickCount = 0;

    // Omdat er niets meer te resetten is, zetten we de resetknop opnieuw disabled.
    this.isResetDisabled = true;
  }

  changeTextColor() {
    // Simpele wissel tussen twee kleuren om style binding zichtbaar te maken.
    if (this.textColor === 'seagreen') {
      this.textColor = 'crimson';
    } else {
      this.textColor = 'seagreen';
    }
  }

  showTemplateReferenceValue(value: string) {
    // De waarde komt rechtstreeks uit de HTML input via een template reference variable.
    this.templateReferenceMessage = `Waarde uit template reference variable: ${value}`;
  }
}
