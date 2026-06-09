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
- `#quickName` is een template reference variable waarmee je een HTML-element lokaal kan aanspreken.

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

- `src/environments/environment.ts`
- `src/environments/environment.development.ts`

De JSON-data staat in:

- `public/students.json`

### Wat is er geimplementeerd?

- Een `Student` model.
- Een `StudentBalance` model met extra berekende velden.
- Een singleton service met `providedIn: 'root'`.
- Data ophalen uit een JSON-bestand met `HttpClient`.
- Een student ophalen op id met `getStudentById(id)`.
- Error handling met `catchError`.
- Een overview zonder RxJS `.pipe()`.
- Een overview met RxJS `.pipe(tap(), map())`.
- Gebruik van de Angular `async` pipe in de HTML.
- Gebruik van Angular pipes zoals `uppercase` en `percent`.
- Gebruik van `ngOnInit` als lifecycle hook.

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

### Student ophalen op id

In het project staat ook een method om 1 student op te halen:

```ts
getStudentById(id: number): Observable<Student | undefined> {
  return this.http.get<Student[]>(this.apiUrl).pipe(
    tap((students) => console.log('Alle studenten voor getStudentById:', students)),
    map((students) => students.find((student) => student.id === id)),
    tap((student) => console.log('Gevonden student:', student))
  );
}
```

Omdat wij met een lokaal JSON-bestand werken, halen we eerst alle studenten op.
Daarna zoekt `map()` de student met het juiste id.

Bij een echte REST API zou dit vaak eenvoudiger zijn:

```ts
return this.http.get<Student>(`${this.apiUrl}/${id}`);
```

Dan vraagt Angular bijvoorbeeld deze URL op:

```text
https://api.example.com/students/1
```

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

### catchError

`catchError` vangt fouten op bij een Observable.
Dat is belangrijk bij echte API's, want een request kan mislukken.

Voorbeeld:

```ts
return this.http.get<Student[]>(this.apiUrl).pipe(
  tap((students) => console.log(students)),
  catchError((error) => {
    console.log('Fout:', error);
    return of([]);
  })
);
```

Hier geeft `of([])` een lege lijst terug.
Zo blijft de app werken, zelfs wanneer het ophalen van data mislukt.

### ngOnInit

`ngOnInit` is een lifecycle hook.
Angular voert deze method uit wanneer het component wordt opgestart.

Voorbeeld:

```ts
ngOnInit() {
  this.loadStudentById(1);
}
```

Je gebruikt `ngOnInit` vaak om startdata te laden.

### Angular pipes

Angular pipes passen de weergave van data aan in de template.
De originele data verandert niet.

Voorbeelden:

```html
{{ student.achternaam | uppercase }}
{{ calculatePercentage(student.behaaldePunten) | percent }}
```

Kort:

```text
uppercase = tekst in hoofdletters tonen
percent = getal als percentage tonen
async = waarde uit Observable halen
json = object leesbaar tonen
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
- `catchError()` vangt fouten op.
- `ngOnInit()` wordt uitgevoerd wanneer het component start.

### Echte API: GET, POST, PUT, PATCH en DELETE

Een lokaal JSON-bestand en een echte API gebruiken in Angular allebei `HttpClient`.
Voor een simpele GET lijkt de code bijna hetzelfde.

Lokaal JSON-bestand:

```ts
return this.http.get<Student[]>('students.json');
```

Echte API:

```ts
return this.http.get<Student[]>('https://api.example.com/students');
```

Het verschil is dat een echte API op een server staat.
Daardoor kan je meestal meer doen dan alleen lezen.

Voorbeelden:

```ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  apiUrl = environment.apiUrl + '/api/Students';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

getStudents(): Observable<Student[]> {
  return this.http.get<Student[]>(this.apiUrl);
}

getStudentById(id: number): Observable<Student> {
  return this.http.get<Student>(`${this.apiUrl}/${id}`);
}

addStudent(student: Student): Observable<Student> {
  return this.http.post<Student>(this.apiUrl, student);
}

updateStudent(id: number, student: Student): Observable<Student> {
  return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
}

