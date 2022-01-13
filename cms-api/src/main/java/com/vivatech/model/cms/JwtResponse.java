package com.vivatech.model.cms;

import java.io.Serializable;

public class JwtResponse implements Serializable {

	private static final long serialVersionUID = -8091879091924046844L;
	private final String jwttoken;
	private final UserDTO userDTO;
	private final String error;

	public JwtResponse(String jwttoken, UserDTO userDTO, String error) {
		this.jwttoken = jwttoken;
		this.userDTO = userDTO;
		this.error = error;
	}

	public String getToken() {
		return this.jwttoken;
	}

	public String getError() {
		return this.error;
	}

	public UserDTO getUSerDTO() {
		return this.userDTO;
	}
}
