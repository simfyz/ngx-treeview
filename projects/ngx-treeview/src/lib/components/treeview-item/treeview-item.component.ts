import { Component, EventEmitter, Input, Output, TemplateRef, inject } from '@angular/core';
import {isNil} from 'lodash';
import {TreeviewItem} from '../../models/treeview-item';
import {TreeviewConfig} from '../../models/treeview-config';
import {TreeviewItemTemplateContext} from '../../models/treeview-item-template-context';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'ngx-treeview-item',
  templateUrl: './treeview-item.component.html',
  styleUrls: ['./treeview-item.component.scss'],
  imports: [NgTemplateOutlet]
})
export class TreeviewItemComponent {
  private defaultConfig = inject(TreeviewConfig);

  @Input() config: TreeviewConfig;
  @Input() template: TemplateRef<TreeviewItemTemplateContext>;
  @Input() item: TreeviewItem;
  @Output() checkedChange = new EventEmitter<boolean>();

  constructor() {
    this.config = this.defaultConfig;
  }

  onCollapseExpand = () => {
    this.item.collapsed = !this.item.collapsed;
  };

  onCheckedChange = () => {
    const checked = this.item.checked;
    if (!isNil(this.item.children) && !this.config.decoupleChildFromParent) {
      this.item.children.forEach(child => child.setCheckedRecursive(checked));
    }
    this.checkedChange.emit(checked);
  };

  onChildCheckedChange(child: TreeviewItem, checked: boolean): void {
    if (!this.config.decoupleChildFromParent) {
      let itemChecked: boolean = null;
      for (const childItem of this.item.children) {
        if (itemChecked === null) {
          itemChecked = childItem.checked;
        } else if (itemChecked !== childItem.checked) {
          itemChecked = undefined;
          break;
        }
      }

      if (itemChecked === null) {
        itemChecked = false;
      }

      if (this.item.checked !== itemChecked) {
        this.item.checked = itemChecked;
      }

    }

    this.checkedChange.emit(checked);
  }
}
