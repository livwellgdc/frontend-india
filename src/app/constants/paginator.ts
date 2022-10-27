import { MatPaginator, Sort } from '@angular/material';

export class Pagination {

  API_EVENT = {
    defaultLimit: 100,
    delete: 'DELETED',
    active: 'UN_BLOCKED',
    block: 'BLOCKED',
    all: 'ALL',
    ongoing: 'ONGOING',
    upcoming: 'UPCOMING',
    ended: 'ENDED',
    expired: 'EXPIRED',
    confirmed: 'CONFIRMED',
    complete: 'COMPLETE',
    incomplete: 'INCOMPLETE',
    cancelled: 'CANCELLED',
    pending: 'PENDING',
    quickLinks:'QUICK_LINKS',
    producstStore:"PRODUCTS_STORE",
    generic: 'GENERIC_CATEGORIES',
    class: 'CLASS',
    event: 'EVENT',
    challenge: 'CHALLENGE',
    livwellBenifit: 'LIVWELL_BENEFITS',
    fitnessVideo: 'FITNESS_VIDEO',
    joining: 'JOINING',
    health: 'HEALTH',
    reward: 'REWARD',
    healthHistory: 'HEALTH_HISTORY',
    rewardHistory: 'REWARD_HISTORY',
    pointHistory: 'POINT_HISTORY',
    loginHistory: 'LOGIN_HISTORY',
    badgeHistory: 'BADGE_HISTORY',
    challengeHistory: 'CHALANGE_HISTORY',
    approved: 'APPROVED',
    rejected: "REJECTED",

  }
  today: Date = new Date();
  total: number;
  nextHit: number = 2;
  pageNo: number;
  limit: number;
  search: string;
  pageOptions: number[];
  filterOptions: { [key: string]: string | any };
  sortBy: string = "created";
  sortOrder: string = "-1";
  type: string;
  statusType: string;
  permissionClass: string = '';
  viewPermission: boolean = true;

  constructor() {
    this.total = 0;
    this.pageNo = 1;
    this.limit = 10;
    this.pageOptions = [5, 10, 25, 100];
  }

  get pageParams() {
    return {
      pageNo: this.pageNo,
      limit: this.limit
    };
  }

  get searchFilter() {
    return { searchKey: this.search };
  }

  get sortHeaders() {
    return {
      sortBy: this.sortBy,
      sortOrder: this.sortOrder
    };
  }

  get typeOf() {
    return {
      type: this.type,
      status: this.statusType
    };
  }

  confirmPageReload() { }

  allPrams() {
    return {
      ...this.typeOf,
      ...this.pageParams,
      ...this.filterOptions,
      ...this.searchFilter,
      ...this.sortHeaders,
    };
  }

  normalPrams() {
    return {
      ...this.pageParams,
      ...this.filterOptions,
      ...this.searchFilter,
    };
  }

  /**
   * @description This function checks if page needs to be decreased on row deletion
   */
  validateDeletion() {
    if (
      this.total !== 1 &&
      this.total - (this.pageNo - 1) * this.limit === 1
    ) {
      this.pageNo--;
      this.total--;
    }
  }

  get validPageOptions() {
    const dataObj = this.allPrams();
    const mainOption = {};
    for (const i of Object.keys(dataObj)) {
      if (dataObj[i] || dataObj[i] === 0) {
        mainOption[i] = dataObj[i];
      }
    }
    return mainOption;
  }

  get params() {
    const dataObj = this.normalPrams();
    const mainOption = {};
    for (const i of Object.keys(dataObj)) {
      if (dataObj[i] || dataObj[i] === 0) {
        mainOption[i] = dataObj[i];
      }
    }
    return mainOption;
  }

  set pageOptionsOnChange(options: MatPaginator | any) {
    this.pageNo = options.pageIndex + 1;
    this.limit = options.pageSize;
  }

  set sortOptions(sortOption: Sort) {
    if (sortOption.direction) {
      this.sortBy = sortOption.active;
      this.sortOrder = sortOption.direction === 'asc' ? '1' : '-1';
    } else {
      this.sortBy = null;
      this.sortOrder = null;
    }
  }

  currentIndex(index: number): number {
    return (this.pageNo - 1) * this.limit + index + 1;
  }

  resetPages() {
    this.pageNo = 1;
    this.nextHit = 2;
  }

}
