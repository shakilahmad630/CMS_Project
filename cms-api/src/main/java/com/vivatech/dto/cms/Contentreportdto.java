package com.vivatech.dto.cms;

//-----------DASHBOARD----------

public class Contentreportdto {
  private Integer readycount;

  private Integer publishcount;

  private Integer rejectcount;

  private Integer expirecount;

  public Integer getReadycount() {
    return readycount;
  }

  public void setReadycount(Integer readycount) {
    this.readycount = readycount;
  }

  public Integer getPublishcount() {
    return publishcount;
  }

  public void setPublishcount(Integer publishcount) {
    this.publishcount = publishcount;
  }

  public Integer getRejectcount() {
    return rejectcount;
  }

  public void setRejectcount(Integer rejectcount) {
    this.rejectcount = rejectcount;
  }

  public Integer getExpirecount() {
    return expirecount;
  }

  public void setExpirecount(Integer expirecount) {
    this.expirecount = expirecount;
  }


}
