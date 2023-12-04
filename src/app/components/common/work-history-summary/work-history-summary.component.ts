import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-work-history-summary',
  templateUrl: './work-history-summary.component.html',
  styleUrls: ['./work-history-summary.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WorkHistorySummaryComponent),
      multi: true
    }
  ]
})
export class WorkHistorySummaryComponent implements OnInit, ControlValueAccessor {
  @Input() disabled: boolean = false;

  constructor() { }

  value: any[] = [];
  onChange: (arrString: string) => void = () => { };
  onTouched: () => void = () => { };

  writeValue(arrString: string): void {
    this.value = JSON.parse(arrString ?? "[]");
    this.value.forEach(x=>{
      x.start = new Date(x.start);
      x.end = new Date(x.end);
    })
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  changeFn() {
    console.log(this.value);
    this.onChange(JSON.stringify(this.value));
  }

  ngOnInit() {
  }

  addItem(): void {
    this.value.unshift({ name: '', start: '', end: '', position: '', description: '' });
    this.changeFn();
    this.onTouched();
  }

  deleteItem(index: number): void {
    this.value.splice(index, 1);
    this.changeFn();
    this.onTouched();
  }
}
