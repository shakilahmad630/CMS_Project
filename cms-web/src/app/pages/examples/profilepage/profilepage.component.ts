import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppStore } from 'src/app/store/app.store';
import { Store } from 'redux';
import { AppState, UserDetail } from 'src/app/store/app.state';

@Component({
  selector: "app-profilepage",
  templateUrl: "profilepage.component.html"
})
export class ProfilepageComponent implements OnInit, OnDestroy {
  isCollapsed = true;

  currentuserdetail : UserDetail = {firstname : "", email : "", id : "", lastname : "",rolename : ""};

  constructor(private service: AppService, private http: HttpClient, private router: Router,@Inject(AppStore) public store : Store<AppState>) {

    try {
      this.updateState();
      this.store.subscribe(() => this.updateState());
      
    } catch (error) {
      throw new Error("Authguard::contructor Exception :" + error);
      
    }
}

updateState()
{
  try {
    this.currentuserdetail = this.store.getState().currentuserdetail;

  } catch (error) {
   throw new Error("HeaderComponent::updateState Exception :" + error);
  }
}


  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
    this.updateState();
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }
}
