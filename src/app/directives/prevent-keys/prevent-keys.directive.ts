import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[prevent-keys]',
  host: {
    '(keydown)': 'onKeyUp($event)'
  }
})
export class PreventKeysDirective {
  @Input('prevent-keys') preventKeys;
  @Input() isPasteAllowed = true;

  constructor() { }
  onKeyUp($event) {

    if (!this.isPasteAllowed && $event.keyCode === 86 && $event.ctrlKey === true) {
      $event.preventDefault();
    }

    if (this.preventKeys && this.preventKeys.includes($event.keyCode)) {
      $event.preventDefault();
    }
  }
}
