package com.vivatech.controller.cms;

import com.vivatech.repository.cms.ContenttypesRepository;
import com.vivatech.repository.cms.ContentpropertiesRepository;
import com.vivatech.repository.cms.UsercontentsRepository;
import com.vivatech.repository.cms.ContentsRepository;
import com.vivatech.repository.cms.LocationsRepository;
import com.vivatech.repository.cms.LanguagesRepository;
import com.vivatech.config.Response;
import com.vivatech.model.cms.BulkFromDataWithFile;
import com.vivatech.model.cms.Bulkcontent;
import com.vivatech.model.cms.Contentproperties;
import com.vivatech.model.cms.Contents;
import com.vivatech.model.cms.Usercontents;
import com.vivatech.model.cms.UsercontentsIdentity;
import com.vivatech.model.cms.Users;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import static com.sun.corba.se.impl.util.Utility.printStackTrace;
import com.vivatech.model.cms.ContentDTO;
import com.vivatech.model.cms.Contenttypes;
import com.vivatech.repository.cms.UsersRepository;
import com.vivatech.storage.StorageService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.util.StringUtils;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller // This means that this class is a Controller
@RequestMapping(path = "/upload") // This means URL's start with /demo (after Application path)
public class UploadController {

    @Autowired // This means to get the bean called LanguagesRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private LanguagesRepository languagesRepository;

    @Autowired // This means to get the bean called locationRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private LocationsRepository locationRepository;

    @Autowired // This means to get the bean called ContenttypesRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private ContenttypesRepository contenttypesRepository;

    @Autowired // This means to get the bean called contentsRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private ContentsRepository contentsRepository;

    @Autowired // This means to get the bean called contentsRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private UsercontentsRepository usercontentsRepository;

    @Autowired // This means to get the bean called contentsRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private ContentpropertiesRepository contentpropertiesRepository;

    @Autowired // This means to get the bean called contentsRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private UsersRepository usersRepository;

    @Autowired // This means to get the bean called StorageService
    // Which is auto-generated by Spring, we will use it to handle the data
    private StorageService storageService;

    private static final Logger logger = LoggerFactory.getLogger(UploadController.class);

    // @GetMapping("/")
    // public String index() {
    // return "index";
    // }
    @PostMapping("/bulkupload")
    public @ResponseBody Response uploadCSVFile(@ModelAttribute BulkFromDataWithFile bulkFormDataWithFile) {

        // validate file
        MultipartFile file = bulkFormDataWithFile.getCsvfile();
        String userid = bulkFormDataWithFile.userid;

        if (file.isEmpty()) {
            // model.addAttribute("message", "Please select a CSV file to upload.");
            // model.addAttribute("status", false);
        } else {
            // parse CSV file to create a list of `User` objects
            try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {

                // create csv bean reader
                CsvToBean<Bulkcontent> csvToBean = new CsvToBeanBuilder(reader).withType(Bulkcontent.class)
                        .withIgnoreLeadingWhiteSpace(true).build();

                // convert `CsvToBean` object to list of users
                List<Bulkcontent> bulkcontents = csvToBean.parse();

                logger.info("size : " + bulkcontents.size());
                logger.info(bulkcontents.get(0).toString());

                // save users in DB?
                // String userid = "";
                String lastSongid = addContentList(bulkcontents, userid, bulkFormDataWithFile);
                String CPid = lastSongid.substring(4, 7);
                String lastSequenceno = lastSongid.substring(9, 14);

                // logger.info("lastSequenceno : " + lastSequenceno);
                // save users list on model
                // model.addAttribute("users", bulkcontents);
                // model.addAttribute("status", true);
                // Save the file
                String contenttype = bulkcontents.size() > 0 ? bulkcontents.get(0).getContenttype() : "";

                String filename = StringUtils.cleanPath(file.getOriginalFilename());
                if (contenttype.toLowerCase().contains("radio")) {// assuming mix content of radio and crbt is not
                                                                  // added.
                    storageService.store(file, userid + File.separator + lastSequenceno + "_" + filename);
                } else {
                    storageService.store(file,
                            CPid + File.separator + userid + File.separator + lastSequenceno + "_" + filename);
                }

            } catch (Exception ex) {
                // model.addAttribute("message", "An error occurred while processing the CSV
                // file." + ex.getMessage());
                // model.addAttribute("status", false);
                ex.printStackTrace();
                return new Response("", ex.getMessage());
            }
        }

        return new Response("SUCCESS", "");
    }

