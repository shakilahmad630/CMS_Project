import { Component, OnInit, Inject, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';
import { AppStore } from 'src/app/store/app.store';
import { Store } from 'redux';
import { AppState } from 'src/app/store/app.state';
import { ContentService } from './managecontent.service';
import { Observable } from 'rxjs';
import { DecimalPipe, Time } from '@angular/common';
import { ContentDetail, ContentTableDto, ContentsDTO, SearchContent } from './contentdto';
import { NgbContentSortableHeader, SortContentEvent } from './sortable.directive';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ROLES } from 'src/app/helpers/Enums';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { fromModel, toModel } from 'src/app/helpers/util';
//import { time } from 'console';

//import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-managecontent',
  templateUrl: './managecontent.component.html',
  styleUrls: ['./managecontent.component.scss'],
  providers: [ContentService, DecimalPipe]
})
export class ManagecontentComponent implements OnInit {
  focus4;
  focus5;
  focus6;
  focus7;
  focus9;
  focus10;
  focus11;
  focus12;
  focus13;
  focus15;
  focus16;
  focus17;
  focus18;
  focus19;
  focus20;
  focus21;
  focus22;
  focus23;
  focus24;
  focus25;
  focus26;
  focus27;
  focus28;
  focus31;
  focus32;
  //table work
  contents$: Observable<ContentTableDto[]>;
  total$: Observable<number>;
  loadfirsttime: boolean = true;
  //
  contentForm: FormGroup;

  @ViewChildren(NgbContentSortableHeader) headers: QueryList<NgbContentSortableHeader>;
  @ViewChild('myModalconfirm') myModalconfirm: ModalDirective;
  //end
  locations = [{ "id": 1, "name": "Dubai" }, { "id": 2, "name": "Kenya" }, { "id": 3, "name": "Somalia" }];
  metadatalanguages = [];
  cpusers = [];
  contenttypes = [];
  contentlanguages = [{ "id": 1, "language": "English" }, { "id": 2, "language": "Hindi" }, { "id": 3, "language": "Arabic" },
  { "id": 4, "language": "Spanish" }, { "id": 5, "language": "Swedish" }, { "id": 6, "language": "Corsican" }];
  songstatuslist = [{ "id": 1, "status": "Active" }, { "id": 2, "status": "Inactive" }];
  contentstatuslist = [{ "id": 1, "status": "READY" }, { "id": 2, "status": "PUBLISHED" }, { "id": 3, "status": "REJECTED" },
  { "id": 4, "status": "EXPIRED" }];
  editcontentstatus = [];

  contentCopy: ContentDetail = {

    userid: "",
    contents: {
      contenttypeid: "",
      id: "",
      languageid: "",
      locationid: ""
    },
    contentproperties:
    {
      albumname: "",
      audiofile: "",
      contentlanguage: "",
      contentstatus: "",
      copyright: "",
      copyrightfrom: "",
      copyrightto: "",
      cpcategory1: "",
      cpcategory2: "",
      cpcategory3: "",
      cpcategory4: "",
      description: "",
      id: "",
      imagefile: "",
      lyricstxt: "",
      musicdirector: "",
      musiclabel: "",
      preview: "",
      producername: "",
      publishername: "",
      singername: "",
      songid: "",
      songname: "",
      songstatus: "",
      songwriter: "",
      synopsistxt: null,
      thumbnailimage: "",
      tonetag: "",
      yearofrelease: "",
      starttime:"",
      endtime:"",
    }

  };

  contentsdetail: ContentDetail[] = [];

  @ViewChild('myModaledit') myModaledit: ModalDirective;
  @ViewChild('myModalinfo') myModalinfo: ModalDirective;
  myModalinfomesg = "";

  audiofilestream = null;
  previewfile = null;
  imagefilestream = null;
  thumbnailimagefile = null;
  synopsisfile = null;
  lyricsfile = null;

