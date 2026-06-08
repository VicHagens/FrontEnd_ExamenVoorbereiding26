# Front-End Development examenvoorbereiding

Dit project bevat per geimplementeerd onderdeel een korte samenvatting.
De bedoeling is dat je later snel kan terugkijken wat het onderdeel betekent,
waar het in het project gebruikt wordt en welke Angular syntax erbij hoort.

## 1. Databinding

Databinding betekent dat data uit de TypeScript-code verbonden wordt met de HTML-template.
In dit project staat de databinding-oefening in:

- `src/app/features/Databinding/databinding.ts`
- `src/app/features/Databinding/databinding.html`
- `src/app/features/Databinding/databinding.css`

De hoofdapp staat in:

- `src/app/app.ts`
- `src/app/app.html`
- `src/app/app.css`

De hoofdapp toont de navigatie en gebruikt `router-outlet` om de juiste pagina te tonen.

### Wat is er geimplementeerd?

In de databinding-oefening zitten vier vormen:

- one-way binding
- event binding
- two-way binding
- attribute binding volgens de les, met property binding en style binding

### One-way binding

One-way binding stuurt data van TypeScript naar HTML.

Voorbeeld uit het project:

```html
<h1>{{ pageTitle }}</h1>
```

De waarde `pageTitle` staat in `app.ts`.
Angular toont die waarde in de HTML met `{{ ... }}`.
Deze vorm heet ook interpolation.

Kort:

```text
TypeScript -> HTML
```

### Event binding

Event binding reageert op een actie van de gebruiker.

Voorbeeld uit het project:

```html
<button type="button" (click)="increaseClickCount()">Klik teller omhoog</button>
```

Wanneer de gebruiker op de knop klikt, voert Angular de method `increaseClickCount()` uit.
Die method verhoogt de teller in `app.ts`.

Kort:

```text
HTML event -> TypeScript method
```

### Two-way binding

Two-way binding stuurt data in twee richtingen.
De HTML-input en de TypeScript-property blijven samen gelijk.

Voorbeeld uit het project:

```html
<input id="student-name" type="text" [(ngModel)]="studentName" />
```

Als `studentName` verandert in TypeScript, verandert de input mee.
Als de gebruiker typt in de input, verandert `studentName` mee.

Hiervoor is `FormsModule` nodig in `app.ts`.

Kort:

```text
TypeScript <-> HTML input
```

### Attribute binding volgens de les

In onze les wordt attribute binding breder gebruikt.
Daarom gebruiken we hier property binding en style binding als voorbeelden.

Property binding:

```html
<button type="button" [disabled]="isResetDisabled">Reset teller</button>
```

`[disabled]` koppelt de disabled-property van de knop aan `isResetDisabled`.
Als `isResetDisabled` true is, is de knop uitgeschakeld.

Style binding:

```html
<p [style.color]="textColor">Deze tekst krijgt zijn kleur via binding.</p>
```

`[style.color]` koppelt de CSS-kleur aan `textColor` uit `app.ts`.

### Nieuwe Angular syntax

In deze oefening gebruiken we ook de nieuwe Angular syntax:

```html
@if (clickCount > 0) {
  <p>De teller is actief.</p>
} @else {
  <p>De teller staat nog op 0.</p>
}
```

`@if` toont HTML alleen als een voorwaarde klopt.
We gebruiken dus niet de oudere `*ngIf`.

```html
@for (example of bindingExamples; track example) {
  <li>{{ example }}</li>
}
```

`@for` loopt door een lijst.
We gebruiken dus niet de oudere `*ngFor`.

### Belangrijk voor het examen

- `{{ ... }}` toont data uit TypeScript.
- `(click)` voert een method uit na een klik.
- `[(ngModel)]` koppelt een input in twee richtingen.
- `[disabled]` is property binding.
- `[style.color]` is style binding.
- `@if` en `@for` zijn de moderne Angular control flow syntax.

## 2. Singleton, service laag, model en JSON

Dit onderdeel toont hoe Angular met een service laag werkt.
De oefening is schoolgericht en gebruikt studenten als data.

In dit project staat de studenten-feature in:

