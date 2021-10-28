import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lv-search-renderer',
  templateUrl: './search-renderer.component.html',
  styleUrls: ['./search-renderer.component.css']
})
export class SearchRendererComponent implements OnInit, OnDestroy {
  @Input() placeholder: string;
  @Output() lvSearch = new EventEmitter();
  searchSub: Subscription;
  searchForm = new FormControl('');

  constructor() {
  }

  ngOnInit() {
    this.realTimeSearch();
  }

  realTimeSearch() {
    this.searchSub = this.searchForm.valueChanges.pipe(debounceTime(800), distinctUntilChanged()).subscribe(value => {
      this.searchEmit(value);
    })
  }

  searchEmit(text) {
    if (text) {
      text = text.trim();
      if (text) {
        this.lvSearch.emit(text.toLowerCase());
      }
    } else if (text == '' || !text) {
      this.lvSearch.emit('');
    }
  }

  clearValue() {
    if (this.searchForm.value) {
      this.searchForm.setValue('');
    }
  }

  ngOnDestroy() {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
  }



}
