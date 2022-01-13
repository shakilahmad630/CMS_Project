import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {Category} from './categorydto';
import { SortDirection } from '../managecpuser/sortable.directive';

export type SortCategoryColumn = keyof Category | '';
// export type SortDirection = 'asc' | 'desc' | '';
 const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortCategoryEvent {
  column: SortCategoryColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbCategorySortableHeader {

  @Input() sortable: SortCategoryColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortCategoryEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}
