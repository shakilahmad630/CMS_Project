package com.vivatech.config;

public class Response {

  String result;
  String error;

  public Response(String inresult, String inError) {
    this.result = inresult;
    this.error = inError;
	}

  public String getResult() {
    return result;
  }

  public void setResult(String result) {
    this.result = result;
  }

  public String getError() {
    return error;
  }

  public void setError(String error) {
    this.error = error;
  }


}