    String addContentList(List<Bulkcontent> bulkcontents, String userid, BulkFromDataWithFile bulkFormDataWithFile) {
        List<Contents> contents = new ArrayList<Contents>();
        List<Contentproperties> contentproperties = new ArrayList<Contentproperties>();
        List<Usercontents> usercontents = new ArrayList<Usercontents>();

        String CPid = "";
        String newSongId = "";

        for (Bulkcontent obj : bulkcontents) {

            UUID uuid = UUID.randomUUID();
            Contents oContents = prepareContentsObj(uuid.toString(), obj);
            contents.add(oContents);

            // Contentproperties
            Contentproperties oContentproperties = prepareContentpropertiesObj(uuid.toString(), userid, obj);
            contentproperties.add(oContentproperties);

            // Usercontents
            Usercontents ousercontents = prepareUsercontentsObj(userid, uuid.toString());
            usercontents.add(ousercontents);

            // save files
            newSongId = oContentproperties.getSongid();
            CPid = newSongId.substring(4, 7);
            String contenttype = obj.getContenttype();

            // // audio file
            // logger.info("start file writing for: " + newSongId);
            Integer contenttypeid = Integer.parseInt(oContents.getContenttypeid());
            String audioext = "_audio.mp3";
            String previewaudioext = "_previewaudio.mp3";
            if ((contenttypeid >= 4 && contenttypeid <= 7)) {// radio content types
                audioext = ".wav";
                previewaudioext = "_preview.wav";

                MultipartFile audiofile = getfile(bulkFormDataWithFile.audiofile, obj.getAudiofile());
                logger.info("audio" + audiofile.getOriginalFilename());
                storageService.store(audiofile, contenttype + File.separator + userid + File.separator + newSongId
                        + File.separator + newSongId + audioext);

                // logger.info("start file writing for previewfile: ");
                // // preview audio file
                MultipartFile previewfile = getfile(bulkFormDataWithFile.previewfile, obj.getPreview());
                logger.info("audio" + previewfile.getOriginalFilename());
                storageService.store(previewfile, contenttype + File.separator + userid + File.separator + newSongId
                        + File.separator + newSongId + previewaudioext);

            } else {

                MultipartFile audiofile = getfile(bulkFormDataWithFile.audiofile, obj.getAudiofile());
                logger.info("audio" + audiofile.getOriginalFilename());
                storageService.store(audiofile, CPid + File.separator + userid + File.separator + newSongId
                        + File.separator + newSongId + audioext);

                // logger.info("start file writing for previewfile: ");
                // // preview audio file
                MultipartFile previewfile = getfile(bulkFormDataWithFile.previewfile, obj.getPreview());
                logger.info("audio" + previewfile.getOriginalFilename());
                storageService.store(previewfile, CPid + File.separator + userid + File.separator + newSongId
                        + File.separator + newSongId + previewaudioext);

                // // image file
                MultipartFile imagefile = getfile(bulkFormDataWithFile.imagefile, obj.getImagefile());
                storageService.store(imagefile, CPid + File.separator + userid + File.separator + newSongId
                        + File.separator + newSongId + "_image.jpg");

                // // thumbnail image file
                MultipartFile thumbnailimagefile = getfile(bulkFormDataWithFile.thumbnailimagefile,
                        obj.getThumbnailimage());
                storageService.store(thumbnailimagefile, CPid + File.separator + userid + File.separator + newSongId
                        + File.separator + newSongId + "_thumbnailimage.jpg");

                // // synopsis file
                MultipartFile synopsisfile = getfile(bulkFormDataWithFile.synopsisfile, obj.getSynopsistxt());
                storageService.store(synopsisfile, CPid + File.separator + userid + File.separator + newSongId
                        + File.separator + newSongId + "_synopsis.txt");

                // // Lyrics file
                MultipartFile lyricsfile = getfile(bulkFormDataWithFile.lyricsfile, obj.getLyricstxt());
                storageService.store(lyricsfile, CPid + File.separator + userid + File.separator + newSongId
                        + File.separator + newSongId + "_lyrics.txt");
            }
        }

        // save in DB
        contentsRepository.saveAll(contents);
        contentpropertiesRepository.saveAll(contentproperties);
        usercontentsRepository.saveAll(usercontents);

        return newSongId;
    }

