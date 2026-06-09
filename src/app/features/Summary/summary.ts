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
      details: [
        'Met databinding kan Angular waarden uit je component tonen of gebruiken in de HTML.',
        'Je gebruikt het ook om te reageren op acties van de gebruiker, zoals klikken of typen.',
        'In onze les valt property binding en style binding mee onder attribute binding.',
        'Een template reference variable geeft een HTML-element een lokale naam in de template.'
      ],
      syntax: [
        '{{ pageTitle }}',
        '(click)="increaseClickCount()"',
        '[(ngModel)]="studentName"',
        '[disabled]="isResetDisabled"',
        '[style.color]="textColor"',
        '#quickName',
        'quickName.value'
      ],
      points: [
        '{{ ... }} toont data uit TypeScript.',
        '(click) voert een method uit na een gebruikersactie.',
        '[(ngModel)] koppelt een input in twee richtingen.',
        '[disabled] en [style.color] tonen property/style binding volgens de les.',
        '#quickName laat je een input rechtstreeks aanspreken in dezelfde template.'
      ],
      examTips: [
        'Ken het verschil tussen data tonen en reageren op events.',
        'Vergeet niet dat [(ngModel)] FormsModule nodig heeft.',
        'Template reference variables zijn handig voor kleine lokale acties zonder extra property.'
      ],
      codeExampleTitle: 'Klein databinding voorbeeld',
      codeExample: `export class Databinding {
  studentName = 'Lina';
  clickCount = 0;
  isResetDisabled = true;

  increaseClickCount() {
    this.clickCount++;
    this.isResetDisabled = false;
  }
}

<!-- HTML -->
<p>Welkom, {{ studentName }}</p>
<input [(ngModel)]="studentName" />
<input #quickName />
<button (click)="showTemplateReferenceValue(quickName.value)">Lees</button>
<button (click)="increaseClickCount()">Klik</button>
<button [disabled]="isResetDisabled">Reset</button>`
    },
    {
      title: 'Singleton, service laag en JSON',
      description: 'Een service zet data en logica apart van componenten.',
      details: [
        'Een component moet vooral data tonen en gebruikersacties opvangen.',
        'Een service wordt gebruikt om data op te halen, te bewaren of te verwerken.',
        'Met providedIn: root maakt Angular normaal 1 gedeelde instantie van de service.',
        'ngOnInit is een lifecycle hook die uitgevoerd wordt wanneer het component start.'
      ],
      syntax: [
        '@Injectable({ providedIn: \'root\' })',
        'ngOnInit()',
        'constructor(private http: HttpClient) {}',
        'this.http.get<Student[]>(this.apiUrl)',
        '.pipe(tap(...), map(...))',
        'students$ | async',
        'catchError((error) => of([]))',
        'uppercase',
        'percent'
      ],
      points: [
        'providedIn: root maakt de service een singleton.',
        'Een model class beschrijft hoe studentdata eruitziet.',
        'HttpClient haalt data op uit students.json.',
        'getStudentById(id) toont hoe je 1 item kan ophalen.',
        'tap() kijkt naar data, map() vormt data om.',
        'De async pipe leest waarden uit een Observable in de template.',
        'catchError vangt fouten van een HTTP-request op.',
        'Angular pipes zoals uppercase en percent passen alleen de weergave aan.'
      ],
      examTips: [
        'Service laag betekent: component vraagt data aan de service, niet rechtstreeks aan JSON.',
        'tap() verandert data niet, map() verandert data wel.',
        'async pipe subscribet automatisch op een Observable.',
        'Gebruik ngOnInit vaak om startdata te laden.',
        'Gebruik catchError om je app niet te laten crashen bij API-fouten.'
      ],
      codeExampleTitle: 'Klein service voorbeeld',
      codeExample: `@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl).pipe(
      tap((students) => console.log('Studenten:', students)),
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }
}

// Component
students$ = this.studentService.getStudents();

<!-- HTML -->
@if (students$ | async; as students) {
  @for (student of students; track student.id) {
    <p>{{ student.voornaam }} {{ student.achternaam | uppercase }}</p>
  }
}`
    },
    {
      title: 'Echte API gebruiken',
      description: 'Een echte API gebruikt dezelfde HttpClient-basis, maar meestal met meer endpoints.',
      details: [
        'Voor Angular lijkt een lokaal JSON-bestand ophalen sterk op data ophalen uit een echte API.',
        'Het grootste verschil is dat een echte API op een server staat en vaak data kan toevoegen, aanpassen of verwijderen.',
        'Bij een echte API kunnen beveiliging en fouten belangrijker worden.'
      ],
      syntax: [
        'import { HttpClient, HttpHeaders } from \'@angular/common/http\';',
        'httpOptions = { headers: new HttpHeaders({ \'Content-Type\': \'application/json\' }) }',
        'this.http.get<Student[]>(this.apiUrl)',
        'this.http.get<Student>(`${this.apiUrl}/${id}`)',
        'this.http.post<Student>(this.apiUrl, student)',
        'this.http.put<Student>(`${this.apiUrl}/${id}`, student)',
        'this.http.delete<void>(`${this.apiUrl}/${id}`)'
      ],
      points: [
        'GET haalt data op, bijvoorbeeld alle studenten of 1 student per id.',
        'POST maakt nieuwe data aan op de server.',
        'PUT past een volledig bestaand object aan.',
        'PATCH past een deel van een bestaand object aan.',
        'DELETE verwijdert data op de server.',
        'Bij een echte API heb je soms headers, tokens, CORS en error handling nodig.'
      ],
      examTips: [
        'Headers zijn extra informatie bij je request.',
        'Een token is een toegangsbewijs voor een beveiligde API.',
        'CORS bepaalt of je frontend met een API op een andere origin mag praten.',
        'Error handling zorgt ervoor dat je app netjes reageert op fouten.'
      ],
      codeExampleTitle: 'Voorbeeld service met echte studenten-API',
      codeExample: `import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(\`\${this.apiUrl}/\${id}\`);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student, this.httpOptions);
  }

  updateStudent(student: Student): Observable<void> {
    return this.http.put<void>(\`\${this.apiUrl}/\${student.id}\`, student, this.httpOptions);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(\`\${this.apiUrl}/\${id}\`, this.httpOptions);
  }
}`
    },
    {
      title: 'Input & Output',
      description: 'Componenten kunnen data doorgeven en events terugsturen.',
      details: [
        'Parent to child betekent dat de parent data doorgeeft aan de child.',
        'Child to parent betekent dat de child een event terugstuurt naar de parent.',
        'Dit is handig wanneer je een groter scherm opsplitst in kleinere componenten.'
      ],
      syntax: [
        '<app-student-card [student]="student" />',
        '@Input() student!: Student;',
        '@Output() studentSelected = new EventEmitter<Student>();',
        'this.studentSelected.emit(this.student)',
        '(studentSelected)="selectStudent($event)"'
      ],
      points: [
        '@Input() ontvangt data van de parent.',
        '@Output() stuurt een event van child naar parent.',
        'EventEmitter verstuurt de waarde.',
        '$event bevat de waarde die de child meestuurt.'
      ],
      examTips: [
        '@Input is voor binnenkomende data in de child.',
        '@Output is voor uitgaande events vanuit de child.',
        'De parent blijft meestal eigenaar van de echte data.'
      ],
      codeExampleTitle: 'Parent en child voorbeeld',
      codeExample: `// Parent HTML
<app-student-card
  [student]="student"
  (studentSelected)="selectStudent($event)"
/>

// Parent TypeScript
selectStudent(student: Student) {
  this.selectedStudent = student;
}

// Child TypeScript
@Input() student!: Student;
@Output() studentSelected = new EventEmitter<Student>();

sendStudentToParent() {
  this.studentSelected.emit(this.student);
}`
    },
    {
      title: 'Routing',
      description: 'Routing koppelt URLs aan componenten.',
      details: [
        'Routing zorgt ervoor dat je meerdere paginas kan tonen binnen dezelfde Angular app.',
        'De browser hoeft niet volledig te herladen wanneer je naar een andere route gaat.',
        'De URL bepaalt welk component Angular in router-outlet plaatst.',
        'Met route parameters kan je een waarde zoals een id uit de URL lezen.'
      ],
      syntax: [
        '{ path: \'students\', component: StudentFeature }',
        '{ path: \'students/:id\', component: StudentDetail }',
        '<a routerLink="/students">Studenten</a>',
        '<router-outlet />',
        '{ path: \'**\', redirectTo: \'\' }',
        '[class.active]="isActiveRoute(link.route)"',
        'ActivatedRoute',
        'this.route.snapshot.paramMap.get(\'id\')'
      ],
      points: [
        'routerLink navigeert binnen Angular zonder volledige refresh.',
        'router-outlet toont het component van de actieve route.',
        "path: '' is de homepagina.",
        "path: '**' vangt onbekende routes op.",
        'ActivatedRoute leest route parameters zoals id uit de URL.'
      ],
      examTips: [
        'Routes staan centraal in app.routes.ts.',
        'routerLink gebruik je in plaats van gewone href voor interne Angular navigatie.',
        'router-outlet is de plaats waar het actieve component verschijnt.',
        'Route parameters zijn ideaal voor detailpagina’s, bijvoorbeeld /students/1.'
      ],
      codeExampleTitle: 'Klein routing voorbeeld',
      codeExample: `// app.routes.ts
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'students', component: StudentFeature },
  { path: 'students/:id', component: StudentDetail },
  { path: '**', redirectTo: '' }
];

<!-- app.html -->
<div class="container">
  <nav>
    <a routerLink="/databinding">Databinding</a>
    <a routerLink="/students">Studenten</a>
    <a routerLink="/input-output">Input & Output</a>
  </nav>
  <main class="content">
    <router-outlet></router-outlet>
  </main>
</div>

// app.ts
isActiveRoute(route: string): boolean {
  return this.router.url === route;
}

// student-detail.ts
ngOnInit() {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.student$ = this.studentService.getStudentById(id);
}`
    },
    {
      title: 'Reactive Form',
      description: 'Reactive forms worden vooral opgebouwd in TypeScript.',
      details: [
        'Bij reactive forms staat de formulierstructuur in de component class.',
        'De HTML koppelt zich aan die structuur met formGroup en formControlName.',
        'Validatie wordt overzichtelijk in TypeScript geplaatst met Validators.'
      ],
      syntax: [
        'studentForm = new FormGroup({...})',
        'new FormControl(\'\', [Validators.required])',
        '<form [formGroup]="studentForm">',
        '<input formControlName="voornaam" />',
        '(ngSubmit)="saveStudent()"'
      ],
      points: [
        'FormGroup is het volledige formulier.',
        'FormControl is een veld in het formulier.',
        'Validators controleren de input.',
        '[formGroup] koppelt de HTML-form aan TypeScript.',
        'formControlName koppelt een input aan een FormControl.'
      ],
      examTips: [
        'ReactiveFormsModule is nodig om reactive forms te gebruiken.',
        'studentForm.valid vertelt of het formulier geldig is.',
        'studentForm.value bevat de ingevulde waarden.',
        'markAllAsTouched() toont validatiefouten na een mislukte submit.'
      ],
      codeExampleTitle: 'Klein reactive form voorbeeld',
      codeExample: `studentForm = new FormGroup({
  voornaam: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email])
});

saveStudent() {
  if (this.studentForm.invalid) {
    this.studentForm.markAllAsTouched();
    return;
  }

  console.log(this.studentForm.value);
}

<!-- HTML -->
<form [formGroup]="studentForm" (ngSubmit)="saveStudent()">
  <input formControlName="voornaam" />
  <input formControlName="email" />
  <button [disabled]="studentForm.invalid">Opslaan</button>
</form>`
    },
    {
      title: 'Angular CLI commandos',
      description: 'Handige terminalcommandos om projecten, componenten, services en models te maken.',
      details: [
        'Met de Angular CLI kan je snel bestanden genereren volgens de Angular-structuur.',
        'Gebruik npm install om dependencies te installeren.',
        'Gebruik ng serve -o om de applicatie lokaal te starten en automatisch in de browser te openen.'
      ],
      syntax: [
        'npm install',
        'ng serve -o',
        'npm run build',
        'ng g c features/Student/Overview',
        'ng g s shared/services/student',
        'ng g class shared/models/Student'
      ],
      points: [
        'ng new maakt een nieuw Angular-project.',
        'ng g c maakt een component.',
        'ng g s maakt een service.',
        'ng g class maakt een class, bijvoorbeeld een model.',
        'ng generate environments maakt environment-bestanden.'
      ],
      examTips: [
        'Gebruik duidelijke mappen zoals features, shared/services en shared/models.',
        'Services horen meestal in shared/services wanneer meerdere onderdelen ze kunnen gebruiken.',
        'Models horen in shared/models zodat services en components dezelfde datastructuur gebruiken.'
      ],
      codeExampleTitle: 'Studentgerichte commandos',
      codeExample: `# Nieuw project maken
ng new student-exam-prep

# Dependencies installeren
npm install
npm install bootstrap

# App starten
ng serve -o

# Build controleren
npm run build

# Environment-bestanden maken
ng generate environments

# Student service en model
ng g s shared/services/student
ng g class shared/models/Student

# Student feature componenten
ng g c features/Student/Overview
ng g c features/Student/OverviewBalance
ng g c features/Student/StudentDetail

# Andere examenonderdelen
ng g c features/Databinding
ng g c features/InputOutput
ng g c features/ReactiveForm
ng g c features/Summary`
    }
  ];
}
