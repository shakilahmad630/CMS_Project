package com.vivatech.model.cms;

public class UserAssignedRoleDTO {

	private String contenttype;

  private String location;

  private String operation;

  private String contenttypeid;

  private String locationid;

  public String getContenttypeid() {
    return contenttypeid;
  }

  public void setContenttypeid(String contenttypeid) {
    this.contenttypeid = contenttypeid;
  }

  public String getLocationid() {
    return locationid;
  }

  public void setLocationid(String locationid) {
    this.locationid = locationid;
  }
  
  

  public String getContenttype() {
    return contenttype;
  }

  public void setContenttype(String contenttype) {
    this.contenttype = contenttype;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public String getOperation() {
    return operation;
  }

  public void setOperation(String operation) {
    this.operation = operation;
  }

}
