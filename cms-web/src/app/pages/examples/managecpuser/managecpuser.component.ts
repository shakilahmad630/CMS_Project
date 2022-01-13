import { Component, OnInit, Inject, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { UserDetail, AppState } from 'src/app/store/app.state';
import { AppService } from 'src/app/app.service';
import { AppStore } from 'src/app/store/app.store';
import { Store } from 'redux';

import {Observable} from 'rxjs';
import { take, map } from 'rxjs/operators';
import {UserDTO} from './userdto';
import {UserService} from './managecpuser.service';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';
import { DecimalPipe } from '@angular/common';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-managecpuser',
  templateUrl: './managecpuser.component.html',
  styleUrls: ['./managecpuser.component.scss'],
  providers: [UserService, DecimalPipe]
})
export class ManagecpuserComponent implements OnInit {
  focus1;
  focus2;
  focus3;
  focus4;
  focus5;
  focus6;
  focus7;

  userForm: FormGroup;
  //table work
  users$: Observable<UserDTO[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  // modalConfig = {
  //   class: "modal-black"
  // };

  modalRef: BsModalRef;
  @ViewChild('myModaledit') myModaledit: ModalDirective;
  @ViewChild('myModalinfo') myModalinfo: ModalDirective;
  @ViewChild('myModalconfirm') myModalconfirm: ModalDirective;

  userCopy : UserDTO ={username : "", password : "", email : "", phonenumber : "", status : "Select Status", 
  rolename : "Select Role", firstname : "", lastname : ""};
  usercopyrepassword = "";
  myModalinform = "";
  roles = [];
  selecteduser: UserDTO;

  constructor(private modalService: BsModalService, public appservice : AppService, @Inject(AppStore) public store : Store<AppState>,public service: UserService) { 
    
    //table work
    this.users$ = service.users$;
    this.total$ = service.total$;
     this.myModalinform = "";
    //table work
    try {
      this.store.subscribe(() => this.updateState());

      //this.appservice.getUsers();     
    } catch (error) {
      throw new Error("Authguard::contructor Exception :" + error);
      
    }
}

updateState()
{
  try {
    //this.currentuserdetail = this.store.getState().currentuserdetail;
    //this.users = this.store.getState().users;
    //this.roles = this.store.getState().roles;
    this.setRolesBasedOnCurrentUser();
    this.setDefaultValues();
  } catch (error) {
   throw new Error("ManagecpuserComponent::updateState Exception :" + error);
  }
}

setRolesBasedOnCurrentUser()
{
  const currentuserdetail = this.store.getState().currentuserdetail;
  if(currentuserdetail !== null)
  {
    const rolename = currentuserdetail.rolename;
    if(rolename.toUpperCase() === "CPTENANT")
    {//CP Tenant can create cpusers only
      this.roles = [];
      this.roles.push("CPUSER");
      this.roles.push("ADMIN");
    }
    else if(rolename.toUpperCase() === "ADMIN")
    {
      this.roles = [];
      this.roles.push("ADMIN");
      this.roles.push("CPTENANT");
      this.roles.push("CPUSER");
    }
    else
    {
      this.roles = [];
    }
  }

}

  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repassword: new FormControl('',[ Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      phonenumber: new FormControl('',[ Validators.required]),
      status: new FormControl('', [Validators.required]),
      rolename: new FormControl('',[Validators.required])
    }, {
      validators: [this.passwordsMatch('password', 'repassword')]
    });
  }

  passwordsMatch(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control) { return null; }
      const password = control.get(passwordKey);
      const confirmPassword = control.get(confirmPasswordKey);
      if (!password.value || !confirmPassword.value) {
        return null;
      }
    
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ mustMatch: true });
        return { passwordMismatch: true };
      }
      return null;
    };
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.appservice.addnewUser(this.userForm.value, (result) => {
        if (result) {
          this.setDefaultValues();
        }
        this.myModalinform = (result) ? "User created successfully" : "Error in creating User";
      this.myModalinfo.show();
      });
    }
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  onEdit(user: UserDTO) {
    //this.openEditUserrModal(user);
    this.userCopy = user;
    this.usercopyrepassword = user.password;

    this.myModaledit.show();
  }
  get username() { return this.userForm.get('username'); }
  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }
  get repassword() { return this.userForm.get('repassword'); }
  get firstname() { return this.userForm.get('firstname'); }
  get phonenumber() { return this.userForm.get('phonenumber'); }
  get status() { return this.userForm.get('status'); }
  get rolename() { return this.userForm.get('rolename'); }


  onSave()
  {
    this.appservice.updateuser(this.userCopy, (result) =>{

      this.myModaledit.hide();
      this.myModalinform = (result) ? "User updated successfully" : "Error in updating User";
      this.myModalinfo.show();

    });
  }

  /**
   * Deletes the user 
   * On deletion shows modal dailog with message.
   * @param user 
   */
  onDelete()
  {
    this.myModalconfirm.hide();

     this.appservice.deleteuser(this.selecteduser.id,(result) => {
      this.myModalinform = (result) ? "User  Deleted" : "Error in deleting User";
      this.myModalinfo.show();
    });
  }

  showdialog(user : UserDTO)
  {
    this.selecteduser = user;
    this.myModalconfirm.show();
  }

  setDefaultValues()
  {
    this.userForm.reset();
    this.userForm.patchValue(
      {
      status: 'Active',
      firstname: '',
      username : '',
      phonenumber : '',
      email : '',
      password : '' ,
      repassword : '',
      rolename : (this.roles.length > 0) ? this.roles[0] : "" 
      }
    );
  }
  

}
