import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-textbox',
  templateUrl: './filter-textbox.html',
  styleUrl: './filter-textbox.css'
})
export class FilterTextbox {
  // @Output stuurt de filtertekst naar de parent component.
  // De parent kan hiermee de studentenlijst filteren.
  @Output() changed = new EventEmitter<string>();

  onClicked(value: string) {
    this.changed.emit(value);
  }
}
