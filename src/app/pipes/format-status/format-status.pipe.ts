import { Pipe, PipeTransform } from '@angular/core';
import { Pagination } from '../../constants/paginator';

@Pipe({
  name: 'formatStatus'
})
export class FormatStatusPipe extends Pagination implements PipeTransform {

  transform(value: string, extraArgument?: string): any {
    switch (value) {
      case this.API_EVENT.block:
        return extraArgument == 'User' ? 'Blocked' : 'Inactive';
      case this.API_EVENT.active:
        return 'Active';
      case this.API_EVENT.delete:
        return 'Deleted';
      case this.API_EVENT.ongoing:
        return 'Ongoing';
      case this.API_EVENT.upcoming:
        return 'Upcoming';
      case this.API_EVENT.ended:
        return 'Ended';
      case this.API_EVENT.expired:
        return 'Expired';
      case this.API_EVENT.pending:
        return 'Pending';
      case this.API_EVENT.confirmed:
        return 'Confirmed';
      case this.API_EVENT.complete:
        return 'Completed';
      case this.API_EVENT.incomplete:
        return 'Incomplete';
      case this.API_EVENT.cancelled:
        return 'Cancelled';
      case 'NOT_ATTENTED':
        return 'Not Attended';
      case 'ACTIVE':
        return 'Active';

      case 'GROUPX':
        return 'Group X';
      case 'YOGA':
        return 'Yoga';

      case 'ONCE':
        return 'Once';
      case 'ONCE_EVERY_MONTH':
        return 'Once Every Month';

      case 'POINT':
        return 'Point';
      case 'COUPON':
        return 'Coupon';

      case 'DEFAULT':
        return 'Default Badge';
      case 'MANUAL':
        return 'Created By Admin';

      case 'CENTURION':
        return 'Centurion';
      case 'GOLD':
        return 'Gold';
      case 'PLATINUM':
        return 'Platinum';
      case 'NON_MEMBER':
        return 'Non Member';

      case 'NORMAL':
        return 'Normally';
      case 'FORCEFULLY':
        return 'Forcefully';

      case '1':
        return 'Android';
      case '2':
        return 'iOS';

      case 'SIGNUP':
        return 'Sign Up';
      case 'PROFILE':
        return 'Profile';
      case 'CLASS_BOOKING':
        return 'Class Booking';
      case 'CHALLENGE':
        return 'Challenge';
      case 'STEPS':
        return 'Steps';
      case 'BADGE':
        return 'Badge';
      case 'ADS':
        return 'Video Ads';
      case 'MONTHLY_BONUS':
        return 'Monthly Bonus';
      case 'REFERRAL_BONUS':
        return 'Referral Bonus';
      case 'REWARD':
        return 'Reward Redemption';
      case 'PREMIUM_VIDEO_CONTENT':
        return 'Premium Video Content';

      case 'CHANGE_THE_WAY_I_LOOK':
        return 'Change the way I look';
      case 'CHANGE_MY_LIFESTYLE':
        return 'Change My Lifestyle';
      case 'CHALENGE_MYSELF':
        return 'Challenge Myself';

      case 'GOOGLE_FIT':
        return 'Google Fit';
      case 'APPLE_FIT':
        return 'Apple Fit';
      case 'SAMSUNG_HEALTH':
        return 'Samsung Health';
      case 'FITBIT':
        return 'Fitbit';
      case 'GARMIN':
        return 'Garmin';
      case 'STRAVA':
        return 'Strava';

      case 'GOVT_OWNED_ENTITY':
        return 'Govt Owned Entity';
      case 'LOCAL_PRIVATE_LIMITED_COMPANY':
        return 'Local Private Limited Company';
      case 'LOCAL_PUBLIC_LIMITED_COMPANY':
        return 'Local Public Limited Company';
      case 'MNC_PRIVATE_LIMITED_COMPANY':
        return 'MNC Private Limited Company';
      case 'MNC_PUBLIC_LIMITED_COMPANY':
        return 'MNC Public Limited Company';
      case 'PARTNERSHIP_FIRM':
        return 'Partnership Firm';
      case 'STARTUP':
        return 'Startup';
      default:
        return '-'
    }
  }
}
