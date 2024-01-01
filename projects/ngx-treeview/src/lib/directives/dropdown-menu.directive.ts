import { Directive, HostBinding } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';

@Directive({
    selector: '[ngxDropdownMenu]',
    host: {
        '[class.dropdown-menu]': 'true',
        '[class.show]': 'dropdown.isOpen'
    },
    standalone: true
})
export class DropdownMenuDirective {
  constructor(
    public dropdown: DropdownDirective
  ) { }
}
