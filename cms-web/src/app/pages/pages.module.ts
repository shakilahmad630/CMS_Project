import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule, DecimalPipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { PopoverModule } from "ngx-bootstrap/popover";

import { IndexComponent } from "./index/index.component";
import { ProfilepageComponent } from "./examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./examples/landingpage/landingpage.component";
import { ManagecontentComponent } from './examples/managecontent/managecontent.component';
import { ManagecpuserComponent } from './examples/managecpuser/managecpuser.component';
import { CpuserroleComponent } from './examples/cpuserrole/cpuserrole.component';
import { AddComponent } from './examples/add/add.component';
import { HeaderComponent } from './examples/header/header.component';
import { MyFooterComponent } from './examples/myfooter/myfooter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from './examples/managecpuser/sortable.directive';
import { BulkContentComponent } from './examples/bulk-content/bulk-content.component';
import { ManagecategoryComponent } from './examples/managecategory/managecategory.component';
import { ContentService } from './examples/managecontent/managecontent.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule
  ],
  declarations: [
    NgbdSortableHeader,
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,    
    ManagecontentComponent,
    ManagecpuserComponent,
    CpuserroleComponent,
    AddComponent,
    HeaderComponent,
    MyFooterComponent,
    BulkContentComponent,
    ManagecategoryComponent

  ],
  exports: [
    NgbdSortableHeader,
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    HeaderComponent,
    MyFooterComponent

  ],
  providers: [ContentService, DecimalPipe]
})
export class PagesModule {}
