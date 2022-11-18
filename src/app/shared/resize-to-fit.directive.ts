import { Directive, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResizeToFit]'
})
export class ResizeToFitDirective implements AfterViewInit {

  constructor(
    private product: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.checkBannerChilds();
  }

  checkBannerChilds() {
    const productBannerMargin = parseInt(getComputedStyle(this.product.nativeElement.firstChild).getPropertyValue('padding-left'), 10) +
      parseInt(getComputedStyle(this.product.nativeElement.firstChild).getPropertyValue('padding-right'), 10);
      const productNameWidth = this.product.nativeElement.firstChild.firstChild.firstChild.offsetWidth;
      const productNameBannerWidth = this.product.nativeElement.firstChild.offsetWidth - productBannerMargin;
      const productDescWidth = this.product.nativeElement.firstChild.children[1].firstChild.offsetWidth;
      const productBannerDescWidth = this.product.nativeElement.firstChild.offsetWidth -
        this.product.nativeElement.firstChild.children[1].children[1].offsetWidth - productBannerMargin;
    if (productNameWidth >= productNameBannerWidth - 1) {
      this.changeFontSize(this.product.nativeElement.firstChild.children[0]);
    } else if (productDescWidth >= productBannerDescWidth - 1) {
      this.changeFontSize(this.product.nativeElement.firstChild.children[1]);
    }
    this.changeProductBannerHeight();
  }

  changeFontSize(element: any) {
    const fontSize = parseFloat(window.getComputedStyle(element.children[0]).fontSize);
    this.renderer.setStyle(element.firstChild, 'font-size', `${fontSize - 1}px`);
    this.checkBannerChilds();
  }

  changeProductBannerHeight() {
    console.log(this.product.nativeElement.firstChild.offsetHeight);
    this.renderer.setStyle(this.product.nativeElement.firstChild,
      'height', this.product.nativeElement.offsetHeight * .33 + 'px');
  }
}
