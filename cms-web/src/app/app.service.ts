import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppStore } from './store/app.store';
import { AppState, UserDetail } from './store/app.state';
import { Store } from 'redux';
import * as UserActions from './store/app.actions';
import * as CONSTANTS from './helpers/constants'
import { UserDTO } from './pages/examples/managecpuser/userdto';
import { Role, UserAssignRole } from './pages/examples/cpuserrole/roledto';
import { ContentDetail, SearchContent } from './pages/examples/managecontent/contentdto';
import { Category } from './pages/examples/managecategory/categorydto';
import { ContentService } from './pages/examples/managecontent/managecontent.service';
import { LOCAL_STORAGE_KEYS } from './helpers/Enums';
import { AppConfig } from './app.config';

interface Response{
    result : string,
    error : string
}

@Injectable()
export class AppService {

    private BASEURL : string = "";

    constructor(private http: HttpClient, @Inject(AppStore) public store: Store<AppState>, private appconfig : AppConfig) {
        try {
            this.store.subscribe(() => this.updateState());

        } catch (error) {
            throw new Error("Authguard::contructor Exception :" + error);

        }
    }

    updateState() {
        try {
            //this.currentuserdetail = this.store.getState().currentuserdetail;
        } catch (error) {
            throw new Error("Authguard::updateState Exception :" + error);
        }
    }