- `src/app/features/Student/student.ts`
- `src/app/features/Student/overview/overview.ts`
- `src/app/features/Student/overview-balance/overview-balance.ts`

De gedeelde code staat in:

- `src/app/shared/models/student.ts`
- `src/app/shared/services/student-service.ts`

De environment-bestanden staan in:

- `src/Environments/environment.ts`
- `src/Environments/environment.development.ts`

De JSON-data staat in:

- `public/students.json`

### Wat is er geimplementeerd?

- Een `Student` model.
- Een `StudentBalance` model met extra berekende velden.
- Een singleton service met `providedIn: 'root'`.
- Data ophalen uit een JSON-bestand met `HttpClient`.
- Een overview zonder RxJS `.pipe()`.
- Een overview met RxJS `.pipe(tap(), map())`.
- Gebruik van de Angular `async` pipe in de HTML.

### Singleton service

Een singleton betekent dat Angular normaal maar 1 instantie van de service maakt.
Dat gebeurt hier door:

```ts
@Injectable({
  providedIn: 'root'
})
```

Daardoor kan dezelfde service later door meerdere componenten gebruikt worden.
De service staat centraal en de componenten vragen daar hun data aan.

### Model

Een model beschrijft hoe data eruitziet.
In dit project heeft een student deze velden:

```ts
export class Student {
  constructor(
    public id: number,
    public voornaam: string,
    public achternaam: string,
    public studentnummer: string,
    public email: string,
    public behaaldePunten: number
  ) {}
}
```

Het model zorgt ervoor dat TypeScript weet welke properties een student heeft.
Dat maakt de code duidelijker en veiliger.

### Service via JSON

De studenten staan niet rechtstreeks in de component.
Ze staan in `public/students.json`.

De link naar het JSON-bestand staat in `environment.development.ts`:

```ts
export const environment = {
  production: false,
  apiUrl: 'students.json',
  WebAPIBaseUrl: 'https://countriesnow.space/api/v0.1/countries/codes'
};
```

De service gebruikt die environment:

```ts
private apiUrl = `${environment.apiUrl}`;
```

Daarna haalt de service de data op:

```ts
return this.http.get<Student[]>(this.apiUrl).pipe(
  tap((result) => console.log('Opgehaalde data:', result))
);
```

Belangrijk:

- De component kent het JSON-bestand niet rechtstreeks.
- De component vraagt data aan de service.
- De service is verantwoordelijk voor het ophalen van de data.
- De URL staat centraal in de environment, zodat je die later makkelijk kan aanpassen.

### Zonder RxJS pipe

De gewone overview gebruikt:

```ts
this.students$ = this.studentService.getStudents();
```

Deze component toont de studenten zoals ze uit het JSON-bestand komen.
De HTML gebruikt daarna de `async` pipe:

```html
@if (students$ | async; as students) {
  @for (student of students; track student.id) {
    <p>{{ student.voornaam }}</p>
  }
}
```

De `async` pipe subscribet automatisch op een Observable.
Wanneer het component verdwijnt, ruimt Angular die subscription ook automatisch op.
Daardoor moet je niet zelf `subscribe()` en `unsubscribe()` schrijven wanneer je de data alleen in de HTML toont.

### Met RxJS pipe

De balance overview gebruikt een servicemethod met:

```ts
.pipe(
  tap(...),
  map(...)
)
```

`tap()` gebruikt men om iets te doen met de data zonder de data te veranderen.
In dit project logt `tap()` de studenten in de console.

`map()` gebruikt men om data om te vormen.
In dit project maakt `map()` extra waarden:

- resterende punten
- percentage
- status

Kort:

```text
tap() = kijken of nevenactie doen, data blijft hetzelfde
map() = data omvormen naar iets nieuws
```

### Belangrijk voor het examen

- Een service zet data en logica apart van componenten.
- `providedIn: 'root'` maakt een service een singleton.
- Een model beschrijft de vorm van data.
- JSON-data kan met `HttpClient` opgehaald worden.
- `.pipe(tap(), map())` hoort bij RxJS, niet bij een custom Angular `@Pipe`.
- De `async` pipe hoort bij Angular templates en leest waarden uit een Observable.
- `tap()` verandert data niet.
- `map()` verandert data wel naar een nieuwe vorm.
