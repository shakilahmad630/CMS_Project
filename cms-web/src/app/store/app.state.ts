/*
 * minimal counter app state
 * 
 * In this case, our app state is simply a single number (the counter). But we
 * put it here because in the future, when our state is more complicated 
 * 
 */

export interface AppState {
  IsAuthenticated : boolean;
  languages : any;
  contenttypes: any;
  locations: any;
  contentproperties: any;
  roles: any;
  contents: any;
  users: any;
  userinroles: any;
  userassignroles: any;
  cptenantusers: any;
  currentuserdetail: UserDetail
  isLoggedIn : boolean,
  token : string;
  categories : any,
  contentsreport : any
};


export interface UserDetail{
  id : string,
  email : string,
  firstname : string,
  lastname : string,
  isLoggedIn? : boolean,
  rolename : string,
  password? : string,
  phonenumber?: string,
  status?: string,
  associateduserid?: string
}
