import { Component, OnInit, Output, EventEmitter, Input, Inject, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatSelect } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mat-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss'],
})

export class SelectSearchComponent implements OnInit, OnDestroy {
  @Input() placeholder: string = "Search...";
  @Input() label: string = "Data not found.";
  @Output() search: EventEmitter<any> = new EventEmitter();
  searchList = new FormControl();
  searchSub: Subscription;

  constructor(@Inject(MatSelect) public matSelect: MatSelect, ) { }

  ngOnInit() {
    this.realTimeSearch();
    const panelClass = 'mat-select-search-panel';
    if (this.matSelect.panelClass) {
      if (Array.isArray(this.matSelect.panelClass)) {
        this.matSelect.panelClass.push(panelClass);
      } else if (typeof this.matSelect.panelClass === 'string') {
        this.matSelect.panelClass = [this.matSelect.panelClass, panelClass];
      } else if (typeof this.matSelect.panelClass === 'object') {
        this.matSelect.panelClass[panelClass] = true;
      }
    } else {
      this.matSelect.panelClass = panelClass;
    }
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe();
  }

  realTimeSearch() {
    this.searchSub = this.searchList.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(res => {
      this.searchEmit(res);
    });
  }

  searchEmit(text) {
    if (text) {
      text = text.trim();
      if (text) {
        this.search.emit(text.toLowerCase());
      }
    } else if (text == '' || !text) {
      this.search.emit('');
    }
  }

  _handleKeydown(event: KeyboardEvent) {
    if (event.keyCode === 32) {
      // do not propagate spaces to MatSelect, as this would select the currently active option
      event.stopPropagation();
    }
  }

  clearValue() {
    this.searchList.setValue('');
  }

}
