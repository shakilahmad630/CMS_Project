import { Component, OnInit, Inject } from '@angular/core';
import { AppService } from '../../../app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppStore } from 'src/app/store/app.store';
import { Store } from 'redux';
import { AppState, UserDetail } from 'src/app/store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCollapsed = false;

  isuserauthenticated : boolean = false;
  userrole : string = "";
  firstname : string = "";

  constructor(private service: AppService, private http: HttpClient, private router: Router,@Inject(AppStore) public store : Store<AppState>) {

    try {
      this.store.subscribe(() => this.updateState());
      
    } catch (error) {
      throw new Error("Authguard::contructor Exception :" + error);
      
    }
}

updateState()
{
  try {
    let currentuserdetail : UserDetail = this.store.getState().currentuserdetail;
    this.isuserauthenticated = this.store.getState().isLoggedIn;
    this.userrole = currentuserdetail.rolename;
    this.firstname = currentuserdetail.firstname;
    if(this.firstname !== undefined)
    {
      this.firstname = this.firstname.toUpperCase();
    }
  } catch (error) {
   throw new Error("HeaderComponent::updateState Exception :" + error);
  }
}


  ngOnInit(): void {
  }

  logout() {
    this.service.logout(() => {
        this.router.navigateByUrl('/signin'); 
        });
      return false;
  }

}
