const LOCAL_PATH: string = "/assets/json/";
const ADMIN_BASE: string = 'admin';
const USER_BASE: string = 'user';
const CITY_BASE: string = 'city';
const CLIENT_CLUB_BASE: string = 'client';
const CLUB_BASE: string = 'club';
const BOOKING_BASE: string = 'booking';
const CLASS_BASE: string = 'class';
const INTEREST_BASE: string = 'profile-interest';
const CATEGORY_BASE: string = 'category';
const EVENT_BASE: string = 'event';
const ARTICLE_BASE: string = 'article';
const REWARD_BASE: string = 'reward';
const DISCOUNT_BASE: string = 'discount-code';
const AGE_CALCULATOR_BASE: string = 'bioage-question';
const CHALLENGE_BASE: string = 'challenge';
const GROUP_BASE: string = 'squad';
const LIVWELL_VIDEO_BASE: string = 'video';
const BOARD_BASE: string = 'board';
const POST_BASE: string = 'post';
const PAYMENT_BASE: string = 'payment';
const VERSION_BASE: string = 'version';
const BADGE_BASE: string = 'badge';
const BANNER_BASE: string = 'banner';
const CORPORATE_BASE: string = 'corporate';
const SUB_ADMIN_BASE: string = 'subadmin';
const CMS_BASE: string = 'content';
const BLOCKCHAIN_BASE: string = 'blockchain';
const STORY_BASE: string = 'story';
const REELS_BASE: string = 'reels';
const AUDIT_LOG_BASE: string = 'audit-log';
const URBOX_BASE: string = 'urbox';
const SELES_TRACK_BASE: string = 'referral-program';
const MFA_FACTOR_BASE = 'twofactorcode'
const CHARITY_BASE: string = 'charity';
const QUICKLINK_BASE: string = 'quick-links';
const DEEPLINKS_BASE: string = 'deep-links';
const FITNESS_REELS_BASE: string = 'fitness/reels';
const REFERRER_TRACK_BASE: string = 'referrer';
const SPIN_WHEEL_BASE: string = 'spin/wheel';
const SUBSCRIPTION_FETURES_BASE: string = 'subscription/feature';
const PRODUCT_BASE: string = 'products';



/**
 * @LOCAL_COUNTRY_CODES_LIST
 */
export const LOCAL_COUNTRY_WITH_CODE = `${LOCAL_PATH}Country.json`;

/**
 * @ACCOUNT_RELATED_END_POINTS
 */
export const LOGIN_API = `${ADMIN_BASE}/login`;
export const LOGOUT_API = `${ADMIN_BASE}/logout`;
export const FORGOT_PASSWORD_API = `${ADMIN_BASE}/forgot-password`;
export const RESET_PASSWORD_API = `${ADMIN_BASE}/reset-password`;
export const CHANGE_PASSWORD_API = `${ADMIN_BASE}/change-password`;
export const ADMIN_INFO_API = `${ADMIN_BASE}/info`;

/**
 * @DASHBOARD_RELATED_END_POINTS
 */
export const DASHBOARD_API = `${ADMIN_BASE}/dashboard`;

/**
 * @USER_RELATED_END_POINTS
 */
export const USERS_API = `${ADMIN_BASE}/user-list`;
export const USER_DETAILS_API = `${ADMIN_BASE}/user-details`;
export const BLOCK_UNBLOCK_USER_API = `${ADMIN_BASE}/block-user`;
export const USERS_REPORT_API = `${USER_BASE}/export`;

/**
 * @BLOCKCHAIN_RELATED_END_POINTS
 */
export const BLOCKCHAIN_CHALLENGE_DATA_API = `${BLOCKCHAIN_BASE}/challenge-data`;
export const BLOCKCHAIN_HEALTH_DATA_API = `${BLOCKCHAIN_BASE}/health-data`;

/**
 * @CATEGORY_RELATED_END_POINTS
 */
export const CATEGORY_API = `${CATEGORY_BASE}`;
export const CATEGORY_DETAILS_API = `${CATEGORY_BASE}/details`;

/**
 * @PROFILE_INTEREST_RELATED_END_POINTS
 */