  audiofilelabel = "Choose Audio file";
  previewfilelabel = "Choose Preview file";
  imagefilelabel = "Choose Image file";
  thumbnailimagefilelabel = "Choose Thumbnail Image file";
  synopsisfilelabel = "Choose Synopsis Text file";
  lyricsfilelabel = "Choose Lyrics Text file";

  selectedCD: ContentDetail;
  selectedcontent: ContentTableDto;

  // //Search Form
  // selectedLanguageId = "";
  // selectedContentTypeId = "";
  // selectedUserId = "";
  // selectedContentStatus = "";
  // //End

  constructor(public appservice: AppService, private http: HttpClient, @Inject(AppStore) public store: Store<AppState>, public service: ContentService) {
    //table work
    this.contents$ = service.contents$;
    this.total$ = service.total$;
    //table work

    try {
      this.store.subscribe(() => this.updateState());

      this.appservice.getLanguages();
      this.appservice.getContentTypes();
      this.appservice.getLocations();
      this.appservice.getUsers();
      this.setContentStatusBasedRole();
    } catch (error) {
      throw new Error("Authguard::contructor Exception :" + error);

    }
  }

  updateState() {
    try {
      this.metadatalanguages = this.store.getState().languages;
      this.contenttypes = this.store.getState().contenttypes;
      this.locations = this.store.getState().locations;
      this.cpusers = this.store.getState().users;
      this.contentsdetail = this.store.getState().contents;
      this.setDefaultValues();
    } catch (error) {
      throw new Error("Authguard::updateState Exception :" + error);
    }
  }

  ngOnInit() {
    this.loadfirsttime = true;
    this.contentForm = new FormGroup({
      languageid: new FormControl('', [Validators.required]),
      contenttypeid: new FormControl('', [Validators.required]),
      contentstatus: new FormControl('', [Validators.required]),
      locationid: new FormControl('', [Validators.required]),
      contentlanguage: new FormControl('', [Validators.required]),
      songstatus: new FormControl('', [Validators.required]),
      songname: new FormControl('', [Validators.required]),
      albumname: new FormControl(''),
      singername: new FormControl(''),
      songwriter: new FormControl(''),
      musicdirector: new FormControl(''),
      musiclabel: new FormControl(''),
      producername: new FormControl(''),
      publishername: new FormControl(''),
      description: new FormControl(''),
      yearofrelease: new FormControl(''),
      copyright: new FormControl(''),
      copyrightfrom: new FormControl(''),
      copyrightto: new FormControl(''),
      cpcategory1: new FormControl(''),
      cpcategory2: new FormControl(''),
      cpcategory3: new FormControl(''),
      cpcategory4: new FormControl(''),
      audiofile: new FormControl('', [Validators.required]),
      preview: new FormControl('', [Validators.required]),
      imagefile: new FormControl(''),
      thumbnailimage: new FormControl(''),
      synopsistxt: new FormControl(''),
      lyricstxt: new FormControl(''),
      starttime: new FormControl(''),
      endtime: new FormControl('')
    });

  }

