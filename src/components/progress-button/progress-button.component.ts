
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-progress-button',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './progress-button.component.html',
  styleUrl: './progress-button.component.scss'
})
export class ProgressButtonComponent implements OnInit, OnChanges {

  @Input() public isDisabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() btnName!: string;
  @Input() loadingBtnName!: string;
  @Input() type!: "submit" | "button" | "reset" | "menu";
  @Input() varient: "filled" | "outlined" = 'filled';
  @Output() btnClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges) {
    changes?.['isDisabled'] ? (this.isDisabled = changes?.['isDisabled']?.currentValue) : false;
    changes?.['isLoading'] ? (this.isLoading = changes?.['isLoading']?.currentValue) : false;

  }

  public onClick() {
    this.btnClick.emit()
  }

}