export const INTEREST_API = `${INTEREST_BASE}`;
export const INTEREST_DETAILS_API = `${INTEREST_BASE}/details`;

/**
 * @CLASS_RELATED_END_POINTS
 */
export const CLASS_API = `${CLASS_BASE}`;
export const CLASS_DETAIL_API = `${CLASS_BASE}/details`;
export const BOOKED_CLASS_USERS_API = `${BOOKING_BASE}/by-class`;
export const CLASS_IMPORT_API = `${CLASS_BASE}/import`;
export const SAMPLE_EXPORT_API = `${CLASS_BASE}/export-sample`;
export const PARTICIPANTS_EXPORT_API = `${BOOKING_BASE}/export-participant`;
export const CITY_API = `${CITY_BASE}`;

/**
 * @EVENTS_RELATED_END_POINTS
 */
export const EVENT_API = `${EVENT_BASE}`;
export const EVENT_DETAIL_API = `${EVENT_BASE}/details`;

/**
 * @ARTICLES_RELATED_END_POINTS
 */
export const ARTICLE_API = `${ARTICLE_BASE}`;
export const ARTICLE_DETAIL_API = `${ARTICLE_BASE}/details`;

/**
 * @REWARDS_RELATED_END_POINTS
 */
export const REWARD_API = `${REWARD_BASE}`;
export const REWARD_BY_CATEGORY_ID_API = `${REWARD_BASE}/by-categoryId`;
export const REWARD_DETAIL_API = `${REWARD_BASE}/details`;
export const REWARD_REPORT_API = `${REWARD_BASE}/export`;
export const REWARD_REDEEM_API = `${REWARD_BASE}/redeem`;
export const REWARD_REDEEM_REPORT_API = `${REWARD_BASE}/redeem/export`;
export const REWARD_DEALSOFTHEDAY_API = `${REWARD_BASE}/dealsOfTheDay`;


/**
 * @PROMO_CODE_RELATED_END_POINTS
 */
export const PROMO_CODE_REWARD_API = `${REWARD_BASE}/list`;
export const PROMO_CODE_USER_API = `${REWARD_BASE}/user-list`;
export const PROMO_CODE_APPLY_API = `${REWARD_BASE}/assign-couponcode`;

/**
 * @AGE_CALCULATOR_RELATED_END_POINTS
 */
export const AGE_CALCULATOR_API = `${AGE_CALCULATOR_BASE}`;
export const AGE_CALCULATOR_DETAIL_API = `${AGE_CALCULATOR_BASE}/details`;

/**
 * @SPECIAL_OFFERS_RELATED_END_POINTS
 */
export const SPECIAL_OFFERS_API = `${DISCOUNT_BASE}`;
export const OFFER_DETAIL_API = `${DISCOUNT_BASE}/details`;

/**
 * @CHALLENGES_RELATED_END_POINTS
 */
export const CHALLENGE_API = `${CHALLENGE_BASE}`;
export const CHALLENGE_DETAIL_API = `${CHALLENGE_BASE}/details`;
export const CHALLENGE_BADGES_API = `${CHALLENGE_BASE}/badge`;
export const CHALLENGE_PARTICIPANT_USERS_API = `${CHALLENGE_BASE}/participants`;
export const CHALLENGE_REPORT_API = `${CHALLENGE_BASE}/export`;
export const CHALLENGE_PARTICIPANT_USERS_REPORT_API = `${CHALLENGE_BASE}/participants/export`;
export const FITNESS_REELS_REPORT_API = `${FITNESS_REELS_BASE}/export`;

/**
 * @GROUPS_RELATED_END_POINTS
 */
export const GROUP_API = `${GROUP_BASE}`;
export const GROUP_DETAIL_API = `${GROUP_BASE}/details`;
export const GROUP_PARTICIPANT_USERS_API = `${GROUP_BASE}/participants`;

/**
 * @BADGES_RELATED_END_POINTS
 */
export const BADGE_API = `${BADGE_BASE}`;
export const BADGE_DETAIL_API = `${BADGE_BASE}/details`;
export const BADGES_EARNED_API = `${BADGE_BASE}/by-user`;

/**
 * @BANNERS_RELATED_END_POINTS
 */
