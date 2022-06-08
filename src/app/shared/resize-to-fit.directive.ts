import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appResizeToFit]'
})
export class ResizeToFitDirective implements AfterViewInit {

  private fontSize: number;
  private firstChild: HTMLElement;
  private secondChild: HTMLElement;

  constructor(
    private productBanner: ElementRef
  ) {}

  ngAfterViewInit(): void {
    this.firstChild = this.productBanner.nativeElement.children[0];
    this.secondChild = this.productBanner.nativeElement.children[1];
    this.fontSize = parseFloat(window.getComputedStyle(this.firstChild).fontSize);
    this.changeHeight();
    this.changeFontSize();
  }

  changeFontSize() {
    this.fontSize = parseFloat(window.getComputedStyle(this.firstChild).fontSize);
    if (this.fontSize <= this.firstChild.offsetHeight / 2) {
      this.firstChild.style.fontSize = (this.fontSize - 1) + 'px';
      this.changeFontSize();
    }
  }

  changeHeight() {
    this.productBanner.nativeElement.style.height =
    (this.fontSize <= this.firstChild.clientHeight / 2 ? this.firstChild.clientHeight / 2 : this.firstChild.clientHeight)
    + this.secondChild.clientHeight + 'px';
  }

}
