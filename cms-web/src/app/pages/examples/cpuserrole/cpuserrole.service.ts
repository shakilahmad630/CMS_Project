import {Injectable, PipeTransform, Inject} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {Role} from './roledto';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from './sortable.directive';
import { AppService } from 'src/app/app.service';
import { AppStore } from 'src/app/store/app.store';
import { Store } from 'redux';
import { AppState } from 'src/app/store/app.state';

interface SearchResult {
  countries: Role[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(countries: Role[], column: SortColumn, direction: string): Role[] {
  if (direction === '' || column === '') {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(country: Role, term: string, pipe: PipeTransform) {
  return  country.contenttype.toLowerCase().includes(term.toLowerCase())
    || country.location.toLowerCase().includes(term.toLowerCase())
    || country.operation.toLowerCase().includes(term.toLowerCase());
    // || pipe.transform(country.Name).includes(term);   
}

@Injectable()
export class RoleService {
  private userassignroles = [];
    
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<Role[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe, private appservice : AppService, @Inject(AppStore) public store : Store<AppState>) {
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

      //this.appservice.getUserassignroles("abc1");
      
    } catch (error) {
      throw new Error("Authguard::contructor Exception :" + error);
      
    }
  }

updateState()
{
  try {

    this.userassignroles = this.store.getState().userassignroles;
    this._search$.next();
  } catch (error) {
   throw new Error("ManagecpuserComponent::updateState Exception :" + error);
  }
}

  get countries$() { return this._countries$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let countries = sort(this.userassignroles, sortColumn, sortDirection);

    // 2. filter
    countries = countries.filter(country => matches(country, searchTerm, this.pipe));
    const total = countries.length;

    // 3. paginate
    countries = countries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({countries, total});
  }

  setSelectedUserId(userid : string)
  {
    if(userid.length > 0){
    this.appservice.getUserassignroles(userid);
    }

  }
}