export const BANNER_API = `${BANNER_BASE}`;
export const BANNER_DETAIL_API = `${BANNER_BASE}/details`;

/**
 * @CORPORATES_RELATED_END_POINTS
 */
export const CORPORATE_API = `${CORPORATE_BASE}`;
export const CORPORATE_DETAIL_API = `${CORPORATE_BASE}/details`;

/**
 * @HEALTH_SCORE_RELATED_END_POINTS
 */
export const HEALTH_SCORE_API = `${CORPORATE_BASE}/health-weightage`;

/**
 * @PARENT_CLUBS_RELATED_END_POINTS
 */
export const CLIENT_CLUB_API = `${CLIENT_CLUB_BASE}`;
export const CLIENT_CLUB_DETAIL_API = `${CLIENT_CLUB_BASE}/details`;
export const POINTS_DISTRIBUTION_API = `${CLIENT_CLUB_BASE}/points-distribution`;
export const POINTS_DISTRIBUTION_REPORT_API = `${CLIENT_CLUB_BASE}/points-distribution/export`;

/**
 * @CLUBS_RELATED_END_POINTS
 */
export const CLUB_API = `${CLUB_BASE}`;
export const PARENT_CLUB_API = `${CLUB_BASE}/client`;
export const CLUB_DETAIL_API = `${CLUB_BASE}/details`;
export const CLUB_REPORT_API = `${CLUB_BASE}/export`;

/**
 * @POINTS_DISTRIBUTION_RELATED_END_POINTS
 */
export const LWC_API = `${ADMIN_BASE}/ads-points`;

/**
 * @PER_STEP_LWC_DISTRIBUTION_RELATED_END_POINTS
 */
export const PER_STEP_LWC_API = `${ADMIN_BASE}/steps-lwc`;

/**
 * @POINTS_DISTRIBUTION_HISTORY_RELATED_END_POINTS
 */
export const LWC_HISTORY_API = `${USER_BASE}/lwc-distribution`;
export const CLIENT_DROPDOWN_API = `${CLIENT_CLUB_BASE}/dropdown`;
export const CORPORATE_DROPDOWN_API = `${CORPORATE_BASE}/dropdown`;
export const LWC_HISTORY_REPORT_API = `${USER_BASE}/lwc-distribution/export`;

/**
 * @LIVWELL_VIDEOS_RELATED_END_POINTS
 */
export const LIVWELL_VIDEO_API = `${LIVWELL_VIDEO_BASE}`;
export const LIVWELL_VIDEO_DETAIL_API = `${LIVWELL_VIDEO_BASE}/details`;

/**
 * @BOARDS_RELATED_END_POINTS
 */
export const BOARD_API = `${BOARD_BASE}`;
export const BOARD_DETAIL_API = `${BOARD_BASE}/details`;

/**
 * @POSTS_RELATED_END_POINTS
 */
export const POST_API = `${POST_BASE}`;
export const POST_DETAIL_API = `${POST_BASE}/details`;

/**
 * @PAYMENTS_RELATED_END_POINTS
 */
export const PAYMENT_API = `${PAYMENT_BASE}`;
export const PAYMENT_DETAIL_API = `${PAYMENT_BASE}/details`;

/**
 * @LIVWELL_VIDEOS_RELATED_END_POINTS
 */
export const VERSION_API = `${VERSION_BASE}`;
export const VERSION_DETAIL_API = `${VERSION_BASE}/details`;

/**
 * @SUB_ADMINS_RELATED_END_POINTS
 */
export const SUB_ADMIN_API = `${ADMIN_BASE}/${SUB_ADMIN_BASE}`;
export const SUB_ADMIN_DETAIL_API = `${ADMIN_BASE}/${SUB_ADMIN_BASE}/details`;
export const SUB_ADMIN_LOGS_API = `${ADMIN_BASE}/${SUB_ADMIN_BASE}/logs`;

/**
 * @CMS_AND_FAQ_RELATED_END_POINTS
 */
export const CMS_API = `${CMS_BASE}`;
export const FAQ_API = `${CMS_BASE}/faq`;
export const FAQ_DETAIL_API = `${CMS_BASE}/faq/details`;
export const CMS_DETAIL_API = `${CMS_BASE}/details`;

