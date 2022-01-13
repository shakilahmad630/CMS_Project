package com.vivatech.model.cms;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class UserassignrolesIdentity implements Serializable {
    static final float serialVersionUID = 1234567;

    private String userid;

  	private String contenttypeid;

    private String locationid;

    public UserassignrolesIdentity(){

    }

    public UserassignrolesIdentity(String userid, String contenttypeid, String locationid) {
        this.userid = userid;
        this.contenttypeid = contenttypeid;
        this.locationid = locationid;
    }

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getLocationid() {
		return locationid;
	}

	public void setLocationid(String locationid) {
		this.locationid = locationid;
	}

    public String getContenttypeid() {
      return contenttypeid;
    }

    public void setContenttypeid(String contenttypeid) {
      this.contenttypeid = contenttypeid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserassignrolesIdentity that = (UserassignrolesIdentity) o;

        if (!userid.equals(that.userid)) return false;
        if (!locationid.equals(that.locationid)) return false;
        return contenttypeid.equals(that.contenttypeid);
    }

    @Override
    public int hashCode() {
        int result = userid.hashCode();
        result = 31 * result + contenttypeid.hashCode() + locationid.hashCode();
        return result;
    }
}
