export interface ContentDetail {
  userid? : string;
  contents? : ContentsDTO
  contentproperties? : ContentPropertiesDTO;
  
  }

  export interface ContentsDTO{
    id: string;
    languageid:string;
    contenttypeid:string;
    locationid:string;
    language ?:string;
    contenttype ?:string;
    location ?:string;

  }

  export interface ContentPropertiesDTO{

    id: string;
    songname: string;
    albumname: string;
    singername: string;
    songwriter: string;
    musicdirector: string;
    musiclabel: string;
    producername: string;
    publishername: string;
    description: string;
    contentlanguage: string;
    copyright: string;
    yearofrelease: string;
    copyrightfrom: string;
    copyrightto: string;
    cpcategory1: string;
    synopsistxt: string;
    lyricstxt: string;
    audiofile: string;
    preview: string;
    imagefile: string;
    thumbnailimage: string;
    cpcategory2: string;
    cpcategory3: string;
    cpcategory4: string;
    contentstatus: string;
    songid: string;
    songstatus: string;
    tonetag: string;
    starttime : string;
    endtime: string; 
  }
  
  export interface ContentTableDto{

    index ? : number;
    id : string;
    Contentstatus : string;
    Songid : string;
    Songstatus : string;
    Songname : string;
    Album : string;
    Singername : string;
    Contentlanguage : string;
    Tonetag : string;
  }

  export interface SearchContent{
    contentstatus : string;
    userid : string;
    languageid:string;
    contenttypeid : string
  }