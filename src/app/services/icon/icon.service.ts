import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class IconService {

  constructor(
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer
  ) { }

  registerIcons(): void {
    this.loadIcons(Object.values(Icons), '../../../assets/images');
  }

  private loadIcons(iconKeys: string[], iconUrl: string): void {
    iconKeys.forEach(key => {
      this._matIconRegistry.addSvgIcon(key, this._domSanitizer.bypassSecurityTrustResourceUrl(`${iconUrl}/${key}.svg`));
    });
  }
}

/**
 * @ENUM_VALUES SHOULD MATCH WITH SAVED NAME INSIDE THE FOLDER && ALSO WHERE WE WILL USE AS MAT-ICON
 */
export enum Icons {
  DASHBOARD = 'livwell',
  USERS = 'users',
  CATEGORIES = 'categories',
  SUBSCRIPTIONS = 'subscriptions',
  PROFILE_INTEREST = 'profile_interest',
  CHALLENGES = 'challenges',
  CLASSES = 'classes',
  EVENTS = 'event',
  ARTICLE = 'article',
  OFFERS = 'offers',
  PROMO = 'promo',
  SPECIAL_OFFER = 'special-offer',
  TROPHY = 'trophy',
  PROMO_CODE = 'promo-code',
  BADGE = 'badge',
  BANNERS = 'banners',
  CLIENT_CLUB = 'client-master',
  CLUBS = 'clubs',
  REPORTS = 'reports',
  VIDEO_ADS = 'video-ads',
  MESSAGE_BOARDS = 'message_board',
  BOARDS = 'boards',
  POSTS = 'posts',
  POINTS_HISTORY = 'points-history',
  POINTS = 'points',
  VIDEOS = 'videos',
  SUB_ADMINS = 'sub-admins',
  CALCULATOR = 'calculator',
  VERSIONS = 'versions',
  FAQ = 'faq',
  CONTENT_MANAGEMENT = 'content_management',
  STORY = 'story',
  SELES_TRACKER ='salestracker'
}