  get languageid() { return this.contentForm.get('languageid'); }
  get contenttypeid() { return this.contentForm.get('contenttypeid'); }
  get contentstatus() { return this.contentForm.get('contentstatus'); }
  get locationid() { return this.contentForm.get('locationid'); }
  get contentlanguage() { return this.contentForm.get('contentlanguage'); }
  get songstatus() { return this.contentForm.get('songstatus'); }
  get songname() { return this.contentForm.get('songname'); }
  get albumname() { return this.contentForm.get('albumname'); }
  get singername() { return this.contentForm.get('singername'); }
  get songwriter() { return this.contentForm.get('songwriter'); }
  get musicdirector() { return this.contentForm.get('musicdirector'); }
  get musiclabel() { return this.contentForm.get('musiclabel'); }
  get producername() { return this.contentForm.get('producername'); }
  get publishername() { return this.contentForm.get('publishername'); }
  get description() { return this.contentForm.get('description'); }
  get yearofrelease() { return this.contentForm.get('yearofrelease'); }
  get copyright() { return this.contentForm.get('copyright'); }
  get copyrightfrom() { return this.contentForm.get('copyrightfrom'); }
  get copyrightto() { return this.contentForm.get('copyrightto'); }
  get cpcategory1() { return this.contentForm.get('cpcategory1'); }
  get cpcategory2() { return this.contentForm.get('cpcategory2'); }
  get cpcategory3() { return this.contentForm.get('cpcategory3'); }
  get cpcategory4() { return this.contentForm.get('cpcategory4'); }
  get audiofile() { return this.contentForm.get('audiofile'); }
  get preview() { return this.contentForm.get('preview'); }
  get imagefile() { return this.contentForm.get('imagefile'); }
  get thumbnailimage() { return this.contentForm.get('thumbnailimage'); }
  get synopsistxt() { return this.contentForm.get('synopsistxt'); }
  get lyricstxt() { return this.contentForm.get('lyricstxt'); }
  get starttime() { return this.contentForm.get('starttime'); }
  get endtime() { return this.contentForm.get('endtime'); }

