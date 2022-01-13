package com.vivatech.model.cms;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class UsermappingIdentity implements Serializable {
    static final float serialVersionUID = 23456;

	private String puserid;

	private String userid;

    public UsermappingIdentity(){
        
    }
    
    public UsermappingIdentity(String puserid, String userid) {
        this.userid = userid;
        this.puserid = puserid;
    }

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

    public String getPuserid() {
      return puserid;
    }

    public void setPuserid(String puserid) {
      this.puserid = puserid;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UsermappingIdentity that = (UsermappingIdentity) o;

        if (!userid.equals(that.userid)) return false;
        return puserid.equals(that.puserid);
    }

    @Override
    public int hashCode() {
        int result = userid.hashCode();
        result = 31 * result + puserid.hashCode();
        return result;
    }
}
