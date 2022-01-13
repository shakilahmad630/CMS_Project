package com.vivatech.model.cms;

import com.opencsv.bean.CsvBindByName;

public class Bulkcontent {

    @CsvBindByName
    private long id;
    @CsvBindByName
    private String language;
    @CsvBindByName
    private String contenttype;
    @CsvBindByName
    private String location;
    @CsvBindByName
    private String songname;
    @CsvBindByName
    private String albumname;
    @CsvBindByName
    private String singername;
    @CsvBindByName
    private String songwriter;
    @CsvBindByName
    private String musicdirector;
    @CsvBindByName
    private String musiclabel;
    @CsvBindByName
    private String producername;
    @CsvBindByName
    private String publishername;
    @CsvBindByName
    private String description;
    @CsvBindByName
    private String contentlanguage;
    @CsvBindByName
    private String copyright;
    @CsvBindByName
    private String yearofrelease;
    @CsvBindByName
    private String copyrightfrom;
    @CsvBindByName
    private String copyrightto;
    @CsvBindByName
    private String cpcategory1;
    @CsvBindByName
    private String synopsistxt;
    @CsvBindByName
    private String lyricstxt;
    @CsvBindByName
    private String audiofile;
    @CsvBindByName
    private String preview;
    @CsvBindByName
    private String imagefile;
    @CsvBindByName
    private String thumbnailimage;
    @CsvBindByName
    private String cpcategory2;
    @CsvBindByName
    private String cpcategory3;
    @CsvBindByName
    private String cpcategory4;
    @CsvBindByName
    private String contentstatus;
    @CsvBindByName
    private String songid;
    @CsvBindByName
    private String songstatus;
    @CsvBindByName
    private String tonetag;
    @CsvBindByName
    private String starttime;
    @CsvBindByName
    private String endtime;

    public Bulkcontent() {
    }

    public Bulkcontent(long id, String language, String contenttype, String location, String songname, String albumname, String singername, String songwriter, String musicdirector, String musiclabel, String producername, String publishername, String description, String contentlanguage, String copyright, String yearofrelease, String copyrightfrom, String copyrightto, String cpcategory1, String synopsistxt, String lyricstxt, String audiofile, String preview, String imagefile, String thumbnailimage, String cpcategory2, String cpcategory3, String cpcategory4, String contentstatus, String songid, String songstatus, String tonetag, String starttime, String endtime) {
        this.id = id;
        this.language = language;
        this.contenttype = contentstatus;
        this.location = location;
        this.songname = songname;
        this.albumname = albumname;
        this.singername = singername;
        this.songwriter = songwriter;
        this.musicdirector = musicdirector;
        this.musiclabel = musiclabel;
        this.producername = producername;
        this.publishername = publishername;
        this.description = description;
        this.contentlanguage = contentlanguage;
        this.copyright = copyright;
        this.yearofrelease = yearofrelease;
        this.copyrightfrom = copyrightfrom;
        this.copyrightto = copyrightto;
        this.cpcategory1 = cpcategory1;
        this.synopsistxt = synopsistxt;
        this.lyricstxt = lyricstxt;
        this.audiofile = audiofile;
        this.preview = preview;
        this.imagefile = imagefile;
        this.thumbnailimage = thumbnailimage;
        this.cpcategory2 = cpcategory2;
        this.cpcategory3 = cpcategory3;
        this.cpcategory4 = cpcategory4;
        this.contentstatus = contentstatus;
        this.songid = songid;
        this.songstatus = songstatus;
        this.tonetag = tonetag;
        this.starttime = starttime;
        this.endtime = endtime;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getContenttype() {
        return contenttype;
    }

    public void setContenttype(String contenttype) {
        this.contenttype = contenttype;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
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

    public String getCopyrightfrom() {
        return copyrightfrom;
    }

    public void setCopyrightfrom(String copyrightfrom) {
        this.copyrightfrom = copyrightfrom;
    }

    public String getCopyrightto() {
        return copyrightto;
    }

    public void setCopyrightto(String copyrightto) {
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

    @Override
    public String toString() {
        return "Bulkcontent{"
                + "id=" + id
                + ", language='" + language + '\''
                + ", contenttype='" + contenttype + '\''
                + ", location='" + location + '\''
                + ", songname=" + songname + '\''
                + ", albumname=" + albumname + '\''
                + ", singername=" + singername + '\''
                + ", songwriter=" + songwriter + '\''
                + ", musicdirector=" + musicdirector + '\''
                + ", musiclabel=" + musiclabel + '\''
                + ", producername=" + producername + '\''
                + ", publishername=" + publishername + '\''
                + ", description=" + description + '\''
                + ", contentlanguage=" + contentlanguage + '\''
                + ", copyright=" + copyright + '\''
                + ", yearofrelease=" + yearofrelease + '\''
                + ", copyrightfrom=" + copyrightfrom + '\''
                + ", copyrightto=" + copyrightto + '\''
                + ", cpcategory1=" + cpcategory1 + '\''
                + ", synopsistxt=" + synopsistxt + '\''
                + ", lyricstxt=" + lyricstxt + '\''
                + ", audiofile=" + audiofile + '\''
                + ", preview=" + preview + '\''
                + ", imagefile=" + imagefile + '\''
                + ", thumbnailimage=" + thumbnailimage + '\''
                + ", cpcategory2=" + cpcategory2 + '\''
                + ", cpcategory3=" + cpcategory3 + '\''
                + ", cpcategory4=" + cpcategory4 + '\''
                + ", contentstatus=" + contentstatus + '\''
                + ", songid=" + songid + '\''
                + ", songstatus=" + songstatus + '\''
                + ", tonetag=" + tonetag + '\''
                + ", starttime=" + starttime + '\''
                + ", endtime=" + endtime
                + '}';
    }
}
