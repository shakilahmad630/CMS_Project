package com.vivatech.model.cms;

import javax.persistence.Entity;
import javax.persistence.EmbeddedId;
import javax.persistence.Table;

@Entity // This tells Hibernate to make a table out of this class
@Table(name="userassignroles")
public class Userassignroles {

	@EmbeddedId
	UserassignrolesIdentity userassignrolesIdentity;

    private String operation;

	public UserassignrolesIdentity getUserassignrolesIdentity() {
		return userassignrolesIdentity;
	}

	public void setUserassignrolesIdentity(UserassignrolesIdentity userassignrolesIdentity) {
		this.userassignrolesIdentity = userassignrolesIdentity;
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}
}
