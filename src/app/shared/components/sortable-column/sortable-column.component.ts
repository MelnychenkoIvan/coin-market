import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { SortService }                                       from './sort.service';
import { Subscription }                                      from 'rxjs/Subscription';

@Component({
  selector : '[sortable-column]',
  template : `
    <i *ngIf="sortDirection === 'desc'" class="arrow arrow-up"></i>
    <i *ngIf="sortDirection === 'asc'" class="arrow arrow-down"></i>
    <ng-content></ng-content>
  `,
  styleUrls: ['./sortable-column.component.scss']
})
export class SortableColumnComponent implements OnInit, OnDestroy {

  private columnSortedSubscription: Subscription;

  @Input('sortable-column') columnName: string;
  @Input('sort-direction') sortDirection = '';

  @HostListener('click') sort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this._sortServ.columnSorted({ sortColumn: this.columnName, sortDirection: this.sortDirection });
  }

  constructor(private _sortServ: SortService) { }

  ngOnInit() {
    // subscribe to sort changes so we can react when other columns are sorted
    this.columnSortedSubscription = this._sortServ.columnSorted$.subscribe(event => {
      // reset this column's sort direction to hide the sort icons
      if (this.columnName !== event.sortColumn) {
        this.sortDirection = '';
      }
    });
  }

  ngOnDestroy() {
    this.columnSortedSubscription.unsubscribe();
  }

}
