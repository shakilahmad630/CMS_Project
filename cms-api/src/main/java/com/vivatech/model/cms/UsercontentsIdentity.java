package com.vivatech.model.cms;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class UsercontentsIdentity implements Serializable {
    static final float serialVersionUID = 123456;

	private String userid;

    private String contentid;

    public UsercontentsIdentity(){
        
    }
    
    public UsercontentsIdentity(String userid, String contentid) {
        this.userid = userid;
        this.contentid = contentid;
    }

    public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getContentid() {
		return contentid;
	}

	public void setContentid(String contentid) {
		this.contentid = contentid;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UsercontentsIdentity that = (UsercontentsIdentity) o;

        if (!userid.equals(that.userid)) return false;
        return contentid.equals(that.contentid);
    }

    @Override
    public int hashCode() {
        int result = userid.hashCode();
        result = 31 * result + contentid.hashCode();
        return result;
    }
}
