import { Directive, ElementRef, inject } from '@angular/core';
import {DropdownDirective} from './dropdown.directive';

@Directive({
  selector: '[ngxDropdownToggle]',
  host: {
    class: 'dropdown-toggle',
    'aria-haspopup': 'true',
    '[attr.aria-expanded]': 'dropdown.isOpen',
    '(click)': 'dropdown.toggle()'
  }
})
export class DropdownToggleDirective {
  dropdown = inject(DropdownDirective);

  constructor() {
    const dropdown = this.dropdown;
    const elementRef = inject(ElementRef);

    dropdown.toggleElement = elementRef.nativeElement;
  }
}
