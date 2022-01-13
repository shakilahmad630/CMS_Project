import { Component, OnInit, Inject, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';
import { AppStore } from 'src/app/store/app.store';
import { Store } from 'redux';
import { AppState } from 'src/app/store/app.state';
import { Role, UserAssignRole, UserAssignRolesIdentity } from './roledto';
import { SortEvent, NgbdRoleSortableHeader } from './sortable.directive';
import { RoleService } from './cpuserrole.service';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cpuserrole',
  templateUrl: './cpuserrole.component.html',
  styleUrls: ['./cpuserrole.component.scss'],
  providers: [RoleService, DecimalPipe]
})
export class CpuserroleComponent implements OnInit {
  [x: string]: any;

  roleForm: FormGroup;

  //table work
  countries$: Observable<Role[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdRoleSortableHeader) headers: QueryList<NgbdRoleSortableHeader>;
  @ViewChild('myModalconfirm') myModalconfirm: ModalDirective;
  //end
  //model = { userid: "Select Login ID", contenttypeid: "Select ContentType", locationid: "Select Location", operation: "Select Operation" };

  loginids = [{"id" : 1, "username" :"user0"}, {"id" : 2, "username" :"user1"}, {"id" : 3, "username" :"user3"}];
  contenttypes = [{"id" : 1, "type" :"RBT"}, {"id" : 2, "type" :"Image"}, {"id" : 3, "type" :"Video"}];
  locations = [{"id" : "01", "name" :"Dubai"}, {"id" : "02", "name" :"Somalia"}, {"id" : "03", "name" :"Kenya"}];
  operations = [{"id" : 1, "name" :"Single"}, {"id" : 2, "name" :"All"}];

  //selecteduserid: string = "";
  myModalinform: string = "";


  @ViewChild('myModalinfo') myModalinfo: ModalDirective;

  selectedrole : Role;

  constructor(public appservice: AppService, private http: HttpClient, @Inject(AppStore) public store: Store<AppState>, public service: RoleService) {

    //table work
    this.countries$ = service.countries$;
    this.total$ = service.total$;
    //table work  
    // @ViewChild('myModaledit') myModaledit: ModalDirective;
    //@ViewChild('myModalinfo') myModalinfo: ModalDirective;
    this.myModalinform = "";



    try {
      this.store.subscribe(() => this.updateState());

      this.appservice.getUsers();
      this.appservice.getContentTypes();
      this.appservice.getLocations();
      //this.service.setSelectedUserId('');
     

    } catch (error) {
      throw new Error("Authguard::contructor Exception :" + error);

    }
  }

  updateState() {
    try {
      this.loginids = this.store.getState().users;
      this.contenttypes = this.store.getState().contenttypes;
      this.locations = this.store.getState().locations;
      this.setDefaultValues();

    } catch (error) {
      throw new Error("Authguard::updateState Exception :" + error);
    }
  }

  ngOnInit() {
     this.roleForm = new FormGroup({
      userid: new FormControl('', [Validators.required]),
      contenttypeid: new FormControl('', [Validators.required]),
      locationid: new FormControl('', [Validators.required]),
      operation: new FormControl('', [Validators.required])
    });

    //this.setDefaultValues();
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  onSubmit() {
    let userassignroleIdentity: UserAssignRolesIdentity = {
      userid: this.userid.value,
      contenttypeid: this.contenttypeid.value,
      locationid: this.locationid.value
    };
    let userassignrole: UserAssignRole = {
      userassignrolesIdentity: userassignroleIdentity,
      operation: this.operation.value
    };

    if (this.roleForm.valid) {
      this.appservice.addnewUserAssignRoles(userassignrole, (result) => {
        if(result)
        {
          this.setDefaultValues();
        }
        this.myModalinform = (result) ? "User Role Added Successfully" : "Error in adding User Role";
        this.myModalinfo.show();
      });
    }

  }

  onDelete() {
    this.myModalconfirm.hide();

    let userassignroleIdentity: UserAssignRolesIdentity = {
      userid: this.userid.value,
     contenttypeid: this.selectedrole.contenttypeid,
      locationid: this.selectedrole.locationid
    };
    let userassignrole: UserAssignRole = {
      userassignrolesIdentity: userassignroleIdentity,
      operation: this.selectedrole.operation

    };
    this.appservice.deleteuserassignroles(userassignrole, (result) => {
      this.myModalinform = (result) ? "User Role Deleted" : "Error in deleting User Role";
      this.myModalinfo.show();
    });

  }

  showdialog(role : Role)
  {
    this.selectedrole = role;
    this.myModalconfirm.show();
  }

  onLoginIDSelected(event) {
     const value = event.target.value;
    // this.selecteduserid = value;
    this.service.setSelectedUserId(this.userid.value);
    console.log(this.userid.value);
  }
  get userid() { return this.roleForm.get('userid'); }
  get contenttypeid() { return this.roleForm.get('contenttypeid'); }
  get locationid() { return this.roleForm.get('locationid'); }
  get operation() { return this.roleForm.get('operation'); } 

  setDefaultValues()
  {
    let selecteduserid = this.userid.value;
    if(selecteduserid === undefined || selecteduserid === '')
    {
      selecteduserid = (this.loginids.length > 0) ? this.loginids[0].id : "";
    }

    this.roleForm.patchValue(
      {
         userid : selecteduserid,
        contenttypeid : (this.contenttypes.length > 0) ? this.contenttypes[0].id : "",
        locationid : (this.locations.length > 0) ? this.locations[0].id : "",
        operation : (this.operations.length > 0) ? this.operations[0].name : ""
    
      }
    );
    //this.roleForm.reset();
  }


}
