import {Component, Injectable, OnInit, ViewChild, inject} from '@angular/core';
import {isNil, remove, reverse} from 'lodash';
import {
  DownlineTreeviewItem,
  OrderDownlineTreeviewEventParser,
  TreeviewComponent,
  TreeviewConfig,
  TreeviewEventParser,
  TreeviewHelper,
  TreeviewItem
} from 'ngx-treeview';
import {ProductService} from './product.service';

import {FormsModule} from '@angular/forms';
import {TreeviewComponent as TreeviewComponent_1} from '../../../projects/ngx-treeview/src/lib/components/treeview/treeview.component';

@Injectable()
export class ProductTreeviewConfig extends TreeviewConfig {
  hasAllCheckBox = true;
  hasFilter = true;
  hasCollapseExpand = false;
  maxHeight = 400;
}

@Component({
  selector: 'ngx-product',
  styleUrls: ['./product.component.scss'],
  templateUrl: './product.component.html',
  providers: [
    ProductService,
    {provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser},
    {provide: TreeviewConfig, useClass: ProductTreeviewConfig}
  ],
  imports: [FormsModule, TreeviewComponent_1]
})
export class ProductComponent implements OnInit {
  private service = inject(ProductService);

  @ViewChild(TreeviewComponent, {static: false}) treeviewComponent: TreeviewComponent;
  items: TreeviewItem[];
  rows: string[];

  ngOnInit(): void {
    this.items = this.service.getProducts();
  }

  onSelectedChange(downlineItems: DownlineTreeviewItem[]): void {
    this.rows = [];
    downlineItems.forEach(downlineItem => {
      const item = downlineItem.item;
      const value = item.value;
      const texts = [item.text];
      let parent = downlineItem.parent;
      while (!isNil(parent)) {
        texts.push(parent.item.text);
        parent = parent.parent;
      }
      const reverseTexts = reverse(texts);
      const row = `${reverseTexts.join(' -> ')} : ${value}`;
      this.rows.push(row);
    });
  }

  removeItem(item: TreeviewItem): void {
    for (const tmpItem of this.items) {
      if (tmpItem === item) {
        remove(this.items, item);
      } else {
        if (TreeviewHelper.removeItem(tmpItem, item)) {
          break;
        }
      }
    }

    this.treeviewComponent.raiseSelectedChange();
  }
}
