import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BookComponent} from './book/book.component';
import {CityComponent} from './city/city.component';
import {RoomComponent} from './room/room.component';
import {ProductComponent} from './product/product.component';
import {NotFoundComponent} from './not-found.component';
import {DropdownTreeviewSelectModule} from './dropdown-treeview-select';
import {I18n} from './i18n';
import {DisabledOnSelectorDirective} from './disabled-on-selector.directive';
import {provideNgxTreeViewConfig} from '../../projects/ngx-treeview/src/lib/providers/defaut-config.provider';
import {DropdownTreeviewComponent, TreeviewComponent, TreeviewConfig} from 'ngx-treeview';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DropdownTreeviewSelectModule,
    AppRoutingModule,
    DropdownTreeviewComponent,
    TreeviewComponent
  ],
  declarations: [
    NotFoundComponent,
    BookComponent,
    CityComponent,
    RoomComponent,
    ProductComponent,
    AppComponent,
    DisabledOnSelectorDirective
  ],
  providers: [
    TreeviewConfig,
    provideNgxTreeViewConfig(),
    I18n
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
