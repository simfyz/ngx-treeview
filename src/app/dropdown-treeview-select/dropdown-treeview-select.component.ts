import {Component, Input, Output, EventEmitter, ViewChild, OnChanges, inject} from '@angular/core';
import {isNil} from 'lodash';
import {TreeviewI18n, TreeviewItem, TreeviewConfig, DropdownTreeviewComponent, TreeviewHelper} from 'ngx-treeview';
import {DropdownTreeviewSelectI18n} from './dropdown-treeview-select-i18n';

import {FormsModule} from '@angular/forms';
import {
  DropdownTreeviewComponent as DropdownTreeviewComponent_1
} from '../../../projects/ngx-treeview/src/lib/components/dropdown-treeview/dropdown-treeview.component';

@Component({
  selector: 'ngx-dropdown-treeview-select',
  templateUrl: './dropdown-treeview-select.component.html',
  styleUrls: [
    './dropdown-treeview-select.component.scss'
  ],
  providers: [
    {provide: TreeviewI18n, useClass: DropdownTreeviewSelectI18n}
  ],
  imports: [FormsModule, DropdownTreeviewComponent]
})
export class DropdownTreeviewSelectComponent implements OnChanges {
  i18n = inject(TreeviewI18n);

  @Input() config: TreeviewConfig;
  @Input() items: TreeviewItem[];
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();
  @ViewChild(DropdownTreeviewComponent, {static: false}) dropdownTreeviewComponent: DropdownTreeviewComponent;
  filterText: string;
  private dropdownTreeviewSelectI18n: DropdownTreeviewSelectI18n;

  constructor() {
    const i18n = this.i18n;

    this.config = TreeviewConfig.create({
      hasAllCheckBox: false,
      hasCollapseExpand: false,
      hasFilter: true,
      maxHeight: 500
    });
    this.dropdownTreeviewSelectI18n = i18n as DropdownTreeviewSelectI18n;
  }

  ngOnChanges(): void {
    this.updateSelectedItem();
  }

  select(item: TreeviewItem): void {
    if (!item.children) {
      this.selectItem(item);
    }
  }

  private updateSelectedItem(): void {
    if (!isNil(this.items)) {
      const selectedItem = TreeviewHelper.findItemInList(this.items, this.value);
      this.selectItem(selectedItem);
    }
  }

  private selectItem(item: TreeviewItem): void {
    if (this.dropdownTreeviewSelectI18n.selectedItem !== item) {
      this.dropdownTreeviewSelectI18n.selectedItem = item;
      if (this.dropdownTreeviewComponent) {
        this.dropdownTreeviewComponent.onSelectedChange([item]);
      }

      if (item) {
        if (this.value !== item.value) {
          this.value = item.value;
          this.valueChange.emit(item.value);
        }
      }
    }
  }
}
