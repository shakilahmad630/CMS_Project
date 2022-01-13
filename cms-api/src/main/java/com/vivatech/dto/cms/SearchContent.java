/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.vivatech.dto.cms;

/**
 *
 * @author KALAM
 */
public class SearchContent {
    private String userid;
    private String languageid;
    private String contenttypeid;
    private String contentstatus;

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getLanguageid() {
        return languageid;
    }

    public void setLanguageid(String languageid) {
        this.languageid = languageid;
    }

    public String getContenttypeid() {
        return contenttypeid;
    }

    public void setContenttypeid(String contenttypeid) {
        this.contenttypeid = contenttypeid;
    }

    public String getContentstatus() {
        return contentstatus;
    }

    public void setContentstatus(String contentstatus) {
        this.contentstatus = contentstatus;
    }           

}
