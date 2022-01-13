package com.vivatech.model.cms;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity // This tells Hibernate to make a table out of this class
@Table(name="roles")
public class Roles {
    @Id
    private String roleid;
    
    private String applicationid;

    private String rolename;

    private String loweredrolename;

    private String description;

    public String getApplicationid() {
        return applicationid;
    }

    public void setApplicationid(String applicationid) {
        this.applicationid = applicationid;
    }

    public String getRoleid() {
        return roleid;
    }

    public void setRoleid(String roleid) {
        this.roleid = roleid;
    }

    public String getRolename() {
        return rolename;
    }

    public void setRolename(String rolename) {
        this.rolename = rolename;
    }

    public String getLoweredrolename() {
        return loweredrolename;
    }

    public void setLoweredrolename(String loweredrolename) {
        this.loweredrolename = loweredrolename;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
