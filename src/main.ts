import {enableProdMode} from '@angular/core';


import {environment} from './environments/environment';
import {TreeviewConfig} from 'ngx-treeview';
import {provideNgxTreeViewConfig} from '../projects/ngx-treeview/src/lib/providers/defaut-config.provider';
import {I18n} from './app/i18n';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter, Routes} from '@angular/router';
import {BookComponent} from './app/book/book.component';
import {CityComponent} from './app/city/city.component';
import {RoomComponent} from './app/room/room.component';
import {DropdownTreeviewSelectDemoComponent} from './app/dropdown-treeview-select/dropdown-treeview-select-demo.component';
import {ProductComponent} from './app/product/product.component';
import {NotFoundComponent} from './app/not-found.component';


const routes: Routes = [
  {path: '', redirectTo: 'components', pathMatch: 'full'},
  {path: 'components', component: BookComponent},
  {path: 'pipe', component: CityComponent},
  {path: 'performance', component: RoomComponent},
  {path: 'template', component: DropdownTreeviewSelectDemoComponent},
  {path: 'advanced', component: ProductComponent},
  {path: '**', component: NotFoundComponent}
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    TreeviewConfig,
    provideNgxTreeViewConfig(),
    I18n,
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes)
  ]
})
  .catch(err => console.error(err));
