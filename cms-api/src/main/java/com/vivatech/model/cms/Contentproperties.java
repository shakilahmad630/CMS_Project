package com.vivatech.model.cms;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Id;
import javax.persistence.Table;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity // This tells Hibernate to make a table out of this class
@EntityListeners(AuditingEntityListener.class)
@Table(name = "contentproperties")
public class Contentproperties extends Auditable<String> {

    @Id
    private String id;

    private String songname;

    private String albumname;

    private String singername;

    private String songwriter;

    private String musicdirector;

    private String musiclabel;

    private String producername;

    private String publishername;

    private String description;

    private String contentlanguage;

    private String copyright;

    private String yearofrelease;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime copyrightfrom;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime copyrightto;
    
    private String cpcategory1;

    private String synopsistxt;

    private String lyricstxt;

    private String audiofile;

    private String preview;

    private String imagefile;

    private String thumbnailimage;

    private String cpcategory2;

    private String cpcategory3;

    private String cpcategory4;

    private String contentstatus;

    private String songid;

    private String songstatus;

    private String tonetag;

    private String starttime;

    private String endtime;
    
    private String languageid;

    private String contenttypeid;

    private String locationid;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSongname() {
        return songname;
    }

    public void setSongname(String songname) {
        this.songname = songname;
    }

    public String getAlbumname() {
        return albumname;
    }

    public void setAlbumname(String albumname) {
        this.albumname = albumname;
    }

    public String getSingername() {
        return singername;
    }

    public void setSingername(String singername) {
        this.singername = singername;
    }

    public String getSongwriter() {
        return songwriter;
    }

    public void setSongwriter(String songwriter) {
        this.songwriter = songwriter;
    }

    public String getMusicdirector() {
        return musicdirector;
    }

    public void setMusicdirector(String musicdirector) {
        this.musicdirector = musicdirector;
    }

    public String getMusiclabel() {
        return musiclabel;
    }

    public void setMusiclabel(String musiclabel) {
        this.musiclabel = musiclabel;
    }

    public String getProducername() {
        return producername;
    }

    public void setProducername(String producername) {
        this.producername = producername;
    }

    public String getPublishername() {
        return publishername;
    }

    public void setPublishername(String publishername) {
        this.publishername = publishername;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContentlanguage() {
        return contentlanguage;
    }

    public void setContentlanguage(String contentlanguage) {
        this.contentlanguage = contentlanguage;
    }

    public String getCopyright() {
        return copyright;
    }

    public void setCopyright(String copyright) {
        this.copyright = copyright;
    }

    public String getYearofrelease() {
        return yearofrelease;
    }

    public void setYearofrelease(String yearofrelease) {
        this.yearofrelease = yearofrelease;
    }

    public LocalDateTime getCopyrightfrom() {
        return copyrightfrom;
    }

    public void setCopyrightfrom(LocalDateTime copyrightfrom) {
        this.copyrightfrom = copyrightfrom;
    }

    public LocalDateTime getCopyrightto() {
        return copyrightto;
    }

    public void setCopyrightto(LocalDateTime copyrightto) {
        this.copyrightto = copyrightto;
    }
    
    public String getCpcategory1() {
        return cpcategory1;
    }

    public void setCpcategory1(String cpcategory1) {
        this.cpcategory1 = cpcategory1;
    }

    public String getSynopsistxt() {
        return synopsistxt;
    }

    public void setSynopsistxt(String synopsistxt) {
        this.synopsistxt = synopsistxt;
    }

    public String getLyricstxt() {
        return lyricstxt;
    }

    public void setLyricstxt(String lyricstxt) {
        this.lyricstxt = lyricstxt;
    }

    public String getAudiofile() {
        return audiofile;
    }

    public void setAudiofile(String audiofile) {
        this.audiofile = audiofile;
    }

    public String getPreview() {
        return preview;
    }

    public void setPreview(String preview) {
        this.preview = preview;
    }

    public String getImagefile() {
        return imagefile;
    }

    public void setImagefile(String imagefile) {
        this.imagefile = imagefile;
    }

    public String getThumbnailimage() {
        return thumbnailimage;
    }

    public void setThumbnailimage(String thumbnailimage) {
        this.thumbnailimage = thumbnailimage;
    }

    public String getCpcategory2() {
        return cpcategory2;
    }

    public void setCpcategory2(String cpcategory2) {
        this.cpcategory2 = cpcategory2;
    }

    public String getCpcategory3() {
        return cpcategory3;
    }

    public void setCpcategory3(String cpcategory3) {
        this.cpcategory3 = cpcategory3;
    }

    public String getCpcategory4() {
        return cpcategory4;
    }

    public void setCpcategory4(String cpcategory4) {
        this.cpcategory4 = cpcategory4;
    }

    public String getContentstatus() {
        return contentstatus;
    }

    public void setContentstatus(String contentstatus) {
        this.contentstatus = contentstatus;
    }

    public String getSongid() {
        return songid;
    }

    public void setSongid(String songid) {
        this.songid = songid;
    }

    public String getSongstatus() {
        return songstatus;
    }

    public void setSongstatus(String songstatus) {
        this.songstatus = songstatus;
    }

    public String getTonetag() {
        return tonetag;
    }

    public void setTonetag(String tonetag) {
        this.tonetag = tonetag;
    }

    public String getStarttime() {
        return starttime;
    }

    public void setStarttime(String starttime) {
        this.starttime = starttime;
    }

    public String getEndtime() {
        return endtime;
    }

    public void setEndtime(String endtime) {
        this.endtime = endtime;
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

    public String getLocationid() {
        return locationid;
    }

    public void setLocationid(String locationid) {
        this.locationid = locationid;
    }

}