    autoSignIn(callback) {
        this.BASEURL = this.appconfig.getConfig("service").baseurl;

        this.http.post(this.BASEURL + CONSTANTS.API.REAUTHENTICATE, localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)).subscribe(response => {
            let res = true;
            let responseObj : any = response;
            if(responseObj.error === '')
            {
                //set token in local storage
                localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, responseObj.token);
                this.store.dispatch(UserActions.setCurrentUserDetails({ response }));
            }
            else{
                res = false;
            }

            return callback && callback(res);
        },
        (error) => {
            console.log(error);
            return callback && callback(false);
        });
      }

    authenticate(credentials, callback) {

        this.BASEURL = this.appconfig.getConfig("service").baseurl;

        this.http.post(this.BASEURL + CONSTANTS.API.AUTHENTICATE, credentials).subscribe(response => {
            let res = true;
            let responseObj : any = response;
            if(responseObj.error === '')
            {
                //set token in local storage
                localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, responseObj.token);
                this.store.dispatch(UserActions.setCurrentUserDetails({ response }));
            }
            else{
                res = false;
            }

            return callback && callback(res);
        },
            (error) => {
                console.log(error);
                return callback && callback(false);
            });

    }

    addnewUser(userdetail: UserDTO, callback) {

        //add current user logined detail
        userdetail.associateduserid = this.store.getState().currentuserdetail.id;

        this.http.post(this.BASEURL + CONSTANTS.API.ADDNEWUSER, userdetail).subscribe((response: Response) => {
            let res = response.result.length > 0 ? true : false;
            this.getUsers();
            return callback && callback(res);
        },
            (error) => {
                console.log(error);
                return callback && callback(false);
            });
    }

    addnewUserAssignRoles(userdetail: UserAssignRole, callback) {
        this.http.post(this.BASEURL + CONSTANTS.API.ADDUSERASSIGNROLES, userdetail).subscribe((response: Response) => {
            let res = response.result.length > 0 ? true : false;
            this.getUserassignroles(userdetail.userassignrolesIdentity.userid);
            return callback && callback(res);
        },
            (error) => {
                console.log(error);
                return callback && callback(false);
            });
    }

    endActiveSession() {
        try {
            //clear token from local storage
            //localStorage.clear();
            localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
            //remove user authnetication in app state
            this.store.dispatch(UserActions.setCurrentUserDetails(false));
        } catch (error) {
            throw new Error("AppService::endActiveSession exception: " + error);
        }
    }

    getLanguages() {
        this.http.get(this.BASEURL + CONSTANTS.API.LANGUAGES).subscribe(response => {
            this.store.dispatch(UserActions.setLanguages(response));
        },
            (error) => {
                console.log(error);
            });
    }


    getContentTypes() {
        this.http.get(this.BASEURL + CONSTANTS.API.CONTENTTYPES).subscribe(response => {
            this.store.dispatch(UserActions.setContentTypes(response));
        },
            (error) => {
                console.log(error); 0
            });
    }

    getLocations() {
        this.http.get(this.BASEURL + CONSTANTS.API.LOCATIONS).subscribe(response => {
            this.store.dispatch(UserActions.setLocations(response));
        },
            (error) => {
                console.log(error);
            });
    }


    getContentproperties() {
        this.http.get(this.BASEURL + CONSTANTS.API.CONTENTPROPERTIES).subscribe(response => {
            this.store.dispatch(UserActions.setContentProperties(response));
        },
            (error) => {
                console.log(error);
            });
    }

    getRoles() {
        this.http.get(this.BASEURL + CONSTANTS.API.ROLES).subscribe(response => {
            this.store.dispatch(UserActions.setRoles(response));
        },
            (error) => {
                console.log(error);
            });
    }

    getContents(searchObj : SearchContent) {
        if(searchObj.userid === "")
        {
            return;
        }
        this.http.post(this.BASEURL + CONSTANTS.API.CONTENTS, searchObj).subscribe(response => {
            this.store.dispatch(UserActions.setContents(response));
        },
            (error) => {
                console.log(error);
            });
    }

    getUsers() {
        this.http.post(this.BASEURL + CONSTANTS.API.USERS, this.store.getState().currentuserdetail.id).subscribe(response => {
            this.store.dispatch(UserActions.setUsers(response));
        },
            (error) => {
                console.log(error);
            });
    }

    getUserinroles() {
        this.http.get(this.BASEURL + CONSTANTS.API.USERINROLES).subscribe(response => {
            this.store.dispatch(UserActions.setUserinroles(response));
        },
            (error) => {
                console.log(error);
            });
    }

    getUserassignroles(userid: string) {
        this.http.post(this.BASEURL + CONSTANTS.API.USERASSIGNROLES, userid).subscribe(response => {
            this.store.dispatch(UserActions.setUserassignroles(response));
        },
            (error) => {
                console.log(error);
            });
    }

    getCptenantusers() {
        this.http.get(this.BASEURL + CONSTANTS.API.CPTENANTSUSERS).subscribe(response => {
            this.store.dispatch(UserActions.setCptenantusers(response));
        },
            (error) => {
                console.log(error);
            });

    }

    getContentProperties() {
        this.http.get(this.BASEURL + CONSTANTS.API.CONTENTPROPERTIES).subscribe(response => {
            this.store.dispatch(UserActions.setContentProperties(response));
        },
            (error) => {
                console.log(error);
            });
    }

    logout(callback) {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
        this.store.dispatch(UserActions.setCurrentUserDetails(null));
        return callback && callback();


        // this.http.post('logout', {}).subscribe(() => {
        //     return callback && callback();
        // },
        // (error) => {
        //     console.log(error);
        //     return callback && callback();
        // });
    }

    updateuser(userData: UserDTO, callback) {
        userData.associateduserid = "";
        userData.lastname = "";
        userData.rolename = "";

        this.http.post(this.BASEURL + CONSTANTS.API.UPDATEUSER, userData).subscribe((response: Response) => {
            let res = response.result.length > 0 ? true : false;
            //update user list
            this.getUsers();

            return callback && callback(res);
        },
            (error) => {
                console.log(error);
                return callback && callback(false);
            });
    }

    deleteuser(userid: string, callback) {
        this.http.post(this.BASEURL + CONSTANTS.API.DELETEUSER, userid).subscribe((response: Response) => {
            //update user list
            let res = response.result.length > 0 ? true : false;
            this.getUsers();
            return callback && callback(res);
        },
            (error) => {
                console.log(error);
                return callback && callback(false);
            });
    }

    //   deleteuserassignroles(role:Role) {
    //     this.http.post(this.BASEURL + CONSTANTS.API.DELETEUSERASSSIGNROLES,role).subscribe(response => {
    //          //update user list
    //          this.getUserassignroles(role.userid);
    //     },
    //     (error) => {
    //         console.log(error);
    //     });
    //   }

    deletecontent(contentid: string, callback: any) {
        this.http.post(this.BASEURL + CONSTANTS.API.DELETECONTENTS, contentid).subscribe((response: Response) => {
            let res = response.result.length > 0 ? true : false;
            return callback & callback(res);
        },
            (error) => {
                console.log(error);
                return callback & callback(false);
            });
    }

    deleteuserassignroles(userassignrole: UserAssignRole, callback: any) {
        this.http.post(this.BASEURL + CONSTANTS.API.DELETEUSERASSIGNROLE, userassignrole).subscribe((response: Response) => {
            //update user list
            let res = response.result.length > 0 ? true : false;
            this.getUserassignroles(userassignrole.userassignrolesIdentity.userid);
            return callback & callback(res);
        },
            (error) => {
                console.log(error);
                return callback & callback(false);
            });
    }

    addnewContent(contentaddCopy: FormData, callback: any) {
        //  contentaddCopy.userid = this.store.getState().currentuserdetail.id;

        this.http.post(this.BASEURL + CONSTANTS.API.ADDCONTENTS, contentaddCopy).subscribe((response: Response) => { 
            let res = response.result.length > 0 ? true : false;  
            return callback & callback(res);
        },
            (error) => {
                console.log(error);
                return callback & callback(false);
            });
    }

    savecontent(contentCopy: FormData, callback) {
       // contentCopy.userid = this.store.getState().currentuserdetail.id;

        this.http.post(this.BASEURL + CONSTANTS.API.UPDATECONTENTS, contentCopy).subscribe((response: Response) => {    
            let res = response.result.length > 0 ? true : false;        
            return callback & callback(res);
        },
            (error) => {
                console.log(error);
                return callback & callback(false);
            });
    }

    addbulkContent(formData: FormData, callback) {
        this.http.post(this.BASEURL + CONSTANTS.API.BULKUPLOADFORM, formData).subscribe((response: Response) => {       
            let res = response.result.length > 0 ? true : false;  
            return callback & callback(res);
        },
            (error) => {
                console.log(error);
                return callback & callback(false);
            });
    }

    deletecategory(id: number, callback) {
        this.http.post(this.BASEURL + CONSTANTS.API.DELETECATEGORY, id).subscribe((response: Response) => {
            //update categories list
            let res = response.result.length > 0 ? true : false;  
            this.getCategories();
            return callback & callback(res);
        },
            (error) => {
                console.log(error);
                return callback & callback(false);
            });
      }

      addnewCategory(newcategory: Category, callback) {
        this.http.post(this.BASEURL + CONSTANTS.API.ADDCATEGORY, newcategory).subscribe((response: Response) => {
            //update categories list
            let res = response.result.length > 0 ? true : false;  
            this.getCategories();
            return callback & callback(res);
        },
            (error) => {
                console.log(error);
                return callback & callback(false);
            });
      }

      //view data of catgeries
      getCategories() {
        this.http.get(this.BASEURL + CONSTANTS.API.VIEWCATEGORY).subscribe(response => {
            this.store.dispatch(UserActions.setCategories(response));
        },
            (error) => {
                console.log(error);
            });
      }

      updateCategories(category: Category, callback) {

        this.http.post(this.BASEURL + CONSTANTS.API.UPDATECATEGORY, category).subscribe((response: Response) => {
            //update user list
            let res = response.result.length > 0 ? true : false;  
            this.getCategories();

            return callback && callback(res);
        },
            (error) => {
                console.log(error);
                return callback && callback(false);
            });
    }

    getcontentReport(callback) {

        let userid = this.store.getState().currentuserdetail.id;
        if(userid === undefined)
            return;

        this.http.post(this.BASEURL + CONSTANTS.API.CONTENTSREPORT, userid).subscribe(response => {

            this.store.dispatch(UserActions.setContentsreport(response));
            return callback && callback(response);
        },
            (error) => {
                console.log(error);
                return callback && callback(undefined);
            });
      }

      getcontentCreatedStats(callback) {

        let userid = this.store.getState().currentuserdetail.id;
        if(userid === undefined)
            return;

        this.http.post(this.BASEURL + CONSTANTS.API.CONTENTSCREATEDSTATS, userid).subscribe(response => {

            //this.store.dispatch(UserActions.setContentsreport(response));
            return callback && callback(response);
        },
            (error) => {
                console.log(error);
                return callback && callback(undefined);
            });
      }

      getcontentExpiredStats(callback) {

        let userid = this.store.getState().currentuserdetail.id;
        if(userid === undefined)
            return;

        this.http.post(this.BASEURL + CONSTANTS.API.CONTENTSEXPIREDSTATS, userid).subscribe(response => {

            //this.store.dispatch(UserActions.setContentsreport(response));
            return callback && callback(response);
        },
            (error) => {
                console.log(error);
                return callback && callback(undefined);
            });
      }

}
