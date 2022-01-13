// auth.guard.ts
import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AppService } from '../app.service';
import { AppStore } from '../store/app.store';
import { AppState } from '../store/app.state';
import { Store } from 'redux';
import { LOCAL_STORAGE_KEYS } from '../helpers/Enums';

@Injectable()
export class AuthGuard implements CanActivate {
  isLoggedIn: boolean = false;

  constructor(private service: AppService, private router: Router, @Inject(AppStore) public store: Store<AppState>) {
    try {
      this.store.subscribe(() => this.updateState());

    } catch (error) {
      throw new Error("Authguard::contructor Exception :" + error);

    }
  }
  updateState() {
    try {
      this.isLoggedIn = this.store.getState().isLoggedIn;
    } catch (error) {
      throw new Error("Authguard::updateState Exception :" + error);
    }
  }

  canActivate() {

    if (!this.isLoggedIn)//|| localStorage.getItem("TOKEN") == null
    {
      //check local storage and auto log in
      if (localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN) !== null) {
        this.service.autoSignIn(result => {
          let nextpage = (result) ? 'home' : '';
          this.router.navigateByUrl(nextpage);
          return result;
        });
      }
      else if(localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN) == null)
      {
        this.router.navigateByUrl('');
        return false
      }            
    }
    else if(localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN) == null)
    {
      this.router.navigateByUrl('');
      return false
    }  

    return true;
  }
}