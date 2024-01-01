import {makeEnvironmentProviders} from '@angular/core';
import {DefaultTreeviewI18n, TreeviewI18n} from '../models/treeview-i18n';
import {DefaultTreeviewEventParser, TreeviewEventParser} from '../helpers/treeview-event-parser';

export function provideNgxTreeViewConfig() {
  return makeEnvironmentProviders(
    [
      {provide: TreeviewI18n, useClass: DefaultTreeviewI18n},
      {provide: TreeviewEventParser, useClass: DefaultTreeviewEventParser}
    ]
  );
}