    Contents prepareContentsObj(String id, Bulkcontent obj) {
        Contents n = new Contents();
        n.setId(id);// set unique id

        String languageid = languagesRepository.findByLanguage(obj.getLanguage()).getId();
        n.setLanguageid(languageid);

        String contenttypeid = contenttypesRepository.findByType(obj.getContenttype()).getId();
        n.setContenttypeid(contenttypeid);

        String locationid = locationRepository.findByName(obj.getLocation()).getId();
        n.setLocationid(locationid);

        return n;
    }

    LocalDateTime formatDateTime(String datestring) {
        if (!datestring.contains("T")) {
            datestring += "T00:00:00";
        } else if (datestring.contains(" ")) {
            datestring.replace(" ", "T");
        }

        return LocalDateTime.parse(datestring);
    }

    Contentproperties prepareContentpropertiesObj(String id, String userid, Bulkcontent obj) {
        Contentproperties n = new Contentproperties();
        n.setId(id);// set unique id
        n.setSongname(obj.getSongname());
        n.setAlbumname(obj.getAlbumname());
        n.setSingername(obj.getSingername());
        n.setSongwriter(obj.getSongwriter());
        n.setMusicdirector(obj.getMusicdirector());
        n.setMusiclabel(obj.getMusiclabel());
        n.setProducername(obj.getProducername());
        n.setPublishername(obj.getPublishername());
        n.setDescription(obj.getDescription());
        n.setContentlanguage(obj.getContentlanguage());
        n.setCopyright(obj.getCopyright());
        n.setYearofrelease(obj.getYearofrelease());
        n.setCopyrightfrom(formatDateTime(obj.getCopyrightfrom()));
        n.setCopyrightto(formatDateTime(obj.getCopyrightto()));
        n.setCpcategory1(obj.getCpcategory1());
        // n.setSynopsistxt(obj.getSynopsistxt());
        // n.setLyricstxt(obj.getLyricstxt());
        // n.setAudiofile(obj.getAudiofile());
        // n.setPreview(obj.getPreview());
        // n.setImagefile(obj.getImagefile());
        // n.setThumbnailimage(obj.getThumbnailimage());
        n.setCpcategory2(obj.getCpcategory2());
        n.setCpcategory3(obj.getCpcategory3());
        n.setCpcategory4(obj.getCpcategory4());
        n.setContentstatus(obj.getContentstatus());
        n.setStarttime(obj.getStarttime());
        n.setEndtime(obj.getEndtime());

        String locationid = locationRepository.findByName(obj.getLocation()).getId();
        String newSongid;
        if (obj.getContenttype().toLowerCase().contains("radio")) {
            newSongid = getNewSongIdForRadioTypes(obj.getContenttype(), LocalDateTime.parse(obj.getCopyrightfrom()),
                    LocalDateTime.parse(obj.getCopyrightto()), obj.getStarttime(), obj.getEndtime());

        } else {
            newSongid = getNewSongId(userid, obj.getContentlanguage(), locationid, obj.getYearofrelease());
        }

        n.setSongid(newSongid);
        n.setSongstatus(obj.getSongstatus());
        // n.setTonetag(obj.getTonetag());

        String CPid = newSongid.substring(4, 7);
        String Tonetag = CPid + newSongid.substring(9, 14);

        String contenttype = obj.getContenttype();

        if (contenttype.toLowerCase().contains("radio")) {
            n.setAudiofile(contenttype + File.separator + userid + File.separator + newSongid + File.separator
                    + newSongid + ".wav");
            n.setPreview(contenttype + File.separator + userid + File.separator + newSongid + File.separator + newSongid
                    + "_preview.wav");
            Tonetag = contenttype + newSongid.substring(9, 14);
        } else {
            n.setAudiofile(CPid + File.separator + userid + File.separator + newSongid + File.separator + newSongid
                    + "_audio.mp3");
            n.setPreview(CPid + File.separator + userid + File.separator + newSongid + File.separator + newSongid
                    + "_previewaudio.mp3");
            n.setImagefile(CPid + File.separator + userid + File.separator + newSongid + File.separator + newSongid
                    + "_image.jpg");
            n.setThumbnailimage(CPid + File.separator + userid + File.separator + newSongid + File.separator + newSongid
                    + "_thumbnailimage.jpg");
            n.setSynopsistxt(CPid + File.separator + userid + File.separator + newSongid + File.separator + newSongid
                    + "_synopsis.txt");
            n.setLyricstxt(CPid + File.separator + userid + File.separator + newSongid + File.separator + newSongid
                    + "_lyrics.txt");
        }

        n.setTonetag(Tonetag);

        return n;
    }

