import { AsyncPipe } from '@angular/common';
import { CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-drag-drop',
  imports: [DragDropModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './drag-drop.html',
  styleUrl: './drag-drop.css'
})
export class DragDrop {
  // Simpele reactive form om de positie van de student-speler te kiezen.
  positionForm = new FormGroup({
    positionId: new FormControl('')
  });

  // We gebruiken een Observable zodat het voorbeeld lijkt op data uit een service.
  // In de HTML lezen we dit met de async pipe.
  positions$: Observable<{ id: number; name: string }[]> = of([
    { id: 1, name: 'Verdediging' },
    { id: 2, name: 'Middenveld' },
    { id: 3, name: 'Aanval' }
  ]);

  lastPosition = 'Nog niet verplaatst';

  onDragEnded(event: CdkDragEnd) {
    // getFreeDragPosition() geeft de positie terug waar het element naartoe gesleept is.
    const position = event.source.getFreeDragPosition();
    this.lastPosition = `X: ${Math.round(position.x)}, Y: ${Math.round(position.y)}`;
  }
}
