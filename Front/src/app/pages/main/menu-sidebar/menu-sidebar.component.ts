import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

declare var $: any;
import * as AdminLte from 'admin-lte';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit, AfterViewInit {

  @ViewChild('mainSidebar', { static: false }) mainSidebar;
  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    $('[data-widget="treeview"]').Treeview('init');

    this.mainSidebarHeight.emit(this.mainSidebar.nativeElement.offsetHeight);
  }
}
