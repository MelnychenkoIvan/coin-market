import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

export interface ColumnSortedEvent {
  sortColumn: string;
  sortDirection: string;
}

@Injectable()
export class SortService {

  private columnSortedSource = new Subject<ColumnSortedEvent>();

  columnSorted$ = this.columnSortedSource.asObservable();

  constructor() { }

  columnSorted(event: ColumnSortedEvent) {
    this.columnSortedSource.next(event);
  }

}
