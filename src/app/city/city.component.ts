import {Component, OnInit, ViewChild, inject} from '@angular/core';
import {DropdownTreeviewComponent, TreeviewI18n} from 'ngx-treeview';
import {City, CityService} from './city.service';
import {CityTreeviewI18n} from './city-treeview-i18n';
import {JsonPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  DropdownTreeviewComponent as DropdownTreeviewComponent_1
} from '../../../projects/ngx-treeview/src/lib/components/dropdown-treeview/dropdown-treeview.component';
import {TreeviewPipe} from '../../../projects/ngx-treeview/src/lib/pipes/treeview.pipe';

@Component({
  selector: 'ngx-city',
  templateUrl: './city.component.html',
  providers: [
    CityService,
    {provide: TreeviewI18n, useClass: CityTreeviewI18n}
  ],
  imports: [FormsModule, DropdownTreeviewComponent_1, JsonPipe, TreeviewPipe]
})
export class CityComponent implements OnInit {
  private service = inject(CityService);

  @ViewChild(DropdownTreeviewComponent, {static: false}) dropdownTreeviewComponent: DropdownTreeviewComponent;
  cities: City[];
  selectedCities: City[];
  unselectedCities: City[];

  ngOnInit(): void {
    this.service.getCities().subscribe(cities => {
      this.cities = cities;
    });
  }

  onSelectedChange(selectedCities: City[]): void {
    this.selectedCities = selectedCities;
    const uncheckedItems = this.dropdownTreeviewComponent.treeviewComponent.selection.uncheckedItems;
    this.unselectedCities = uncheckedItems.map(item => item.value);
  }
}