  onSort({ column, direction }: SortContentEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  onDelete() {
    this.myModalconfirm.hide();

    this.appservice.deletecontent(this.selectedcontent.id, (result) => {
      this.myModalinfomesg = (result) ? "Content Deleted" : "Error in deleting content";
      this.myModalinfo.show();
      if (result) {
        this.onSearch();
      }
    });

  }

  showdialog(content: ContentTableDto) {
    this.selectedcontent = content;
    this.myModalconfirm.show();
  }

  onEditContenttype()
  {
    let value = this.contenttypeid.value;
    if((value === "4") || (value === "5") || (value === "6") || (value === "7" ))
    {
      this.editcontentstatus = [{"id" : 2, "status" :"Published"}];

    }
    else{
      this.setContentStatusBasedRole();
    }
  }


  onSave() {

    //if (this.contentForm.valid) 
    {
      let fromdatestring = this.getFormattedDateString(this.copyrightfrom.value);
      let todatestring = this.getFormattedDateString(this.copyrightto.value);
      // let fromtimestring = this.getFormattedTimeString(this.starttime.value);
      // let totimestring = this.getFormattedTimeString(this.endtime.value);

      let contentaddCopy: ContentDetail = {
        userid: this.store.getState().currentuserdetail.id,
        contents: {
          contenttypeid: this.contenttypeid.value,
          id: this.selectedCD.contents.id,
          languageid: this.languageid.value,
          locationid: this.locationid.value
        },
        contentproperties:
        {
          id: this.selectedCD.contentproperties.id,
          albumname: this.albumname.value,
          audiofile: this.audiofile.value,
          contentlanguage: this.getcontentlanguagesValue(this.contentlanguage.value),
          contentstatus: this.getcontentstatuslistValue(this.contentstatus.value),
          copyright: this.copyright.value,
          copyrightfrom: fromdatestring,
          copyrightto: todatestring,
          cpcategory1: this.cpcategory1.value,
          cpcategory2: this.cpcategory2.value,
          cpcategory3: this.cpcategory3.value,
          cpcategory4: this.cpcategory4.value,
          description: this.description.value,
          imagefile: this.imagefile.value,
          lyricstxt: this.lyricstxt.value,
          musicdirector: this.musicdirector.value,
          musiclabel: this.musiclabel.value,
          preview: this.preview.value,
          producername: this.producername.value,
          publishername: this.publishername.value,
          singername: this.singername.value,
          songid: this.selectedCD.contentproperties.songid,
          songname: this.songname.value,
          songstatus: this.songstatus.value  == 1 ? "Active" : "Inactive",
          songwriter: this.songwriter.value,
          synopsistxt: this.synopsistxt.value,
          thumbnailimage: this.thumbnailimage.value,
          tonetag: this.selectedCD.contentproperties.tonetag,
          yearofrelease: this.getYearFromDate(this.yearofrelease.value),
          starttime: toModel(this.starttime.value),
          endtime: toModel(this.endtime.value),
        }
      };


      const formData: FormData = new FormData();
      formData.append('contentdto', JSON.stringify(contentaddCopy));
      if (this.audiofilestream !== null)
        formData.append('audiofile', this.audiofilestream, this.audiofilestream.name);
      // else
      //   formData.append('audiofile', null);

      if (this.previewfile !== null)
        formData.append('previewfile', this.previewfile, this.previewfile.name);
      // else
      //   formData.append('previewfile', null);

      if (this.imagefilestream !== null)
        formData.append('imagefile', this.imagefilestream, this.imagefilestream.name);
      // else
      //   formData.append('imagefile', null);

      if (this.thumbnailimagefile !== null)
        formData.append('thumbnailimagefile', this.thumbnailimagefile, this.thumbnailimagefile.name);
      // else
      //   formData.append('thumbnailimagefile', null);

      if (this.synopsisfile !== null)
        //   formData.append('synopsisfile', this.synopsisfile, this.synopsisfile.name);
        // else
        //   formData.append('synopsisfile', null);

        if (this.lyricsfile !== null)
          formData.append('lyricsfile', this.lyricsfile, this.lyricsfile.name);
      // else
      //   formData.append('lyricsfile', null);


      this.appservice.savecontent(formData, (result) => {
        if (result) {
          this.myModaledit.hide();
          this.onSearch();
        }
        this.myModalinfomesg = (result) ? "Content saved successfully" : "Error in Saving content";
        this.myModalinfo.show();
      });
    }
  }

  onEdit(content: ContentTableDto) {

    //update contentCopy
    if (content.index < this.contentsdetail.length) {
      this.selectedCD = this.contentsdetail[content.index];

      //
      this.contentForm.patchValue(
        {
          contenttypeid: this.selectedCD.contents.contenttypeid,
          languageid: this.selectedCD.contents.languageid,
          locationid: this.selectedCD.contents.locationid,
          albumname: this.selectedCD.contentproperties.albumname,
          //audiofile: this.selectedCD.contentproperties.audiofile,
          contentlanguage: this.getcontentlanguagesId(this.selectedCD.contentproperties.contentlanguage),
          contentstatus: this.getcontentstatuslistId(this.selectedCD.contentproperties.contentstatus),
          copyright: this.selectedCD.contentproperties.copyright,
          copyrightfrom: new Date(this.selectedCD.contentproperties.copyrightfrom),
          copyrightto: new Date(this.selectedCD.contentproperties.copyrightto),
          cpcategory1: this.selectedCD.contentproperties.cpcategory1,
          cpcategory2: this.selectedCD.contentproperties.cpcategory2,
          cpcategory3: this.selectedCD.contentproperties.cpcategory3,
          cpcategory4: this.selectedCD.contentproperties.cpcategory4,
          description: this.selectedCD.contentproperties.description,
          id: this.selectedCD.contentproperties.id,
          //imagefile: this.selectedCD.contentproperties.imagefile,
          //lyricstxt: this.selectedCD.contentproperties.lyricstxt,
          musicdirector: this.selectedCD.contentproperties.musicdirector,
          musiclabel: this.selectedCD.contentproperties.musiclabel,
          // preview: this.selectedCD.contentproperties.preview,
          producername: this.selectedCD.contentproperties.producername,
          publishername: this.selectedCD.contentproperties.publishername,
          singername: this.selectedCD.contentproperties.singername,
          songid: this.selectedCD.contentproperties.songid,
          songname: this.selectedCD.contentproperties.songname,
          songstatus: this.getsongstatuslistId(this.selectedCD.contentproperties.songstatus),
          songwriter: this.selectedCD.contentproperties.songwriter,
          // synopsistxt: this.selectedCD.contentproperties.synopsistxt,
          // thumbnailimage: this.selectedCD.contentproperties.thumbnailimage,
          tonetag: this.selectedCD.contentproperties.tonetag,
          yearofrelease: new Date(this.selectedCD.contentproperties.yearofrelease),
          starttime: fromModel(this.selectedCD.contentproperties.starttime),
          endtime: fromModel(this.selectedCD.contentproperties.endtime),    
        });
      //
      // this.contentCopy = {

      //   userid: cd.userid,
      //   contents: {
      //     contenttypeid: cd.contents.contenttypeid,
      //     id: cd.contents.id,
      //     languageid: cd.contents.languageid,
      //     locationid: cd.contents.locationid
      //   },
      //   contentproperties:
      //   {
      //     albumname: cd.contentproperties.albumname,
      //     audiofile: cd.contentproperties.audiofile,
      //     contentlanguage: cd.contentproperties.contentlanguage,
      //     contentstatus: cd.contentproperties.contentstatus,
      //     copyright: cd.contentproperties.copyright,
      //     copyrightfrom: cd.contentproperties.copyrightfrom,
      //     copyrightto: cd.contentproperties.copyrightto,
      //     cpcategory1: cd.contentproperties.cpcategory1,
      //     cpcategory2: cd.contentproperties.cpcategory2,
      //     cpcategory3: cd.contentproperties.cpcategory3,
      //     cpcategory4: cd.contentproperties.cpcategory4,
      //     description: cd.contentproperties.description,
      //     id: cd.contentproperties.id,
      //     imagefile: cd.contentproperties.imagefile,
      //     lyricstxt: cd.contentproperties.lyricstxt,
      //     musicdirector: cd.contentproperties.musicdirector,
      //     musiclabel: cd.contentproperties.musiclabel,
      //     preview: cd.contentproperties.preview,
      //     producername: cd.contentproperties.producername,
      //     publishername: cd.contentproperties.publishername,
      //     singername: cd.contentproperties.singername,
      //     songid: cd.contentproperties.songid,
      //     songname: cd.contentproperties.songname,
      //     songstatus: cd.contentproperties.songstatus,
      //     songwriter: cd.contentproperties.songwriter,
      //     synopsistxt: cd.contentproperties.synopsistxt,
      //     thumbnailimage: cd.contentproperties.thumbnailimage,
      //     tonetag: cd.contentproperties.tonetag,
      //     yearofrelease: cd.contentproperties.yearofrelease,
      //   }

      // };

      //update file fields
      this.audiofilelabel = this.getFileName(this.selectedCD.contentproperties.audiofile);
      this.previewfilelabel = this.getFileName(this.selectedCD.contentproperties.preview);
      this.imagefilelabel = this.getFileName(this.selectedCD.contentproperties.imagefile);
      this.thumbnailimagefilelabel = this.getFileName(this.selectedCD.contentproperties.thumbnailimage);
      this.synopsisfilelabel = this.getFileName(this.selectedCD.contentproperties.synopsistxt);
      this.lyricsfilelabel = this.getFileName(this.selectedCD.contentproperties.lyricstxt);
      //
    }

    this.onEditContenttype();

    this.myModaledit.show();
  }

  getFileName(path: string): string {
    let arr: string[] = path.split('\\');
    if (arr.length > 0) {
      return arr[arr.length - 1];
    }
    return path;
  }

  handleFileInput(event, index) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;


    switch (index) {
      case 1:
        this.audiofilestream = files[0];
        this.audiofilelabel = this.audiofilestream.name;
        break;
      case 2:
        this.previewfile = files[0];
        this.previewfilelabel = this.previewfile.name;
        break;
      case 3:
        this.imagefilestream = files[0];
        this.imagefilelabel = this.imagefilestream.name;
        break;
      case 4:
        this.thumbnailimagefile = files[0];
        this.thumbnailimagefilelabel = this.thumbnailimagefile.name;
        break;
      case 5:
        this.synopsisfile = files[0];
        this.synopsisfilelabel = this.synopsisfile.name;
        break;
      case 6:
        this.lyricsfile = files[0];
        this.lyricsfilelabel = this.lyricsfile.name;
        break;
      default:
        break;
    }
  }

