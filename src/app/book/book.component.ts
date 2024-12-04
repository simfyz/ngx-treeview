import {Component, OnInit, inject} from '@angular/core';
import {TreeviewItem, TreeviewConfig} from 'ngx-treeview';
import {BookService} from './book.service';
import {FormsModule} from '@angular/forms';
import {TreeviewComponent} from '../../../projects/ngx-treeview/src/lib/components/treeview/treeview.component';

import {DropdownTreeviewComponent} from '../../../projects/ngx-treeview/src/lib/components/dropdown-treeview/dropdown-treeview.component';
import {DisabledOnSelectorDirective} from '../disabled-on-selector.directive';

@Component({
  selector: 'ngx-book',
  templateUrl: './book.component.html',
  providers: [
    BookService
  ],
  imports: [FormsModule, TreeviewComponent, DropdownTreeviewComponent, DisabledOnSelectorDirective]
})
export class BookComponent implements OnInit {
  private service = inject(BookService);

  dropdownEnabled = true;
  items: TreeviewItem[];
  values: number[];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 250
  });

  buttonClasses = [
    'btn-outline-primary',
    'btn-outline-secondary',
    'btn-outline-success',
    'btn-outline-danger',
    'btn-outline-warning',
    'btn-outline-info',
    'btn-outline-light',
    'btn-outline-dark'
  ];
  buttonClass = this.buttonClasses[0];

  ngOnInit(): void {
    this.items = this.service.getBooks();
  }

  onFilterChange(value: string): void {
    console.log('filter:', value);
  }
}
