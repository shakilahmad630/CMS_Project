package com.vivatech.model.cms;

import org.springframework.web.multipart.MultipartFile;

public class FormDataWithFile {

    public String contentdto;
    public MultipartFile audiofile;
    public MultipartFile previewfile;
    public MultipartFile imagefile;
    public MultipartFile thumbnailimagefile;
    public MultipartFile synopsisfile;
    public MultipartFile lyricsfile;

    public String getContentdto() {
      return contentdto;
    }

    public void setContentdto(String contentdto) {
      this.contentdto = contentdto;
    }

    public MultipartFile getAudiofile() {
      return audiofile;
    }

    public void setAudiofile(MultipartFile audiofile) {
      this.audiofile = audiofile;
    }

    public MultipartFile getPreviewfile() {
      return previewfile;
    }

    public void setPreviewfile(MultipartFile previewfile) {
      this.previewfile = previewfile;
    }

    public MultipartFile getImagefile() {
      return imagefile;
    }

    public void setImagefile(MultipartFile imagefile) {
      this.imagefile = imagefile;
    }

    public MultipartFile getThumbnailimagefile() {
      return thumbnailimagefile;
    }

    public void setThumbnailimagefile(MultipartFile thumbnailimagefile) {
      this.thumbnailimagefile = thumbnailimagefile;
    }

    public MultipartFile getSynopsisfile() {
      return synopsisfile;
    }

    public void setSynopsisfile(MultipartFile synopsisfile) {
      this.synopsisfile = synopsisfile;
    }

    public MultipartFile getLyricsfile() {
      return lyricsfile;
    }

    public void setLyricsfile(MultipartFile lyricsfile) {
      this.lyricsfile = lyricsfile;
    }

}
