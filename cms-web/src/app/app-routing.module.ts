import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/examples/landingpage/landingpage.component";
import { ManagecontentComponent } from './pages/examples/managecontent/managecontent.component';
import { ManagecpuserComponent } from './pages/examples/managecpuser/managecpuser.component';
import { CpuserroleComponent  } from './pages/examples/cpuserrole/cpuserrole.component';
import { AddComponent  } from './pages/examples/add/add.component';
import { AuthGuard } from './auth/auth.guard';
import { BulkContentComponent } from './pages/examples/bulk-content/bulk-content.component';
import { ManagecategoryComponent } from './pages/examples/managecategory/managecategory.component';

const routes: Routes = [
  { path: "", redirectTo: "signin", pathMatch: "full" },
  { path: "home", component: LandingpageComponent, canActivate : [AuthGuard] },
  { path: "profile", component: ProfilepageComponent },
  { path: "signin", component: RegisterpageComponent },
  { path: "landing", component: IndexComponent },
  { path: "managecontent", component: ManagecontentComponent , canActivate : [AuthGuard]},
  { path: "managebulkcontent", component: BulkContentComponent , canActivate : [AuthGuard]},
  { path: "add", component: AddComponent , canActivate : [AuthGuard]},
  { path: "manageuser", component: ManagecpuserComponent , canActivate : [AuthGuard]},
  { path: "managerole", component: CpuserroleComponent , canActivate : [AuthGuard]},
  { path: "managecategory", component: ManagecategoryComponent , canActivate : [AuthGuard]},
  { path: "profile", component: ProfilepageComponent , canActivate : [AuthGuard]},
  
 ];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: []
})
export class AppRoutingModule {}
