import {Component, inject, OnInit} from '@angular/core';
import {TreeviewConfig, TreeviewItem} from 'ngx-treeview';
import {RoomService} from './room.service';
import {FormsModule} from '@angular/forms';
import {DropdownTreeviewComponent} from '../../../projects/ngx-treeview/src/lib/components/dropdown-treeview/dropdown-treeview.component';

@Component({
  selector: 'ngx-room',
  templateUrl: './room.component.html',
  providers: [
    RoomService
  ],
  imports: [FormsModule, DropdownTreeviewComponent]
})
export class RoomComponent implements OnInit {
  private service = inject(RoomService);

  rooms: TreeviewItem[];
  values: any[];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: false,
    maxHeight: 500
  });

  ngOnInit(): void {
    this.service.getRooms().subscribe(rooms => this.rooms = rooms);
  }
}