/**
 * @UN_AUTH_CMS_RELATED_END_POINTS
 */
export const UN_AUTH_CMS_DETAIL_API = `${CMS_BASE}/view`;


/**
 * @STORIES_RELATED_END_POINTS
 */
export const STORY_API = `${STORY_BASE}`;
export const STORY_DETAIL_API = `${STORY_BASE}/details`;


/**
 * @REELS_RELATED_END_POINTS
 */
 export const REELS_API = `${REELS_BASE}`;
 export const REELS_DETAIL_API = `${REELS_BASE}/details`;
 

/**
 * @AUDIT_LOG_RELATED_END_POINTS
 */
export const AUDIT_LOG_API = `${AUDIT_LOG_BASE}`;


/**
 * @URBOX_RELATED_END_POINTS
 */
export const URBOX_API = `${URBOX_BASE}`;


/**
 * @SELES_TRACKER_RELATED_END_POINTS
 */
export const SELSES_TRACK_API = `${SELES_TRACK_BASE}`;
export const SELSES_TRACK_REPORT_API = `${SELES_TRACK_BASE}/export`;
export const SELSES_TRACK_LIST_API = `${SELES_TRACK_BASE}/tracklist`;
export const SELSES_TRACK_MAIL_LIST_API = `${SELES_TRACK_BASE}/reportmails`;

/**
 * @MFA_FACTOR_RELATED_END_POINTS
 */
export const MFA_SEND_CODE_API = `${MFA_FACTOR_BASE}/send`;
export const MFA_VALIDATE_CODE_API = `${MFA_FACTOR_BASE}/validate`;
// export const MFA_SEND_CODE_API = 'totp-secret';

/**
 * @CHARITY_RELATED_END_POINTS
 */
export const CHARITY_API = `${CHARITY_BASE}`;
export const CHARITY_DETAIL_API = `${CHARITY_BASE}/details`;



/**
 * @QUICKLINKS_RELATED_END_POINTS
 */
 export const QUICKLINK_API = `${QUICKLINK_BASE}`;
 export const QUICKLINK_DETAIL_API = `${QUICKLINK_BASE}/details`;
 
 /**
 * @DEEPLINKS_RELATED_END_POINTS
 */
export const DEPPLINKS_API = `${DEEPLINKS_BASE}`;
export const DEEPLINKS_DETAIL_API = `${DEEPLINKS_BASE}/details`;


/**
 * @FITNESS_REELS_RELATED_END_POINTS
 */
 export const FITNESS_REELS_API = `${FITNESS_REELS_BASE}`;
 export const FITNESS_REELS_DETAIL_API = `${FITNESS_REELS_BASE}/details`;
 export const FITNESS_REELS_CATEGORY_API = `${FITNESS_REELS_BASE}/category`;
 
 /**
 * @REFERRER_TRACKER_RELATED_END_POINTS
 */
export const REFERRER_TRACK_API = `${REFERRER_TRACK_BASE}`;
export const REFERRER_TRACK_REPORT_API = `${REFERRER_TRACK_BASE}/export`;
export const REFERRER_TRACK_LIST_API = `${REFERRER_TRACK_BASE}/tracklist`;
export const REFERRER_TRACK_MAIL_LIST_API = `${REFERRER_TRACK_BASE}/reportmails`;

/**
 * @SPIN-WHEEL_RELATED_END_POINTS
 */
 export const SPIN_WHEEL_API = `${SPIN_WHEEL_BASE}`;
 export const SPIN_WHEEL_DETAIL_API = `${SPIN_WHEEL_BASE}/details`;
 
/**
 * @FITNESS_REELS_RELATED_END_POINTS
 */
 export const SUBSCRIPTION_FETURES_API = `${SUBSCRIPTION_FETURES_BASE}`;
 export const SUBSCRIPTION_FETURES_DETAIL_API = `${SUBSCRIPTION_FETURES_BASE}/details`;

 /**
 * @PRODUCTS_RELATED_END_POINTS
 */
  export const PRODUCT_API = `${PRODUCT_BASE}`;
  export const PRODUCT_DETAIL_API = `${PRODUCT_BASE}/details`;