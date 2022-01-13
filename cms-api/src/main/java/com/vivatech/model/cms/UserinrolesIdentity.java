package com.vivatech.model.cms;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class UserinrolesIdentity implements Serializable {
    static final float serialVersionUID = 23456;

	private String userid;

    private String roleid;

    public UserinrolesIdentity(){
        
    }
    
    public UserinrolesIdentity(String userid, String roleid) {
        this.userid = userid;
        this.roleid = roleid;
    }

    public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getRoleid() {
		return roleid;
	}

	public void setRoleid(String roleid) {
		this.roleid = roleid;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserinrolesIdentity that = (UserinrolesIdentity) o;

        if (!userid.equals(that.userid)) return false;
        return roleid.equals(that.roleid);
    }

    @Override
    public int hashCode() {
        int result = userid.hashCode();
        result = 31 * result + roleid.hashCode();
        return result;
    }
}
