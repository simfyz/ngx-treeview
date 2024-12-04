import {Directive, Input, OnChanges, ElementRef, Renderer2, inject} from '@angular/core';

@Directive({selector: '[ngxDisabledOnSelector]'})
export class DisabledOnSelectorDirective implements OnChanges {
  private el = inject(ElementRef);
  private renderer2 = inject(Renderer2);

  @Input() ngxDisabledOnSelector: string;
  @Input() disabled: boolean;
  private readonly nativeElement: HTMLElement;

  constructor() {
    const el = this.el;

    this.nativeElement = el.nativeElement;
  }

  ngOnChanges(): void {
    const elements = this.nativeElement.querySelectorAll(this.ngxDisabledOnSelector);
    elements.forEach(element => {
      this.renderer2.setProperty(element, 'disabled', this.disabled);
    });
  }
}