  onSearch() {
    this.appservice.getContents(this.service.searchContent);
  }

  setDefaultValues() {
    let searchObj = this.service.searchContent;
    if (searchObj.contentstatus === "") {
      searchObj.contentstatus = (this.contentstatuslist.length > 0) ? this.contentstatuslist[0].status : "";
    }

    if (searchObj.contenttypeid === "") {
      searchObj.contenttypeid = (this.contenttypes.length > 0) ? this.contenttypes[0].id : "";
    }

    if (searchObj.languageid === "") {
      searchObj.languageid = (this.metadatalanguages.length > 0) ? this.metadatalanguages[0].id : "";

    }

    if (searchObj.userid === "") {
      searchObj.userid = (this.cpusers.length > 0) ? this.cpusers[0].id : "";
    }
    //Load first time data
    if ((searchObj.contentstatus !== "") && (searchObj.contenttypeid !== "") && (searchObj.languageid !== "") && (searchObj.userid !== "")) {
      if (this.loadfirsttime) {
        this.loadfirsttime = false;
        this.onSearch();
      }

    }


  }

  setContentStatusBasedRole() {
    const currentuserRolename = this.store.getState().currentuserdetail.rolename;
    if ((currentuserRolename.toUpperCase() === ROLES.ADMIN) || (currentuserRolename.toUpperCase() === ROLES.CPTENANT)) {
      this.editcontentstatus = [{ "id": 1, "status": "Ready" }, { "id": 2, "status": "Published" }, { "id": 3, "status": "Rejected" },
      { "id": 4, "status": "Expired" }];      
    }
    else {
      this.editcontentstatus = [{ "id": 2, "status": "Published" }];
    }
  }
  getYearFromDate(value: Date) {
    let year = value.getFullYear();
    return year.toString();

  }

