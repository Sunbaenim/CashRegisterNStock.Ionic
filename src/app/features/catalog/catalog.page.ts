import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';
import { CategoryIndexModel } from './../../core/models/category/category-index.model';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {

  catalog!: CategoryIndexModel[];
  baseUrl: string = environment.baseUrl;
  private isModificationModeEnabled: boolean;

  constructor(
    private cService: CategoryService
  ) { }

  ngOnInit() {
    this.initCatalog();
  }

  initCatalog() {
    this.cService.getCategoriesWithProducts().pipe(first()).subscribe(data => {
      setTimeout(() => {
        this.catalog = data;
      }, 100);
    });
  }

}
