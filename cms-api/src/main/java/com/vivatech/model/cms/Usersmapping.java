package com.vivatech.model.cms;

import javax.persistence.Entity;
import javax.persistence.EmbeddedId;
import javax.persistence.Table;

@Entity // This tells Hibernate to make a table out of this class
@Table(name="usersmapping")
public class Usersmapping {

	@EmbeddedId
	private UsermappingIdentity usermappingIdentity;

	public UsermappingIdentity getUsersmappingIdentity() {
		return usermappingIdentity;
	}

	public void setUsersmappingIdentity(UsermappingIdentity inusermappingIdentity) {
		this.usermappingIdentity = inusermappingIdentity;
	}

	public Usersmapping()
	{

	}

	public Usersmapping(UsermappingIdentity usermappingIdentity)
	{
		this.usermappingIdentity = usermappingIdentity;

	}



}
