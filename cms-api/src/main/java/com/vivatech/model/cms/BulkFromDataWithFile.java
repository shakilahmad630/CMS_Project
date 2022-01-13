package com.vivatech.model.cms;

import org.springframework.web.multipart.MultipartFile;

public class BulkFromDataWithFile {
  public String userid;
  public MultipartFile csvfile;
  public MultipartFile[] audiofile;
  public MultipartFile[] previewfile;
  public MultipartFile[] imagefile;
  public MultipartFile[] thumbnailimagefile;
  public MultipartFile[] synopsisfile;
  public MultipartFile[] lyricsfile;

  public String getUserid() {
    return userid;
  }

  public void setUserid(String userid) {
    this.userid = userid;
  }

  public MultipartFile getCsvfile() {
    return csvfile;
  }

  public void setCsvfile(MultipartFile csvfile) {
    this.csvfile = csvfile;
  }

  public MultipartFile[] getAudiofile() {
    return audiofile;
  }

  public void setAudiofile(MultipartFile[] audiofile) {
    this.audiofile = audiofile;
  }

  public MultipartFile[] getPreviewfile() {
    return previewfile;
  }

  public void setPreviewfile(MultipartFile[] previewfile) {
    this.previewfile = previewfile;
  }

  public MultipartFile[] getImagefile() {
    return imagefile;
  }

  public void setImagefile(MultipartFile[] imagefile) {
    this.imagefile = imagefile;
  }

  public MultipartFile[] getThumbnailimagefile() {
    return thumbnailimagefile;
  }

  public void setThumbnailimagefile(MultipartFile[] thumbnailimagefile) {
    this.thumbnailimagefile = thumbnailimagefile;
  }

  public MultipartFile[] getSynopsisfile() {
    return synopsisfile;
  }

  public void setSynopsisfile(MultipartFile[] synopsisfile) {
    this.synopsisfile = synopsisfile;
  }

  public MultipartFile[] getLyricsfile() {
    return lyricsfile;
  }

  public void setLyricsfile(MultipartFile[] lyricsfile) {
    this.lyricsfile = lyricsfile;
  }

}
