import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';
import { AppStore } from 'src/app/store/app.store';
import { Store } from 'redux';
import { AppState } from 'src/app/store/app.state';
import { ContentDetail, ContentsDTO } from '../managecontent/contentdto';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ROLES } from 'src/app/helpers/Enums';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Time } from '@angular/common';
import { toModel } from 'src/app/helpers/util';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  focus4;
  focus5;
  focus6;
  focus7;
  focus8;
  focus9;
  focus10;
  focus11;
  focus12;
  focus13;
  focus15;
  focus16;
  focus17;
  focus18;
  focus23;
  focus24;
  focus25;
  focus26;
  focus27;
  focus28;
  focus31;
  focus32;
addForm: FormGroup;

  categories = [{"id" : 0 , "name" :"None"}];
  languages = [{"id" : "1", "language" :"English"}, {"id" : "2", "language" :"Arabic"}, {"id" : "3", "language" :"Bahasa"}];
  contenttypes = [{"id" : "1", "type" :"Audio"}, {"id" : "2", "type" :"Video"}, {"id" : "3", "type" :"Text"}];

  locations = [{"id" : "1", "name" :"Dubai"}, {"id" : "2", "name" :"Kenya"}, {"id" : "3", "name" :"Somalia"}];
  
  contentlanguages = [{"id" : 1, "language" :"English"}, {"id" : 2, "language" :"Hindi"}, {"id" : 3, "language" :"Arabic"},
  {"id" : 4, "language" :"Spanish"},{"id" : 5, "language" :"Swedish"},{"id" : 6, "language" :"Corsican"}];
  songstatuslist = [{"id" : 1, "status" :"Active"}, {"id" : 2, "status" :"Inactive"}];
  contentstatuslist = [{"id" : 1, "status" :"Ready"}, {"id" : 2, "status" :"Published"},{"id" : 3, "status" :"Rejected"},
  {"id" : 4, "status" :"Expired"}];

  @ViewChild('myModal1') myModal1: ModalDirective;

  audiofile = null;
  previewfile = null;
  imagefile = null;
  thumbnailimagefile = null;
  synopsisfile = null;
  lyricsfile = null;

  audiofilelabel = "Choose Audio file";
  previewfilelabel = "Choose Preview file";
  imagefilelabel = "Choose Image file";
  thumbnailimagefilelabel = "Choose Thumbnail Image file";
  synopsisfilelabel = "Choose Synopsis Text file";
  lyricsfilelabel = "Choose Lyrics Text file";

  constructor(public service : AppService, private http: HttpClient, @Inject(AppStore) public store : Store<AppState>) { 
     try {
    this.store.subscribe(() => this.updateState());

    this.service.getLanguages();
    this.service.getContentTypes();  
    this.service.getLocations();
    this.service.getCategories();
    this.setContentStatusBasedRole();
  } catch (error) {
    throw new Error("Authguard::contructor Exception :" + error);
    
  }
}

