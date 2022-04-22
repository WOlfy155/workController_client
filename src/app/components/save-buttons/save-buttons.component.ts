import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-save-buttons',
  templateUrl: './save-buttons.component.html',
  styleUrls: ['./save-buttons.component.scss']
})
export class SaveButtonsComponent implements OnInit {

  @Output() acceptedClicked = new EventEmitter<void>();
  @Output() cancelClicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