    String getContenttype(String contenttypeid) {
        String contenttype = "";
        Optional<Contenttypes> oContenttypes = contenttypesRepository.findById(contenttypeid);
        if (oContenttypes.isPresent()) {
            contenttype = oContenttypes.get().getType();
        }

        return contenttype;
    }

    String getNewSongIdForRadioTypes(String contenttype, LocalDateTime startdate, LocalDateTime enddate,
            String starttime, String endtime) {

        String songId = "";

        songId = contenttype + "_" + getFormattedDateString(startdate) + "_" + getFormattedDateString(enddate);

        if (starttime != null) {
            songId += ("_" + starttime.replace(":", ""));
        }

        if (endtime != null) {
            songId += ("_" + endtime.replace(":", ""));
        }

        return songId;

    }

    String getFormattedDateString(LocalDateTime startdate) {
        String formattedDate = startdate.format(DateTimeFormatter.ofPattern("dd-MM-yy"));
        formattedDate.replaceAll("-", "");

        return formattedDate;

    }

    Usercontents prepareUsercontentsObj(String userid, String contentid) {
        Usercontents n = new Usercontents();
        n.setUsercontentsIdentity(new UsercontentsIdentity(userid, contentid));
        return n;
    }

    String getNewSongId(String userid, String contentLanguage, String locationId, String yearofrelease) {

        List<Object[]> userroleslist = usersRepository.getrolenameAndDetailsforUserid(userid);
        logger.info("getNewSongId : userroleslist " + userroleslist.size());
        Object[] userroles = userroleslist.get(0);
        logger.info("getNewSongId :  userroles" + userroles.length);
        String rolename = (String) userroles[0];
        String cpId = "";
        String songId = "";
        String sequenceno = "";
        String CPUserid = "";

        if (rolename.equalsIgnoreCase("cptenant")) {
            logger.info("getNewSongId :  rolename" + rolename.toLowerCase());
            CPUserid = userid;
            cpId = (String) userroles[1];
            sequenceno = (String) userroles[2];

        } else {// cpuser
            logger.info("getNewSongId 2:  rolename" + rolename.toLowerCase());
            List<Object[]> userdetails = usersRepository.getCPId(userid);
            Object[] userdetail = userdetails.get(0);

            cpId = (String) userdetail[0];

            sequenceno = (String) userdetail[1];
            CPUserid = (String) userdetail[2];
        }

        Integer seqintvalue = Integer.parseInt(sequenceno);
        seqintvalue++;
        sequenceno = String.format("%05d", seqintvalue);

        logger.info("getNewSongId : " + sequenceno);

        updateSequencenoforCPid(CPUserid, sequenceno);

        String contentlanuageId = getContentLanguageId(contentLanguage);

        songId = contentlanuageId + locationId + cpId + yearofrelease.substring(2) + sequenceno;

        return songId;

    }

    String getContentLanguageId(String contentLanguage) {
        String contentlanguageId = "00";
        switch (contentLanguage.toLowerCase()) {
        case "english":
            contentlanguageId = "01";
            break;
        case "hindi":
            contentlanguageId = "02";
            break;
        case "arabic":
            contentlanguageId = "03";
            break;
        case "spanish":
            contentlanguageId = "04";
            break;
        case "swedish":
            contentlanguageId = "05";
            break;
        case "corsican":
            contentlanguageId = "06";

        default:
            break;
        }

        return contentlanguageId;
    }

    void updateSequencenoforCPid(String cpuserid, String newSequenceno) {
        Optional<Users> users = usersRepository.findById(cpuserid);
        if (users != null) {
            Users cpuser = users.get();
            cpuser.setSequenceno(newSequenceno);

            usersRepository.save(cpuser);
        }
    }

    MultipartFile getfile(MultipartFile[] files, String filename) {

        for (MultipartFile multipartFile : files) {
            if (multipartFile.getOriginalFilename().equalsIgnoreCase(filename)) {
                return multipartFile;
            }
        }

        return null;

    }
}
