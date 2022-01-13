import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';
import { AppStore } from 'src/app/store/app.store';
import { Store } from 'redux';
import { AppState } from 'src/app/store/app.state';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-bulk-content',
  templateUrl: './bulk-content.component.html',
  styleUrls: ['./bulk-content.component.scss']
})
export class BulkContentComponent implements OnInit {
  focus23;
  focus24;
  focus25;
  focus26;
  focus27;
  focus28;
  audiofile = null;
  previewfile = null;
  imagefile = null;
  thumbnailimagefile = null;
  synopsisfile = null;
  lyricsfile = null;
  csvfile = null;

  audiofilelabel = "Choose Audio file";
  previewfilelabel = "Choose Preview file";
  imagefilelabel = "Choose Image file";
  thumbnailimagefilelabel = "Choose Thumbnail Image file";
  synopsisfilelabel = "Choose Synopsis Text file";
  lyricsfilelabel = "Choose Lyrics Text file";
  csvfilelabel = "Choose Csv Text file";

  //
  bulkForm: FormGroup;

  @ViewChild('myModal1') myModal1: ModalDirective;

  constructor(public service: AppService, private http: HttpClient, @Inject(AppStore) public store: Store<AppState>) {
    try {
      this.store.subscribe(() => this.updateState());

    } catch (error) {
      throw new Error("Authguard::contructor Exception :" + error);

    }
  }

  updateState() {
    try {

    } catch (error) {
      throw new Error("Authguard::updateState Exception :" + error);
    }
  }

  ngOnInit() {
    this.bulkForm = new FormGroup({
      csv: new FormControl(''),
      audio: new FormControl('', [Validators.required]),
      preview: new FormControl('', [Validators.required]),
      image: new FormControl(''),
      thumbnailimage: new FormControl(''),
      synopsistxt: new FormControl(''),
      lyricstxt: new FormControl('')
    });
  }


  get csv() { return this.bulkForm.get('csv'); }
  get audio() { return this.bulkForm.get('audio'); }
  get preview() { return this.bulkForm.get('preview'); }
  get image() { return this.bulkForm.get('image'); }
  get thumbnailimage() { return this.bulkForm.get('thumbnailimage'); }
  get synopsistxt() { return this.bulkForm.get('synopsistxt'); }
  get lyricstxt() { return this.bulkForm.get('lyricstxt'); }




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
      case 7:
        this.csvfile = files[0];
        this.csvfilelabel = this.csvfile.name;
      default:
        break;
    }

  }
  onSubmit() {
    if (this.bulkForm.valid) {

      const formData: FormData = new FormData();
      formData.append('userid', this.store.getState().currentuserdetail.id);
      formData.append('audiofile', this.audiofile, this.audiofile.name);
      formData.append('previewfile', this.previewfile, this.previewfile.name);
      if (this.imagefile === null) {
        // formData.append('imagefile', null);
      } else {
        formData.append('imagefile', this.imagefile, this.imagefile.name);
      }
      if (this.thumbnailimagefile === null) {
        // formData.append('thumbnailimagefile', null);
      } else {
        formData.append('thumbnailimagefile', this.thumbnailimagefile, this.thumbnailimagefile.name);
      }
      if (this.synopsisfile === null) {
        // formData.append('synopsisfile', null);
      } else {
        formData.append('synopsisfile', this.synopsisfile, this.synopsisfile.name);
      }
      if (this.lyricsfile === null) {
        // formData.append('lyricsfile', null);
      } else {
        formData.append('lyricsfile', this.lyricsfile, this.lyricsfile.name);
      }
      formData.append('csvfile', this.csvfile, this.csvfile.name);

      this.service.addbulkContent(formData, (result) => {
        if (result) {
          this.myModal1.show();
          this.clearform();
        }
      });

    }
  }
  clearform() {
    this.bulkForm.reset();

    this.audiofilelabel = "Choose Audio file";
    this.previewfilelabel = "Choose Preview file";
    this.imagefilelabel = "Choose Image file";
    this.thumbnailimagefilelabel = "Choose Thumbnail Image file";
    this.synopsisfilelabel = "Choose Synopsis Text file";
    this.lyricsfilelabel = "Choose Lyrics Text file";
    this.csvfilelabel = "Choose Csv Text file";
  }

}
