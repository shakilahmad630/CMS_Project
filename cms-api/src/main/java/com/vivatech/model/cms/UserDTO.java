package com.vivatech.model.cms;

public class UserDTO {
  private String id = "";
	private String username;
  private String password;
  private String email;
  private String firstname;
  private String lastname;
  private String phonenumber;
  private String status;
  private String rolename;
  private String associateduserid = "";

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

    public String getEmail() {
      return email;
    }

    public void setEmail(String email) {
      this.email = email;
    }

    public String getFirstname() {
      return firstname;
    }

    public void setFirstname(String firstname) {
      this.firstname = firstname;
    }

    public String getLastname() {
      return lastname;
    }

    public void setLastname(String lastname) {
      this.lastname = lastname;
    }

    public String getPhonenumber() {
      return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
      this.phonenumber = phonenumber;
    }

    public String getStatus() {
      return status;
    }

    public void setStatus(String status) {
      this.status = status;
    }

    public String getRolename() {
      return rolename;
    }

    public void setRolename(String rolename) {
      this.rolename = rolename;
    }

    public String getPassword() {
      return password;
    }

    public void setPassword(String password) {
      this.password = password;
    }

    public String getAssociateduserid() {
      return associateduserid;
    }

    public void setAssociateduserid(String associateduserid) {
      this.associateduserid = associateduserid;
    }

    public String getId() {
      return id;
    }

    public void setId(String id) {
      this.id = id;
    }


}
