import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {ContentDetail} from './Contentdto';
import { SortDirection } from '../managecpuser/sortable.directive';

export type SortContentColumn = keyof ContentDetail | '';
// export type SortDirection = 'asc' | 'desc' | '';
 const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortContentEvent {
  column: SortContentColumn;
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
export class NgbContentSortableHeader {

  @Input() sortable: SortContentColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortContentEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}