  getFormattedDateString(value: Date) {
    let datestring = value.toISOString().substring(0, 19);
    datestring = datestring.replace("T", " ");
    return datestring;

  }

  // getFormattedTimeString(value: time) {
  //   let datestring = value.toISOString().substring(0, 19);
  //   datestring = datestring.replace("T", " ");
  //   return datestring;

  // }

  getcontentlanguagesId(value: string)
  {
    for (let index = 0; index < this.contentlanguages.length; index++) {
      const element = this.contentlanguages[index];
      if(element.language.toUpperCase() === value.toUpperCase())
      {
        return element.id;
      }      
    }
    return -1;

  }

  getsongstatuslistId(value : string)
  {
    for (let index = 0; index < this.songstatuslist.length; index++) {
      const element = this.songstatuslist[index];
      if(element.status.toUpperCase() === value.toUpperCase())
      {
        return element.id;
      }      
    }
    return -1;

  }

  getcontentstatuslistId(value : string)
  {
    for (let index = 0; index < this.contentstatuslist.length; index++) {
      const element = this.contentstatuslist[index];
      if(element.status.toUpperCase() === value.toUpperCase())
      {
        return element.id;
      }      
    }
    return -1;

  }

  
  getcontentlanguagesValue(id: number)
  {
    for (let index = 0; index < this.contentlanguages.length; index++) {
      const element = this.contentlanguages[index];
      if(element.id === id)
      {
        return element.language;
      }      
    }
    return "";

  }

  getcontentstatuslistValue(id : number)
  {
    for (let index = 0; index < this.contentstatuslist.length; index++) {
      const element = this.contentstatuslist[index];
      if(element.id === id)
      {
        return element.status;
      }      
    }
    return "";

  }


  

}
