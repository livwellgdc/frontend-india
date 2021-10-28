import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[digitOnlyWithDecimal]'
})
export class DigitOnlyWithDecimalDirective {

  constructor() { }

  @Input() digit: any;
  @Input() howManyDot = 1;
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    let value = this.digit;
    if (value) {
      value = value.toString().replace(/[^0-9\.]/g, '');
    }
    let findsDot = new RegExp(/\./g);
    let containsDot = value ? value.match(findsDot) : '';

    /**
     * @AllowDots===howManyDot
     */
    if (containsDot != null && (containsDot.length == Number(this.howManyDot)) && ([46, 110, 190].indexOf(event.which) > -1)) {
      event.preventDefault();
      return false;
    }

    this.digit = value;

    if (event.which == 64 || event.which == 16) {
      // numbers
      return false;
    } if ([8, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {
      // backspace, enter, escape, arrows
      return true;
    } else if (event.which >= 48 && event.which <= 57) {
      // numbers
      return true;
    } else if (event.which >= 96 && event.which <= 105) {
      // numpad number
      return true;
    } else if ([46, 110, 190].indexOf(event.which) > -1) {
      // dot and numpad dot
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

}