deleteStudent(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`, this.httpOptions);
}
}
```

Kort:

```text
GET = data ophalen
POST = nieuwe data toevoegen
PUT = bestaande data volledig vervangen
PATCH = deel van bestaande data aanpassen
DELETE = data verwijderen
```

Bij een echte API kunnen extra zaken nodig zijn:

- headers;
- login token;
- error handling;
- CORS-instellingen;
- andere datastructuur dan je eigen model.

## 3. Inputparameters, parent to child en child to parent

Dit onderdeel toont hoe componenten met elkaar communiceren.
De oefening staat in:

- `src/app/features/InputOutput/input-output.ts`
- `src/app/features/InputOutput/student-card/student-card.ts`

### Wat is er geimplementeerd?

- Een parent component: `InputOutput`.
- Een child component: `StudentCard`.
- Data doorgeven van parent naar child met `@Input()`.
- Een event terugsturen van child naar parent met `@Output()` en `EventEmitter`.

### Parent to child

Parent to child betekent dat de parent data doorgeeft aan de child.

In de parent HTML:

```html
<app-student-card [student]="student" />
```

In de child TypeScript:

```ts
@Input() student!: Student;
```

Kort:

```text
Parent property -> @Input() in child
```

### Child to parent

Child to parent betekent dat de child iets terugstuurt naar de parent.

In de child TypeScript:

```ts
@Output() studentSelected = new EventEmitter<Student>();

sendStudentToParent() {
  this.studentSelected.emit(this.student);
}
```

In de parent HTML:

```html
<app-student-card
  [student]="student"
  (studentSelected)="selectStudent($event)"
/>
```

`$event` is de waarde die de child heeft meegestuurd.
In dit voorbeeld is dat de geselecteerde student.

Kort:

```text
Child @Output() event -> parent method
```

### Belangrijk voor het examen

- `@Input()` gebruik je om data te ontvangen in een child.
- `@Output()` gebruik je om een event uit een child te sturen.
- `EventEmitter` verstuurt de waarde naar de parent.
- `$event` bevat de waarde die de child heeft meegestuurd.
- De parent beheert meestal de data.
- De child toont data en meldt acties terug aan de parent.

## 4. Routing

Routing betekent dat Angular verschillende URLs koppelt aan verschillende componenten.
Daardoor kan je meerdere pagina's tonen zonder dat de browser de volledige applicatie opnieuw laadt.

In dit project staat de routing in:

- `src/app/app.routes.ts`
- `src/app/app.html`
- `src/app/features/Home/home.ts`

### Wat is er geimplementeerd?

- Een homepagina op route `/`.
- Een toolbar met nav-links naar de oefenonderdelen.
- De titel in de toolbar linkt terug naar de homepagina.
- Routes naar alle oefenonderdelen.
- Een `router-outlet` waar Angular de actieve pagina toont.
- Een wildcard route voor onbekende URLs.

### Routes

In `app.routes.ts` staat welke URL welk component moet tonen.

Voorbeeld:

```ts
{
  path: 'students',
  component: StudentFeature
}
```

Dit betekent:

```text
/students -> toon StudentFeature
```

De startpagina gebruikt een lege path:

```ts
{
  path: '',
  component: Home
}
```

Dit betekent:

```text
/ -> toon Home
```

### routerLink

Met `routerLink` maak je een Angular-link.

Voorbeeld:

```html
<a routerLink="/students">Studenten</a>
```

Belangrijk:

- Angular past de URL aan.
- De pagina wordt niet volledig herladen.
- Het juiste component verschijnt in `router-outlet`.

### Actieve link met class binding

In dit project gebruiken we geen `routerLinkActive`.
We controleren zelf of een route actief is met een method in `app.ts`.

Voorbeeld:

```ts
isActiveRoute(route: string): boolean {
  return this.router.url === route;
}
```

In de HTML gebruiken we gewone class binding:

```html
<a
  [routerLink]="link.route"
  [class.active]="isActiveRoute(link.route)"
>
  {{ link.label }}
</a>
```

Als de method `true` teruggeeft, krijgt de link de class `active`.

### router-outlet

`router-outlet` is de plaats waar Angular het actieve route-component toont.

Voorbeeld:

```html
<router-outlet />
```

Als de URL `/input-output` is, toont Angular daar het `InputOutput` component.

### Route parameters en ActivatedRoute

Route parameters gebruik je wanneer een deel van de URL een waarde is.

Voorbeeld route:

```ts
{
  path: 'students/:id',
  component: StudentDetail
}
```

Voorbeeld URL:

```text
/students/1
```

In het component lees je de `id` met `ActivatedRoute`:

```ts
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  const id = Number(this.route.snapshot.paramMap.get('id'));
}
```

Dit is handig voor detailpagina's.
Bijvoorbeeld: klik op student 1 en toon de detailpagina voor student 1.

### Wildcard route

De wildcard route vangt onbekende URLs op:

```ts
{
  path: '**',
  redirectTo: ''
}
```

Als iemand naar een route gaat die niet bestaat, stuurt Angular de gebruiker terug naar home.

### Belangrijk voor het examen

- Routing koppelt URLs aan componenten.
- `routerLink` navigeert binnen Angular.
- `[class.active]` kan gebruikt worden om de actieve link te markeren.
- `router-outlet` toont het component van de actieve route.
- `path: ''` is de startpagina.
- `path: '**'` is de fallback voor onbekende routes.
- `ActivatedRoute` gebruik je om route parameters zoals `id` uit te lezen.

## Extra: template reference variable

Een template reference variable geeft een HTML-element een lokale naam in de template.

Voorbeeld:

```html
<input #quickName />
<button (click)="showTemplateReferenceValue(quickName.value)">
  Lees waarde
</button>
```

`#quickName` verwijst naar de input.
Met `quickName.value` lees je de huidige waarde uit de input.

Belangrijk:

- Het werkt lokaal in de template.
- Het is handig voor kleine voorbeelden.
- Voor grotere formulieren gebruik je meestal template-driven forms of reactive forms.

## 5. Reactive Form

Reactive forms zijn formulieren waarbij de structuur en validatie vooral in TypeScript staan.
De oefening staat in:

- `src/app/features/ReactiveForm/reactive-form.ts`
- `src/app/features/ReactiveForm/reactive-form.html`

### Wat is er geimplementeerd?

- Een studentformulier met `FormGroup`.
- Formuliervelden met `FormControl`.
- Validatie met `Validators`.
- HTML-koppeling met `[formGroup]` en `formControlName`.
- Dynamische velden met `FormArray`.
- Submit met `(ngSubmit)`.
- Foutmeldingen met `@if`.
- Een disabled submitknop zolang het formulier ongeldig is.
- Een live preview van `studentForm.value`.

### FormGroup

Een `FormGroup` is een groep van formuliervelden.

Voorbeeld:

```ts
studentForm = new FormGroup({
  voornaam: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email])
});
```

Kort:

```text
FormGroup = volledig formulier
FormControl = 1 veld in dat formulier
FormArray = dynamische lijst van velden
```

### FormArray

Een `FormArray` gebruik je wanneer je niet vooraf weet hoeveel velden er nodig zijn.
Bijvoorbeeld: een student kan meerdere vakken volgen.

Voorbeeld:

```ts
courses: new FormArray([
  new FormControl('Front-End Development')
])
```

In de HTML:

```html
<div formArrayName="courses">
  <input [formControlName]="0" />
</div>
```

### Validators

Validators controleren of de input geldig is.

Voorbeelden uit het project:

```ts
Validators.required
Validators.email
Validators.min(0)
Validators.max(180)
Validators.pattern(/^r\d{6}$/)
```

Het studentnummer moet bijvoorbeeld het formaat `r000000` hebben.

### HTML koppeling

De HTML-form wordt gekoppeld aan de FormGroup:

```html
<form [formGroup]="studentForm" (ngSubmit)="saveStudent()">
```

Een input wordt gekoppeld aan een FormControl:

```html
<input formControlName="voornaam" />
```

### Validatie tonen

In het project gebruiken we een helper method:

```ts
isInvalid(controlName: string): boolean {
  const control = this.studentForm.get(controlName);
  return !!control && control.invalid && control.touched;
}
```

Daarna tonen we in de HTML een foutmelding:

```html
@if (isInvalid('voornaam')) {
  <p>Voornaam is verplicht.</p>
}
```

### Submit

Bij submit controleren we eerst of het formulier geldig is.

```ts
if (this.studentForm.invalid) {
  this.studentForm.markAllAsTouched();
  return;
}
```

Als het formulier geldig is, maken we een nieuw `Student` object met de formulierwaarden.

### Belangrijk voor het examen

- Reactive forms worden opgebouwd in TypeScript.
- `ReactiveFormsModule` is nodig om reactive forms te gebruiken.
- `[formGroup]` koppelt een HTML-form aan een FormGroup.
- `formControlName` koppelt een input aan een FormControl.
- `formArrayName` koppelt een stuk HTML aan een FormArray.
- `Validators` controleren de input.
- `form.valid` zegt of het formulier geldig is.
- `form.value` bevat de ingevulde waarden.
- `(ngSubmit)` voert een method uit bij submit.

## 6. Samenvatting in de site

De README bestaat ook als visuele pagina in de applicatie.
De oefening staat in:

- `src/app/features/Summary/summary.ts`
- `src/app/features/Summary/summary.html`

Deze pagina toont per onderdeel een Bootstrap-card met de belangrijkste examenpunten.
Zo kan je de samenvatting bekijken zonder de README apart te openen.

## 7. Drag & Drop

Drag & Drop is toegevoegd als aparte feature:

- `src/app/features/DragDrop/drag-drop.ts`
- `src/app/features/DragDrop/drag-drop.html`
- `src/app/features/DragDrop/drag-drop.css`

Deze oefening gebruikt Angular CDK.

Installatie:

```bash
npm install @angular/cdk@^21.1.0
```

Belangrijke syntax:

```html
<div class="pitch-boundary">
  <div
    class="player"
    cdkDragBoundary=".pitch-boundary"
    cdkDrag
    (cdkDragEnded)="onDragEnded($event)"
  >
    ST
  </div>
</div>
```

Kort:

- `cdkDrag` maakt een element sleepbaar.
- `cdkDragBoundary` beperkt het slepen tot een container.
- `(cdkDragEnded)` voert een method uit wanneer het slepen stopt.
- `DragDropModule` moet geimporteerd zijn in het component.

De feature bevat ook een selectveld met posities:

```html
<select formControlName="positionId">
  <option value="">- Select -</option>
  @if (positions$ | async; as positions) {
    @for (position of positions; track position.id) {
      <option [value]="position.id">
        {{ position.name }}
      </option>
    }
  }
</select>
```

## 8. Angular CLI commandos

Handige commandos voor Angular-projecten.

### Project starten

```bash
ng new student-exam-prep
npm install
npm install bootstrap
npm install @angular/cdk@^21.1.0
ng serve -o
npm run build
```

Kort:

- `ng new` maakt een nieuw Angular-project.
- `npm install` installeert dependencies uit `package.json`.
- `npm install bootstrap` voegt Bootstrap toe.
- `npm install @angular/cdk@^21.1.0` voegt Angular CDK toe voor drag and drop.
- `ng serve -o` start de app en opent de browser.
- `npm run build` controleert of het project correct buildt.

### Environments

```bash
ng generate environments
```

Dit maakt environment-bestanden.
Daarin zet je bijvoorbeeld een `apiUrl`, zodat je service niet overal hardcoded URLs gebruikt.

### Service en model

```bash
ng g s shared/services/student
ng g class shared/models/Student
```

Kort:

- `ng g s` maakt een service.
- `ng g class` maakt een class, bijvoorbeeld een model.
- `shared/services` is een logische plaats voor gedeelde services.
- `shared/models` is een logische plaats voor models.

### Feature componenten

```bash
ng g c features/Student/Overview
ng g c features/Student/OverviewBalance
ng g c features/Student/StudentDetail
ng g c features/Databinding
ng g c features/InputOutput
ng g c features/ReactiveForm
ng g c features/DragDrop
ng g c features/Summary
```

Kort:

- `ng g c` maakt een component.
- `features/...` gebruik je voor onderdelen/pagina's van je applicatie.
- Voor schoolgerichte oefeningen kan je alles rond `Student` groeperen in `features/Student`.

## 9. Belangrijke imports

Forms:

```ts
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
```

HTTP en services:

```ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map, catchError, of } from 'rxjs';
```

Routing:

```ts
import { Routes } from '@angular/router';
import { RouterLink, RouterOutlet, ActivatedRoute, Router } from '@angular/router';
```

Pipes en CDK:

```ts
import { AsyncPipe, JsonPipe, UpperCasePipe, PercentPipe } from '@angular/common';
import { DragDropModule, CdkDragEnd } from '@angular/cdk/drag-drop';
```
