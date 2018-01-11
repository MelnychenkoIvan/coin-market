import { Directive, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription }                                       from 'rxjs/Subscription';
import { SortService }                                        from './sort.service';

@Directive({
  selector: '[sortable-table]'
})
export class SortableTableDirective implements OnInit, OnDestroy {

  @Output() sorted = new EventEmitter();

  private columnSortedSubscription: Subscription;

  constructor(private _sortServ: SortService) { }

  ngOnInit(): void {
    // subscribe to sort changes so we emit and event for this data table
    this.columnSortedSubscription = this._sortServ.columnSorted$.subscribe(event => {
      this.sorted.emit(event);
    });
  }

  ngOnDestroy(): void {
    this.columnSortedSubscription.unsubscribe();
  }

}
