import {Injectable, PipeTransform, Inject} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {UserDTO} from './userdto';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from './sortable.directive';
import { AppService } from 'src/app/app.service';
import { AppStore } from 'src/app/store/app.store';
import { Store } from 'redux';
import { AppState } from 'src/app/store/app.state';

interface SearchResult {
  users: UserDTO[];
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

function sort(users: UserDTO[], column: SortColumn, direction: string): UserDTO[] {
  if (direction === '' || column === '') {
    return users;
  } else {
    return [...users].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(user: UserDTO, term: string, pipe: PipeTransform) {
  return user.username.toLowerCase().includes(term.toLowerCase())
    || user.status.toLowerCase().includes(term.toLowerCase())
    || user.email.toLowerCase().includes(term.toLowerCase())
    || user.phonenumber.toLowerCase().includes(term.toLowerCase())
    || user.firstname.toLowerCase().includes(term.toLowerCase())
    // || pipe.transform(country.email).includes(term)
    // || pipe.transform(country.phonenumber).includes(term)
    // || pipe.transform(country.firstname).includes(term);
   
}

@Injectable()
export class UserService {
  private users = [];
 
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _users$ = new BehaviorSubject<UserDTO[]>([]);
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
      this._users$.next(result.users);
      this._total$.next(result.total);
    });

    this._search$.next();

    
    try {
      this.store.subscribe(() => this.updateState());

      this.appservice.getUsers();
      
    } catch (error) {
      throw new Error("Authguard::contructor Exception :" + error);
      
    }
  }

updateState()
{
  try {
    this.users = this.store.getState().users;
    this._search$.next();

  } catch (error) {
   throw new Error("ManagecpuserComponent::updateState Exception :" + error);
  }
}

  get users$() { 
    return this._users$.asObservable(); 
  }
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
    let lusers = sort(this.users, sortColumn, sortDirection);

    // 2. filter
    lusers = lusers.filter(user => matches(user, searchTerm, this.pipe));
    const total = lusers.length;

    // 3. paginate
    lusers = lusers.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({users: lusers, total});
  }
}
