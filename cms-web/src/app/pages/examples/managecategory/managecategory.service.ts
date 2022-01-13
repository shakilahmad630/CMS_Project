import {Injectable, PipeTransform, Inject} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortCategoryColumn} from './sortable.directive';
import { AppService } from 'src/app/app.service';
import { AppStore } from 'src/app/store/app.store';
import { Store } from 'redux';
import { AppState } from 'src/app/store/app.state';
import { SortDirection } from '../managecpuser/sortable.directive';
import { Category } from './categorydto';

interface SearchResult {
  countries: Category[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortCategoryColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(categories: Category[], column: SortCategoryColumn, direction: string): Category[] {
  if (direction === '' || column === '') {
    return categories;
  } else {
    return [...categories].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(category: Category, term: string, pipe: PipeTransform) {
  return category.name.toLowerCase().includes(term.toLowerCase())
  || pipe.transform(category.id).includes(term);
}

@Injectable()
export class CategoryService {
   private categories : Category[] = [];
  //  [
  //    {"id" : 1, "name" : "abc"},
  //    {"id" : 2, "name" : "abc1"},
  //    {"id" : 3, "name" : "abc2"},
  //    {"id" : 4, "name" : "abc3"},
  //  ];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<Category[]>([]);
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

      this.appservice.getCategories();

    } catch (error) {
      throw new Error("Authguard::contructor Exception :" + error);

    }
  }

updateState()
{
  try {

    let categoriestemp : Category[] = this.store.getState().categories;
    this.categories = [];
    for (let index = 0; index < categoriestemp.length; index++) {
      const element : Category = categoriestemp[index];

      let category : Category = {
        id : element.id,
        name : element.name
      }

      this.categories.push(category);
    }

    this._search$.next();
  } catch (error) {
   throw new Error("ManagecpuserComponent::updateState Exception :" + error);
  }
}

  get categories$() { return this._countries$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortCategoryColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let contents = sort(this.categories, sortColumn, sortDirection);

    // 2. filter
    contents = contents.filter(content => matches(content, searchTerm, this.pipe));
    const total = contents.length;

    // 3. paginate
    contents = contents.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({countries: contents, total});
  }
}
