import {
  Action,
  ActionCreator
} from 'redux';
import { UserDetail } from './app.state';

//0
export interface customAction extends Action{
 payload : any
} 

//1
export const SET_CURRENTUSERDETAILS = 'Set Current User Details';
export const setCurrentUserDetails: ActionCreator<customAction> =
  (data : any) => ({
    type: SET_CURRENTUSERDETAILS,
    payload: data
  });

//2
export const SETLANGUAGES = 'Set LANGUAGES';
export interface SetLAnguagesAction extends Action {
  languages: any;
}
export const setLanguages: ActionCreator<SetLAnguagesAction> =
  (inlanguages) => ({
    type: SETLANGUAGES,
    languages: inlanguages
  });

//3
export const SETCONTENTTYPES = 'Set CONTENTTYPES';
export interface SetContentTypesAction extends Action {
  contenttypes: any;
}
export const setContentTypes: ActionCreator<SetContentTypesAction> =
  (incontenttypes) => ({
    type: SETCONTENTTYPES,
    contenttypes: incontenttypes
  });

//4
export const SETREGIONS = 'Set REGIONS';
export interface SetRegionsAction extends Action {
  regions: any;
}
export const setRegions: ActionCreator<SetRegionsAction> =
  (inregions) => ({
    type: SETREGIONS,
    regions: inregions
  })

//5
export const SETLOCATIONS = 'Set LOCATIONS';
export interface SetLocationAction extends Action {
  locations: any;
}
export const setLocations: ActionCreator<SetLocationAction> =
  (inlocations) => ({
    type: SETLOCATIONS,
    locations: inlocations
  })

//6
export const SETCONTENTPROPERTIES = 'Set CONTENTPROPERTIES ';
export interface SetcontentpropertiesAction extends Action {
  contentproperties: any;
}
export const setContentProperties: ActionCreator<SetcontentpropertiesAction> =
  (incontentproperties) => ({
    type: SETCONTENTPROPERTIES,
    contentproperties: incontentproperties
  })

//7
export const SETROLES = 'Set ROLES ';
export interface SetrolesAction extends Action {
  roles: any;
}
export const setRoles: ActionCreator<SetrolesAction> =
  (inroles) => ({
    type: SETROLES,
    roles: inroles
  })

//8
export const SETCONTENTS = 'Set CONTENTS  ';
export interface SetcontentsAction extends Action {
  contents: any;
}
export const setContents: ActionCreator<SetcontentsAction> =
  (incontents) => ({
    type: SETCONTENTS,
    contents: incontents
  })

//9
export const SETUSERS = 'Set USERS  ';
export interface SetusersAction extends Action {
  users: any;
}
export const setUsers: ActionCreator<SetusersAction> =
  (inusers) => ({
    type: SETUSERS,
    users: inusers
  })

//10
export const SETUSERINROLES = 'Set USERINROLES  ';
export interface SetuserinrolesAction extends Action {
  userinroles: any;
}
export const setUserinroles: ActionCreator<SetuserinrolesAction> =
  (inuserinroles) => ({
    type: SETUSERINROLES,
    userinroles: inuserinroles
  })

//11
export const SETUSERASSIGNROLES = 'Set USERASSIGNROLES  ';
export interface SetuserassignrolesAction extends Action {
  userassignroles: any;
}
export const setUserassignroles: ActionCreator<SetuserassignrolesAction> =
  (inuserassignroles) => ({
    type: SETUSERASSIGNROLES,
    userassignroles: inuserassignroles
  })

//12
export const SETCPTENANTSUSERS = 'Set CPTENANTSUSERS   ';
export interface SetcptenantusersAction extends Action {
  cptenantusers: any;
}
export const setCptenantusers: ActionCreator<SetcptenantusersAction> =
  (incptenantusers) => ({
    type: SETCPTENANTSUSERS,
    cptenantusers: incptenantusers
  })  

  //13
export const SETCATEGORIES = 'Set Categories   ';
export interface SetCategoriesAction extends Action {
  categories: any;
}
export const setCategories: ActionCreator<SetCategoriesAction> =
  (incategories) => ({
    type: SETCATEGORIES,
    categories: incategories
  })
  
  //14
export const SETCONTENTSREPORT = 'Set Contents Report';
export interface SetContentsReportAction extends Action {
  contentsreport: any;
}
export const setContentsreport: ActionCreator<SetContentsReportAction> =
  (incontentsreport) => ({
    type: SETCONTENTSREPORT,
    contentsreport: incontentsreport
  })
  
//14
export const SETCONTENTSCREATEDSTATS = 'Set Contents Created';
export interface SetContentsCreatedStatsAction extends Action {
  stats: any;
}
export const setContentscreatedstats: ActionCreator<SetContentsCreatedStatsAction> =
  (instats) => ({
    type: SETCONTENTSCREATEDSTATS,
    stats: instats
  })