setContentStatusBasedRole()
{
  const currentuserRolename = this.store.getState().currentuserdetail.rolename;
  if((currentuserRolename.toUpperCase() === ROLES.ADMIN) || (currentuserRolename.toUpperCase() === ROLES.CPTENANT) )
  {
    this.contentstatuslist = [{"id" : 1, "status" :"Ready"}, {"id" : 2, "status" :"Published"},{"id" : 3, "status" :"Rejected"},
    {"id" : 4, "status" :"Expired"}];
  }
  else
  {
    this.contentstatuslist = [{"id" : 2, "status" :"Published"}];
  }
}

  updateState() {
    try {
      this.languages = this.store.getState().languages;
      this.contenttypes = this.store.getState().contenttypes;
      this.locations = this.store.getState().locations;
      this.categories = this.store.getState().categories;
      this.setDefaultValues();
    } catch (error) {
      throw new Error("Authguard::updateState Exception :" + error);
    }
  }
  ngOnInit() {
    this.addForm = new FormGroup({
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
      copyrightfrom: new FormControl('', [Validators.required]),
      copyrightto: new FormControl('', [Validators.required]),
      cpcategory1: new FormControl(''),
      cpcategory2: new FormControl(''),
      cpcategory3: new FormControl(''),
      cpcategory4: new FormControl(''),
      audio: new FormControl('', [Validators.required]),
      preview: new FormControl('', [Validators.required]),
      image: new FormControl(''),
      thumbnailimage: new FormControl(''),
      synopsistxt: new FormControl(''),
      lyricstxt: new FormControl(''),
      starttime: new FormControl(''),
      endtime: new FormControl('')
    });
  }

  onChangeContenttype()
  {
    let value = this.contenttypeid.value;
    if((value === "4") || (value === "5") || (value === "6") || (value === "7" ))
    {
      this.contentstatuslist = [{"id" : 2, "status" :"Published"}];

    }
    else{
      this.setContentStatusBasedRole();
    }
  }


  // contentaddCopy: ContentDetail = {
  //   userid: "",
  //   contents: {
  //     contenttypeid: "",
  //     id: "",
  //     languageid: "",
  //     locationid: ""
  //   },
  //   contentproperties:
  //   {
  //     albumname: "",
  //     audiofile: "",
  //     contentlanguage: "",
  //     contentstatus: "",
  //     copyright: "",
  //     copyrightfrom: "",
  //     copyrightto: "",
  //     cpcategory1: "",
  //     cpcategory2: "",
  //     cpcategory3: "",
  //     cpcategory4: "",
  //     description: "",
  //     id: "",
  //     imagefile: "",
  //     lyricstxt: "",
  //     musicdirector: "",
  //     musiclabel: "",
  //     preview: "",
  //     producername: "",
  //     publishername: "",
  //     singername: "",
  //     songid: "",
  //     songname: "",
  //     songstatus: "",
  //     songwriter: "",
  //     synopsistxt: null,
  //     thumbnailimage: "",
  //     tonetag: "",
  //     yearofrelease: ""
  //   }
  
  // };

  clearform() {    
    this.setDefaultValues();
  }

  handleFileInput(event, index) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;


    switch (index) {
      case 1:
        this.audiofile = files[0];
        this.audiofilelabel = this.audiofile.name;
        break;
      case 2:
        this.previewfile = files[0];
        this.previewfilelabel = this.previewfile.name;
        break;
      case 3:
        this.imagefile = files[0];
        this.imagefilelabel = this.imagefile.name;
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
   
  get languageid() { return this.addForm.get('languageid'); }
  get contenttypeid() { return this.addForm.get('contenttypeid'); }
  get contentstatus() { return this.addForm.get('contentstatus'); }
  get locationid() { return this.addForm.get('locationid'); }
  get contentlanguage() { return this.addForm.get('contentlanguage'); }
  get songstatus() { return this.addForm.get('songstatus'); }
  get songname() { return this.addForm.get('songname'); }
  get albumname() { return this.addForm.get('albumname'); }
  get singername() { return this.addForm.get('singername'); }
  get songwriter() { return this.addForm.get('songwriter'); }
  get musicdirector() { return this.addForm.get('musicdirector'); }
  get musiclabel() { return this.addForm.get('musiclabel'); }
  get producername() { return this.addForm.get('producername'); }
  get publishername() { return this.addForm.get('publishername'); }
  get description() { return this.addForm.get('description'); }
  get yearofrelease() { return this.addForm.get('yearofrelease'); }
  get copyright() { return this.addForm.get('copyright'); }
  get copyrightfrom() { return this.addForm.get('copyrightfrom'); }
  get copyrightto() { return this.addForm.get('copyrightto'); }
  get cpcategory1() { return this.addForm.get('cpcategory1'); }
  get cpcategory2() { return this.addForm.get('cpcategory2'); }
  get cpcategory3() { return this.addForm.get('cpcategory3'); }
  get cpcategory4() { return this.addForm.get('cpcategory4'); }
  get audio() { return this.addForm.get('audio'); }
  get preview() { return this.addForm.get('preview'); }
  get image() { return this.addForm.get('image'); }
  get thumbnailimage() { return this.addForm.get('thumbnailimage'); }
  get synopsistxt() { return this.addForm.get('synopsistxt'); }
  get lyricstxt() { return this.addForm.get('lyricstxt'); }
  get starttime() { return this.addForm.get('starttime'); }
  get endtime() { return this.addForm.get('endtime'); }


  onSubmit() {
    if (this.addForm.valid) {
      let fromdatestring = this.getFormattedDateString(this.copyrightfrom.value);
      let todatestring = this.getFormattedDateString(this.copyrightto.value);
      // let fromtimestring = this.getFormattedTimeString(this.starttime.value);
      // let totimestring = this.getFormattedTimeString(this.endtime.value);

      let contentaddCopy: ContentDetail = {
        userid: this.store.getState().currentuserdetail.id,
        contents: {
          contenttypeid: this.contenttypeid.value,
          id: "",
          languageid: this.languageid.value,
          locationid: this.locationid.value
        },
        contentproperties:
        {
          id: "",
          albumname: this.albumname.value,
          audiofile: this.audio.value,
          contentlanguage: this.contentlanguage.value,
          contentstatus: this.contentstatus.value,
          copyright: this.copyright.value,
          copyrightfrom: fromdatestring,
          copyrightto: todatestring,
          cpcategory1: this.cpcategory1.value,
          cpcategory2: this.cpcategory2.value,
          cpcategory3: this.cpcategory3.value,
          cpcategory4: this.cpcategory4.value,
          description: this.description.value,
          imagefile: this.image.value,
          lyricstxt: this.lyricstxt.value,
          musicdirector: this.musicdirector.value,
          musiclabel: this.musiclabel.value,
          preview: this.preview.value,
          producername: this.producername.value,
          publishername: this.publishername.value,
          singername: this.singername.value,
          songid: "",
          songname: this.songname.value,
          songstatus: this.songstatus.value,
          songwriter: this.songwriter.value,
          synopsistxt: this.synopsistxt.value,
          thumbnailimage: this.thumbnailimage.value,
          tonetag: "",
          yearofrelease: this.getYearFromDate(this.yearofrelease.value),
          starttime: toModel(this.starttime.value),
          endtime: toModel(this.endtime.value),          
        }      
      };


      const formData: FormData = new FormData();
      formData.append('contentdto', JSON.stringify(contentaddCopy));
      formData.append('audiofile', this.audiofile, this.audiofile.name);
      formData.append('previewfile', this.previewfile, this.previewfile.name);
      if(this.imagefile === null)
      {
        // formData.append('imagefile', null);
        // formData.append('thumbnailimagefile', null);
        // formData.append('synopsisfile', null);
        // formData.append('lyricsfile', null);
      }
      else
      {
        formData.append('imagefile', this.imagefile, this.imagefile.name);
        formData.append('thumbnailimagefile', this.thumbnailimagefile, this.thumbnailimagefile.name);
        formData.append('synopsisfile', this.synopsisfile, this.synopsisfile.name);
        formData.append('lyricsfile', this.lyricsfile, this.lyricsfile.name);
      }
      
    

      this.service.addnewContent(formData, (result) => {
        if (result) {
          this.myModal1.show();
          this.clearform();
        }
      });
    }


  }

  setDefaultValues() {

    this.addForm.reset();
    this.addForm.patchValue(
      {
        contenttypeid : (this.contenttypes.length > 0) ? this.contenttypes[0].id : "",
        languageid :(this.languages.length > 0) ? this.languages[0].id : "",
        locationid :(this.locations.length > 0) ? this.locations[0].id : "",    
        contentlanguage :(this.contentlanguages.length > 0) ? this.contentlanguages[0].language : "",
        songstatus :(this.songstatuslist.length > 0) ? this.songstatuslist[0].status : "",
        contentstatus :(this.contentstatuslist.length > 0) ? this.contentstatuslist[0].status : "",
        cpcategory1 :"None",
        cpcategory2 :"None",
        cpcategory3 :"None",
        cpcategory4 :"None", 
      }
    );   

    this.audiofilelabel = "Choose Audio file";
    this.previewfilelabel = "Choose Preview file";
    this.imagefilelabel = "Choose Image file";
    this.thumbnailimagefilelabel = "Choose Thumbnail Image file";
    this.synopsisfilelabel = "Choose Synopsis Text file";
    this.lyricsfilelabel = "Choose Lyrics Text file";

  }

  getYearFromDate( value : Date)
  {
    if(value == null)
      return null;
    let year = value.getFullYear();
    return year.toString();

  }

  getFormattedDateString(value : Date)
  {
    let datestring = value.toISOString().substring(0,19);
    datestring = datestring.replace("T", " ");
    return datestring;

  }
  // getFormattedTimeString(value : Time)
  // {
  //   let timestring = value.toString().substring(0,19);
  //   timestring = timestring.replace("T", " ");
  //   return timestring;

  // }


}
