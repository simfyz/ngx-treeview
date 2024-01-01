import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DropdownTreeviewSelectComponent} from './dropdown-treeview-select.component';
import {DropdownTreeviewSelectDemoComponent} from './dropdown-treeview-select-demo.component';
import {DropdownTreeviewComponent} from 'ngx-treeview';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    DropdownTreeviewComponent
  ],
  declarations: [
    DropdownTreeviewSelectComponent,
    DropdownTreeviewSelectDemoComponent
  ],
  exports: [
    DropdownTreeviewSelectDemoComponent
  ]
})
export class DropdownTreeviewSelectModule { }
