import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  @Output() public clickOutside = new EventEmitter();
  constructor(private _elementRef: ElementRef) {

  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    console.log("this is data"+targetElement);
    console.log("From old days"+this._elementRef.nativeElement.innerHTML);
      const isClickedInside = this._elementRef.nativeElement.contains(targetElement);
      console.log("this is to chweck the evemy -->"+this._elementRef.nativeElement.contains(targetElement));
      if (!isClickedInside) {
        console.log("Hi inside the program");
          this.clickOutside.emit(null);
      }
  }

}
