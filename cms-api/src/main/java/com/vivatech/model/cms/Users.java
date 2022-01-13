package com.vivatech.model.cms;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity // This tells Hibernate to make a table out of this class
@Table(name="users")
public class Users {
	@Id
    private String id;

    private Integer accessfailedcount;

    private String concurrencystamp;

    private String email;

    private Integer emailconfirmed;

    //private Long facebookid;

    private String firstname;

    private String lastname;

    private Integer lockoutenabled;

    private Date lockoutend;

    private String normalizedemail;

    private String normalizedusername;

    private String passwordhash;

    private String phonenumber;

    private Integer phonenumberconfirmed;

    private String pictureurl;

    private String securitystamp;

    private Integer twofactorenabled;

    private String username;

    private String status;

    private String cpid;

    private String sequenceno="00000";

    public String getId() {
      return id;
    }

    public void setId(String id) {
      this.id = id;
    }

    public Integer getAccessfailedcount() {
      return accessfailedcount;
    }

    public void setAccessfailedcount(Integer accessfailedcount) {
      this.accessfailedcount = accessfailedcount;
    }

    public String getConcurrencystamp() {
      return concurrencystamp;
    }

    public void setConcurrencystamp(String concurrencystamp) {
      this.concurrencystamp = concurrencystamp;
    }

    public String getEmail() {
      return email;
    }

    public void setEmail(String email) {
      this.email = email;
    }

    public Integer getEmailconfirmed() {
      return emailconfirmed;
    }

    public void setEmailconfirmed(Integer emailconfirmed) {
      this.emailconfirmed = emailconfirmed;
    }

       public String getFirstname() {
      return firstname;
    }

    public void setFirstname(String firstname) {
      this.firstname = firstname;
    }

    public String getLastname() {
      return lastname;
    }

    public void setLastname(String lastname) {
      this.lastname = lastname;
    }

    public Integer getLockoutenabled() {
      return lockoutenabled;
    }

    public void setLockoutenabled(Integer lockoutenabled) {
      this.lockoutenabled = lockoutenabled;
    }

    public Date getLockoutend() {
      return lockoutend;
    }

    public void setLockoutend(Date lockoutend) {
      this.lockoutend = lockoutend;
    }

    public String getNormalizedemail() {
      return normalizedemail;
    }

    public void setNormalizedemail(String normalizedemail) {
      this.normalizedemail = normalizedemail;
    }

    public String getNormalizedusername() {
      return normalizedusername;
    }

    public void setNormalizedusername(String normalizedusername) {
      this.normalizedusername = normalizedusername;
    }

    public String getPasswordhash() {
      return passwordhash;
    }

    public void setPasswordhash(String passwordhash) {
      this.passwordhash = passwordhash;
    }

    public String getPhonenumber() {
      return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
      this.phonenumber = phonenumber;
    }

    public Integer getPhonenumberconfirmed() {
      return phonenumberconfirmed;
    }

    public void setPhonenumberconfirmed(Integer phonenumberconfirmed) {
      this.phonenumberconfirmed = phonenumberconfirmed;
    }

    public String getPictureurl() {
      return pictureurl;
    }

    public void setPictureurl(String pictureurl) {
      this.pictureurl = pictureurl;
    }

    public String getSecuritystamp() {
      return securitystamp;
    }

    public void setSecuritystamp(String securitystamp) {
      this.securitystamp = securitystamp;
    }

    public Integer getTwofactorenabled() {
      return twofactorenabled;
    }

    public void setTwofactorenabled(Integer twofactorenabled) {
      this.twofactorenabled = twofactorenabled;
    }

    public String getUsername() {
      return username;
    }

    public void setUsername(String username) {
      this.username = username;
    }

    public String getStatus() {
      return status;
    }

    public void setStatus(String status) {
      this.status = status;
    }


    public String getCpid() {
      return cpid;
    }

    public void setCpid(String cpid) {
      this.cpid = cpid;
    }

    public String getSequenceno() {
      return sequenceno;
    }

    public void setSequenceno(String sequenceno) {
      this.sequenceno = sequenceno;
    }

}
