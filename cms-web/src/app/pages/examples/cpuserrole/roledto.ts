export interface Role {
  userid?: string;
  // // name: string;
  // // flag: string;
  // // area: number;
  // // population: number;
  // Loginid : string;
  // Status : string;
  // Name : string;
  // Contactno : string;
  // Emailid : string;  
  contenttype?: string;
  location?: string;
  operation?: string;
  contenttypeid?: string;
  locationid?: string;
}

export interface UserAssignRole {
  userassignrolesIdentity : UserAssignRolesIdentity
  operation?: string;

}

export interface UserAssignRolesIdentity{
  userid?: string;
  contenttypeid?: string;
  locationid?: string;
}

