import {Component, inject} from '@angular/core';
import {TreeviewI18n} from 'ngx-treeview';
import {I18n} from './i18n';
import {DefaultTreeviewI18n} from './default-treeview-i18n';
import {FormsModule} from '@angular/forms';
import {RouterLinkActive, RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {provide: TreeviewI18n, useClass: DefaultTreeviewI18n}
  ],
  imports: [FormsModule, RouterLinkActive, RouterLink, RouterOutlet]
})
export class AppComponent {
  private i18n = inject(I18n);


  set language(language: string) {
    this.i18n.language = language;
  }

  get language(): string {
    return this.i18n.language;
  }
}
