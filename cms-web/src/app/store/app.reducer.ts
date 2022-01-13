/**
 * Counter Reducer
 */
import { Reducer, Action } from 'redux';
import { AppState, UserDetail } from './app.state';
import * as UserActions from './app.actions';

const initialState: AppState = {
  IsAuthenticated: true,
  languages: [],
  contenttypes: [],
  locations: [],
  contentproperties: [],
  roles: [],
  contents: [],
  users: [],
  userinroles: [],
  userassignroles: [],
  cptenantusers: [],
  currentuserdetail : {
    id : undefined,
    email : undefined,
    firstname : undefined,
    lastname : undefined,
    rolename : ""
  },
  isLoggedIn : false,
  token : "",
  categories : [],
  contentsreport: []
};

// Create our reducer that will handle changes to the state
export const counterReducer: Reducer<AppState> =
  (state: AppState = initialState, action: Action): AppState => {
    switch (action.type) {

      case UserActions.SET_CURRENTUSERDETAILS:
        if((<UserActions.customAction>action).payload !== null)
        {
          const data: UserDetail = (<UserActions.customAction>action).payload.response.userDTO;
          data.rolename = data.rolename.toUpperCase();
          const intoken: string = (<UserActions.customAction>action).payload.response.token;
          return Object.assign({}, state, { currentuserdetail: data , isLoggedIn : true, token : intoken});
        }
        else{
          let userdetail = {
            id : undefined,
            email : undefined,
            firstname : undefined,
            lastname : undefined,
            rolename : ""
          }
          return Object.assign({}, state, { currentuserdetail: userdetail , isLoggedIn : false, token : ""});
        }


      case UserActions.SETLANGUAGES:
        const inlanguages: any = (<UserActions.SetLAnguagesAction>action).languages;
        return Object.assign({}, state, { languages: inlanguages });

      case UserActions.SETCONTENTTYPES:
        const incontenttypes: any = (<UserActions.SetContentTypesAction>action).contenttypes;
        return Object.assign({}, state, { contenttypes: incontenttypes });

      case UserActions.SETREGIONS:
        const inregions: any = (<UserActions.SetRegionsAction>action).regions;
        return Object.assign({}, state, { regions: inregions });

      case UserActions.SETLOCATIONS:
        const inlocations: any = (<UserActions.SetLocationAction>action).locations;
        return Object.assign({}, state, { locations: inlocations });

      case UserActions.SETCONTENTPROPERTIES:
        const incontentproperties: any = (<UserActions.SetcontentpropertiesAction>action).contentproperties;
        return Object.assign({}, state, { contentproperties: incontentproperties });

      case UserActions.SETROLES:
        const inroles: any = (<UserActions.SetrolesAction>action).roles;
        return Object.assign({}, state, { roles: inroles });

      case UserActions.SETCONTENTS:
        const incontents: any = (<UserActions.SetcontentsAction>action).contents;
        return Object.assign({}, state, { contents: incontents });

      case UserActions.SETUSERS:
        const inusers: any = (<UserActions.SetusersAction>action).users;
        return Object.assign({}, state, { users: inusers });


      case UserActions.SETUSERINROLES:
        const inuserinroles: any = (<UserActions.SetuserinrolesAction>action).userinroles;
        return Object.assign({}, state, { userinroles: inuserinroles });

      case UserActions.SETUSERASSIGNROLES:
        const inuserassignroles: any = (<UserActions.SetuserassignrolesAction>action).userassignroles;
        return Object.assign({}, state, { userassignroles: inuserassignroles });

      case UserActions.SETCPTENANTSUSERS:
        const incptenantusers: any = (<UserActions.SetcptenantusersAction>action).cptenantusers;
        return Object.assign({}, state, { cptenantusers: incptenantusers });

      case UserActions.SETCATEGORIES:
        const incategories: any = (<UserActions.SetCategoriesAction>action).categories;
        return Object.assign({}, state, { categories: incategories });

      case UserActions.SETCONTENTSREPORT:
        const incontentsreport: any = (<UserActions.SetContentsReportAction>action).contentsreport;

        let data = [incontentsreport.readycount, incontentsreport.publishcount , incontentsreport.rejectcount , incontentsreport.expirecount ];
        return Object.assign({}, state, { contentsreport: data });

      default:
        return state;
    }
  };
