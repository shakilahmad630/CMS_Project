import { Injectable, PipeTransform, Inject } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { ContentDetail, ContentTableDto, SearchContent } from './contentdto';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortContentColumn } from './sortable.directive';
import { AppService } from 'src/app/app.service';
import { AppStore } from 'src/app/store/app.store';
import { Store } from 'redux';
import { AppState } from 'src/app/store/app.state';
import { SortDirection } from '../managecpuser/sortable.directive';

interface SearchResult {
  countries: ContentTableDto[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortContentColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(contents: ContentTableDto[], column: SortContentColumn, direction: string): ContentTableDto[] {
  if (direction === '' || column === '') {
    return contents;
  } else {
    return [...contents].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(content: ContentTableDto, term: string, pipe: PipeTransform) {
  return content.id.toLowerCase().includes(term.toLowerCase())
    || content.Contentstatus.toLowerCase().includes(term.toLowerCase())
    || content.Songid.toLowerCase().includes(term.toLowerCase())
    || content.Songstatus.toLowerCase().includes(term.toLowerCase())
    || content.Songname.toLowerCase().includes(term.toLowerCase())
    || content.Album.toLowerCase().includes(term.toLowerCase())
    || content.Singername.toLowerCase().includes(term.toLowerCase())
    || content.Contentlanguage.toLowerCase().includes(term.toLowerCase())
    || content.Tonetag.toLowerCase().includes(term.toLowerCase());
  // || content.Preview.toLowerCase().includes(term.toLowerCase());

}

@Injectable()
export class ContentService {

  private contents: ContentTableDto[] = [];

  private _searchContent: SearchContent = {
    userid: "",
    contentstatus: "",
    contenttypeid: "",
    languageid: ""
  };
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<ContentTableDto[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe, @Inject(AppStore) public store: Store<AppState>) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._countries$.next(result.countries);
      this._total$.next(result.total);
    });

    this._search$.next();


    try {
      this.store.subscribe(() => this.updateState());

      //this.appservice.getContents();

    } catch (error) {
      throw new Error("Authguard::contructor Exception :" + error);

    }
  }

  updateState() {
    try {

      let contentstemp: ContentDetail[] = this.store.getState().contents;
      this.contents = [];
      for (let index = 0; index < contentstemp.length; index++) {
        const element: ContentDetail = contentstemp[index];

        let content: ContentTableDto = {
          index: index,
          id: element.contents.id,
          Album: element.contentproperties.albumname,
          Contentlanguage: element.contentproperties.contentlanguage,
          Contentstatus: element.contentproperties.contentstatus,
          Singername: element.contentproperties.singername,
          Songid: element.contentproperties.songid,
          Songname: element.contentproperties.songname,
          Songstatus: element.contentproperties.songstatus,
          Tonetag: element.contentproperties.tonetag
        }

        this.contents.push(content);
      }

      this._search$.next();
    } catch (error) {
      throw new Error("ManagecpuserComponent::updateState Exception :" + error);
    }
  }

  get searchContent(){ return this._searchContent};
  get contents$() { return this._countries$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }


  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: SortContentColumn) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let contents = sort(this.contents, sortColumn, sortDirection);

    // 2. filter
    contents = contents.filter(content => matches(content, searchTerm, this.pipe));
    const total = contents.length;

    // 3. paginate
    contents = contents.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ countries: contents, total });
  }

  // getContents() {
  //   this.appservice.getContents(this._searchContent);
  // }

  setSearchContent(searchObj : SearchContent) { 
    this._searchContent = {
      userid : searchObj.userid,
      contentstatus : searchObj.contentstatus,
      contenttypeid : searchObj.contenttypeid,
      languageid : searchObj.languageid
    };     
  }
  
}
