import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatSelect } from '@angular/material';
import { FormControl } from '@angular/forms';
import { PROMO_CODE_ERROR_MESSAGES } from '../../constants/messages';

@Component({
  selector: 'lv-load-on-scroll',
  templateUrl: './load-on-scroll.component.html',
  styleUrls: ['./load-on-scroll.component.scss']
})
export class LoadOnScrollComponent implements OnInit {
  errMsg = PROMO_CODE_ERROR_MESSAGES;
  @Input() dropdownType: string;
  @Input() data: any = [];
  @Input() control: FormControl = new FormControl();
  @Output() loadMore: EventEmitter<any> = new EventEmitter();
  @ViewChild('select', null) selectedElem: MatSelect;

  ngOnInit() {

  }

  registerPanelScrollEvent(event: boolean) {
    if (event) {
      const panel = this.selectedElem.panel.nativeElement;
      panel.style.maxHeight = "330px"
      panel.addEventListener('scroll', event => this.loadOnScroll(event));
    } else {
      if (this.selectedElem.panel) {
        this.selectedElem.panel.nativeElement.removeEventListener();
      }
    }
  }

  loadOnScroll(listElm) {
    if (listElm.target.scrollTop + listElm.target.clientHeight >= listElm.target.scrollHeight) {
      const emit = {
        type: 'LOAD_MORE'
      }
      this.loadMore.emit(emit)
    }
  }

  searchData(searchText: any) {
    const emit = {
      type: 'LOAD_MORE',
      body: searchText ? searchText : 'RESET_VALUES'
    }
    this.loadMore.emit(emit);
  }

  onSelectionChange(data: any) {
    if (data.isChecked) {
      data['isChecked'] = false;
    } else {
      data['isChecked'] = true;
    }
    const emit = {
      type: 'SELECT_CHANGE',
      body: data
    }
    this.loadMore.emit(emit);
  }

}
