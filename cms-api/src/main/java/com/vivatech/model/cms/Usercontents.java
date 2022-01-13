package com.vivatech.model.cms;

import javax.persistence.Entity;
import javax.persistence.EmbeddedId;
import javax.persistence.Table;


@Entity // This tells Hibernate to make a table out of this class
@Table(name="usercontents")
public class Usercontents {

	@EmbeddedId
	private UsercontentsIdentity usercontentsIdentity;

	public UsercontentsIdentity getUsercontentsIdentity() {
		return usercontentsIdentity;
	}

	public void setUsercontentsIdentity(UsercontentsIdentity inusercontentsIdentity) {
		this.usercontentsIdentity = inusercontentsIdentity;
	}

	public Usercontents()
	{

	}

	public Usercontents(UsercontentsIdentity usercontentsIdentity)
	{
		this.usercontentsIdentity = usercontentsIdentity;

	}

}
