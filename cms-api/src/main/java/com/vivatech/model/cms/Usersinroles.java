package com.vivatech.model.cms;

import javax.persistence.Entity;
import javax.persistence.EmbeddedId;
import javax.persistence.Table;

@Entity // This tells Hibernate to make a table out of this class
@Table(name="usersinroles")
public class Usersinroles {
	@EmbeddedId
	private UserinrolesIdentity userinrolesIdentity;

	public UserinrolesIdentity getUserinrolesIdentity() {
		return userinrolesIdentity;
	}

	public void setUserinrolesIdentity(UserinrolesIdentity inuserinrolesIdentity) {
		this.userinrolesIdentity = inuserinrolesIdentity;
	}

	public Usersinroles()
	{

	}

	public Usersinroles(UserinrolesIdentity userinrolesIdentity)
	{
		this.userinrolesIdentity = userinrolesIdentity;

	}



}
