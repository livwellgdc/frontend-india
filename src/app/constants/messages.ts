export const ACCOUNT_ERROR_MESSAGES = {
  NAME_REQ: 'Please enter name',
  EMAIL_REQ: 'Please enter email address',
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_REQ: "Please enter password",
  INVALID_PASSWORD: "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, minimum 8 and maximum 20 characters",
  NO_SPACE_PASSWORD: "Password can't start or end with a blank space",
}

export const PASSWORD_ERROR_MESSAGES = {
  OLD_PASSWORD_REQ: "Please enter old password",
  INVALID_OLD_PASSWORD: "Old password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, minimum 8 and maximum 20 characters",
  NO_SPACE_OLD_PASSWORD: "Old password can't start or end with a blank space",
  NEW_PASSWORD_REQ: "Please enter new password",
  INVALID_NEW_PASSWORD: "New password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, minimum 8 and maximum 20 characters",
  NO_SPACE_NEW_PASSWORD: "New password can't start or end with a blank space",
  C_PASSWORD_REQ: "Please enter confirm new password",
  INVALID_C_PASSWORD: "Confirm new password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, minimum 8 and maximum 20 characters",
  NO_SPACE_C_PASSWORD: "Confirm new password can't start or end with a blank space",
  CONFORM_PASSWORD_MATCH_ERR: "New password and confirm new password not matched",
  OLD_NEW_PASSWORD_MATCH_ERR: "Old & New password can't be the same",
  WRONG_OLD_PASSWORD: "Entered old password was incorrect",
}


export const LISTING_COMMON_MESSAGES = {
  ACTIVE_TITLE: "Unblock Confirmation",
  ACTIVATE_TITLE: "Active Confirmation",
  BLOCK_TITLE: "Block Confirmation",
  INACTIVATE_TITLE: "Inactive Confirmation",
  DELETE_TITLE: "Delete Confirmation",
  APPROVE_TITLE: "Approve Confirmation",
  REJECT_TITLE: "Reject Confirmation",
  ACTIVE_MSG: "Are you sure you want to unblock?",
  ACTIVATE_MSG: "Are you sure you want to activate?",
  BLOCK_MSG: "Are you sure you want to block?",
  INACTIVATE_MSG: "Are you sure you want to inactivate?",
  DELETE_MSG: "Are you sure you want to delete?",
  ACTIVATE_CHECKBOX_MSG: "Are you sure you want to activate DealsOfTheDay?",
  INACTIVATE_CHECKBOX_MSG: "Are you sure you want to inactivate DealsOfTheDay?",
  APPROVE_MSG: "Are you sure you want to approve?",
  REJECT_MSG: "Are you sure you want to reject?",
};

export const LOGOUT_POPUP_MESSAGES = {
  TITLE: 'Logout Confirmation',
  MESSAGE: 'Are you sure you want to logout?',
};

export const URBOX_POPUP_MESSAGES = {
  TITLE: 'URBOX',
  MESSAGE: 'Are you sure you want to',
};

export const IMPORT_FILES_POPUP_MESSAGES = {
  TITLE: 'Import Confirmation',
  MESSAGE: 'Are you sure you want to import selected file?',
};

export const REASON_MESSAGE = {
  REASON_LIMIT: 500,
  REASON_EMPTY: (text: string) => `Please enter reason for ${text}`,
  REASON_MAX_LIMIT_MESSAGE: "Reason can not be more than 500 characters"
};

export const PROFILE_INTEREST_ERROR_MESSAGES = {
  INTEREST_NAME_REQ: 'Please enter profile interest name',
  INTEREST_CATEGORY: "Please select interest category",
};

export const PRODUCT_ERROR_MESSAGES = {
  PRODUCT_NAME_REQ: 'Please enter product name',
  PRODUCT_DESCRIPTION: "Please enter product description",
  PRODUCT_PRICE: "Please enter product price",
  PRODUCT_MANUFACTURER: "Please enter product manufacturer",
  PRODUCT_STATUS: "Please enter product status",
  PRODUCT_CATEGORY:"Please select product category"
};

export const CLASS_ERROR_MESSAGES = {
  CLASS_NAME_REQ: 'Please enter class name',
  CLASS_TYPE: "Please select class type",
  CLASS_START_DATE: "Please select class start date",
  CLASS_START_TIME: "Please select class start time",
  CLASS_END_TIME: "Please select class end time",
  CLASS_VENUE: "Please enter class venue details",
  CLASS_PARTICIPANTS: "Please enter total seats",
  CLASS_INVALID_PARTICIPANTS: "Total seats should be greater than Zero",
  CLASS_AVAILABLE_SEATS: "Please enter available seats & Save it",
  SEAT_IMAGE: "Please upload seat map image",
  TOTAL_SEATS_FIRST: "Please enter total seats first",
  CLASS_INVALID_SEATS: "Available seats should be greater than Zero",
  AVAILABLE_SEAT_GREATER: "Available seats should not be greater than total seats",
  CLASS_POINTS: "Please enter livwell points",
  CLASS_CATEGORY: "Please select class category",
  CLASS_ACCESS_TYPE: "Please select class access type",
  CLASS_INSTRUCTOR_NAME: "Please enter class instructor name",
  CLASS_CITY: "Please select class city",
  CLASS_CLUB: "Please select class club",
  CLASS_STUDIO: "Please select class studio",
  CLUB_CITY_SELECT: "Please select city first",
  CLASS_DIFFICULTY_LEVEL: "Please select class difficulty level",
  CLASS_DESCRIPTION: "Please enter class description",
  ALREADY_AVAILABLE_SEAT: "Entered Seat is already added, Please try with another seat.",
  PURCHASE_MONEY: "Please Entered money value.",
  PURCHASE_DENOMINATION_TYPE: "Pleaase select purchase type ",
  VIDEO_CONFERNCE_LINK: "Please provid video conference link",
  AVAIL_SEAT_MORE_THAN_TOTAL_SEATS: "Available Seats slot is full, Please increase the total seats."
};

export const CHALLENGE_ERROR_MESSAGES = {
  CHALLENGE_NAME_REQ: 'Please enter challenge name',
  CHALLENGE_START_DATE: "Please select challenge start date",
  CHALLENGE_END_DATE: "Please select challenge end date",
  CHALLENGE_START_TIME: "Please select challenge start time",
  CHALLENGE_END_TIME: "Please select challenge end time",
  CHALLENGE_CATEGORY: "Please select category for challenge",
  CHALLENGE_BADGE: 'Please select badge',
  CHALLENGE_BADGE_FIRST: 'Please select badge first',
  CHALLENGE_POINT: 'Please enter point',
  CHALLENGE_TYPE: "Please select challenge type",
  CHALLENGE_WINNERS: "Please enter maximum winners",
  CHALLENGE_INVALID_WINNERS: "Maximun winners should be greater than Zero",
  CHALLENGE_TYPE_VALUE: "Please enter value",
  SELECT_CHALLENGE_TYPE_FIRST: "Select challenge type first",
  CHALLENGE_INVALID_TYPE_VALUE: "Value should be greater than Zero",
  CHALLENGE_VOUCHER: "Please select voucher",
  SELECT_BENEFIT_FIRST: 'Please select livwell benefit first',
  CHALLENGE_DESCRIPTION: "Please enter challenge description",
  CHALLENGE_ACCESS_TYPE: "Please select challenge access type",
  JOINED_DATE: "Please select joined date",
  VISIBILITY_UP_TO: "Please enter visibilty days",
  INVALID_VISIBILITY_UP_TO: "Days should be greater than Zero",
  CHALLENGE_CHARITY_ENTRY_FEES: "Please enter entry fees"
};

export const GROUP_ERROR_MESSAGES = {
  NAME_REQ: 'Please enter group name',
  SHORT_NAME_REQ: "Please enter group short name",
  JOIN_LIMIT: "Please enter group limit to join",
  INVALID_JOIN_LIMIT: "Limit should be greater than Zero",
  GRP_PRIVACY: "Please select group privacy"
};

export const AGE_ERROR_MESSAGES = {
  QUES_REQ: 'Please enter question',
  ANS_REQ: "Please enter answer",
  PERCENTAGE_REQ: "Please enter percentage for answer",
  INVALID_PERCENTAGE: "Percentage should be greater than Zero",
  MAX_PERCENTAGE: "Percentage should not be greater than 100 %",
};

export const EVENT_ERROR_MESSAGES = {
  EVENT_NAME_REQ: 'Please enter event name',
  EVENT_START_DATE: "Please select event start date",
  EVENT_END_DATE: "Please select event end date",
  EVENT_START_TIME: "Please select event start time",
  EVENT_END_TIME: "Please select event end time",
  EVENT_LOCATION: "Please select event location",
  EVENT_CATEGORY: "Please select event category",
  EVENT_VOUCHER_TYPE: "Please select event voucher type",
  EVENT_WEB_LINK: "Please enter event website link",
  INVALID_EVENT_WEB_LINK: "Please enter valid website link",
  EVENT_ENROLMENT_LINK: "Please enter event enrolment link",
  INVALID_EVENT_ENROLMENT_LINK: "Please enter valid enrolment link",
  EVENT_DESCRIPTION: "Please enter event description"
};

export const REWARD_ERROR_MESSAGES = {
  REWARD_NAME_REQ: 'Please enter reward name',
  COLOR_CODE_REQ:"Please enter color code",
  SPONSOR_NAME_REQ: 'Please enter sponsor name',
  SPONSOR_NAME_MIN_LENGTH: 'Sponsor name should be atleast of 3 letters',
  REWARD_DATE: "Please select reward validity date",
  COUPON_VALIDITY: "Please enter coupon validity",
  INVALID_COUPON_VALIDITY: "Days should be greater than Zero",
  INVALID_DISCOUNT: "Discount should be greater than Zero",
  MAX_DISCOUNT: "Discount should not be greater than 100 %",
  REWARD_CATEGORY: "Please select livwell benefit category",
  REWARD_TYPE: "Please select reward type",
  TOTAL_POINT: "Please enter total point",
  INVALID_TOTAL_POINT: "Total points should be greater than Zero",
  MANUAL_CODE_TITLE: 'Generate Manual Coupon Code',
  MIN_MANUAL_CODE: 'Import atleast one manual coupon code',
  REWARD_LINK: "Please enter reward link",
  REDEMPTION_REQ: 'Please enter coupon quantity',
  INVALID_REDEMPTION: "Quantity should be greater than Zero",
  INVALID_REWARD_LINK: "Please enter valid reward link",
  SELECT_REWARD_FIRST: 'Please select reward type first',
  REWARD_DESCRIPTION: "Please enter reward description",
  REWARD_INSTRUCTION: "Please enter reward instruction",
  PRIVACY_HINT: "Private reward is only for promo codes",
  LOCATION_REQ: 'Please check location'
};

export const PROMO_CODE_ERROR_MESSAGES = {
  REWARD_REQ: 'Please select reward',
  USER_REQ: "Please select atleast one user",
  PROMO_NOTE: (MAX = 100) => `Note - You can't select more than ${MAX} users at a time`,
  PROMO_ERROR: "You can't select users more than the coupon availability count",
  MAX_USER_COUNT: 100
};

export const OFFER_ERROR_MESSAGES = {
  NAME_REQ: 'Please enter offer name',
  TYPE_REQ: 'Please select offer type',
  DISCOUNT_REQ: 'Please enter discount',
  VALIDITY_REQ: 'Please select offer validity date',
  OFFER_QUANTITY: 'Please enter offer quantity',
  INVALID_DISCOUNT: "Discount should be greater than Zero",
  MAX_DISCOUNT: "Discount should not be greater than 100 %",
  QUANTITY_REQ: 'Please enter offer quantity',
  INVALID_QUANTITY: 'Offer quantity should be greater than Zero',
  LIMIT_REQ: 'Please enter limit',
  OFFER_CODE_REQ: 'Please enter offer code',
};

export const ARTICLE_ERROR_MESSAGES = {
  ARTICLE_TITLE_REQ: 'Please enter article title',
  ARTICLE_CATEGORY: "Please select article category",
  ARTICLE_LINK: "Please enter article link",
  INVALID_ARTICLE_LINK: "Please enter valid article link",
  ARTICLE_DESCRIPTION: "Please enter article description"
};

export const BADGE_ERROR_MESSAGES = {
  BADGE_REQ: 'Please enter badge name',
  BADGE_POINT: "Please enter point",
  BADGE_DESCRIPTION: "Please enter badge description"
};

export const BOARD_ERROR_MESSAGES = {
  NAME_REQ: 'Please enter board name',
  DESCRIPTION_REQ: "Please enter board description"
};

export const POST_ERROR_MESSAGES = {
  NAME_REQ: 'Please enter post title',
  BOARD_REQ: 'Please select board board',
  DESCRIPTION_REQ: "Please enter post description",
  EXTERNAL_LINK: "Please enter external link",
  INVALID_EXTERNAL_LINK: "Please enter valid external link",
};

export const BANNER_ERROR_MESSAGES = {
  BANNER_REQ: 'Please enter banner title',
  BANNER_LINK: "Please enter banner link",
  BANNER_TYPE_REQ: "Please select banner type",
  INVALID_BANNER_LINK: "Please enter valid banner link",
  DEEP_LINK_TYPE:"Please enter deep link "
};

export const CORPORATE_ERROR_MESSAGES = {
  CORPORATE_NAME: 'Please enter corporate name',
  CORPORATE_TAX: 'Please enter corporate tax code',
  CORPORATE_ADMINISTRATOR_NAME: 'Please enter administrator name',
  CORPORATE_ADMINISTRATOR_EMAIL: 'Please enter administrator email',
  CORPORATE_ADMINISTRATOR_PHONE: 'Please enter phone number',
  MIN_MOB_NO: "Phone number should be of atleast 9 digits",
  INVALID_MOB_NO: "Please enter valid phone number",
  INVALID_EMAIL: 'Please enter a valid email address',
  CORPORATE_CATEGORY_REQ: 'Please enter corporate category name',
  CORPORATE_POINT: "Please enter purchased coins",
  INVALID_CORPORATE_POINT: "Purchased coins should be greater than Zero",
  DISTRIBUTED_POINT: "Please enter coins to be distributed for user",
  POINTS_FREQUENCY: "Please select coins distribution frequency",
  COMPANY_TYPE: "Please select company type",
  EMPLOYEE_RANGE: "Please select range",
  INDUSTRY_REQ: "Please select industry",
  REGISTERED_LOCATION: "Please select location",
  CLASS_CITY: "Please select class city",
  CORPORATE_DOMAIN: "Please enter corporate domain name",
  DUPLICATE_CORPORATE_DOMAIN: "Please remove duplicate domain name",
  DUPLICATE_LOCATION: "Please remove duplicate location",
  POINT_START_DATE: "Please select coins distribution start date",
  POINT_END_DATE: "Please select coins distribution end date",
  DISTRIBUTION_POINT_ERROR: "Coins for distribution can't be more than purchased coins"
};

export const HEALTH_SCORE_ERROR_MESSAGES = {
  STEP_REQ: 'Please enter step weightage %',
  KM_REQ: 'Please enter km weightage %',
  CHALLENGE_REQ: 'Please enter challenge taken weightage %',
  BMI_REQ: 'Please enter bmi weightage %',
  POINT_REQ: 'Please enter points weightage %',
  GREATER_THAN_100: "Corporate health weightage shouldn't more than 100 %",
  LESS_THAN_100: "Corporate health weightage shouldn't less than 100 %"
};

export const CLUB_ERROR_MESSAGES = {
  CLUB_NAME_REQ: 'Please enter club name',
  CLUB_SHORT_NAME_REQ: 'Please enter club short name',
  MIN_SHORT_NAME_REQ: 'Club short name should be of atleast 3 characters',
  INVALID_SHORT_NAME_NO: "Only Alphabet are allowed",
  CITY_REQ: 'Please select city',
  SELECT_CLIENT_CLUB: "Please select client",
  CLUB_MOB_NO: "Please enter club contact number",
  MIN_MOB_NO: "Contact number should be of atleast 9 digits",
  INVALID_CLUB_MOB_NO: "Please enter valid club contact number",
  CLUB_LOCATION: "Please select club address",
};

export const CLIENT_CLUB_ERROR_MESSAGES = {
  CLIENT_CLUB_NAME_REQ: 'Please enter client name',
  CLIENT_CLUB_POINT: "Please enter purchase points",
  INVALID_CLUB_POINT: "Purchase points should be greater than Zero",
  DISTRIBUTION_POINT: "Please enter points distribution",
  POINT_START_DATE: "Please select points distribution start date",
  POINT_END_DATE: "Please select points distribution end date",
  CLUB_POINTS_FREQUENCY: "Please select points distribution frequency",
  ALL_MEMBERS_POINT: "All Members points distribution should be less than or equal to points purchase",
  MEMBERS_POINT: "Members points distribution should be less than or equal to points purchase",
  NON_MEMBERS_POINT: "Non Members points distribution should be less than or equal to points purchase",
  CENTURION_MEMBERS_POINT: "Centurion Members points distribution should be less than or equal to points purchase",
  PURCHASE_POINT: "Total sum of points distribution should be less than or equal to points purchase",
  MEMBERS: "MEMBERS",
  NON_MEMBERS: "NON_MEMBERS",
  CENTURION_MEMBERS: "CENTURION_MEMBERS",
  ICONIC_MEMBERS: "ICONIC_MEMBERS"
};

export const LIVWELL_VIDEOS_ERROR_MESSAGES = {
  VIDEO_TITLE_REQ: 'Please enter title',
  VIDEO_CATEGORY_TYPE: 'Please select video category',
  VIDEO_POINT: 'Please enter point for deduction',
  VIDEO_LINK: "Please enter video link",
  INVALID_VIDEO_LINK: "Please enter valid video link",
  VIDEO_DESCRIPTION: "Please enter video description"
};

export const VERSION_ERROR_MESSAGES = {
  VERSION_NAME_REQ: 'Please enter version name',
  CURRENT_VERSION_REQ: 'Please enter current version',
  PLATFORM_REQ: "Please select platform",
  VERSION_UPDATE_TYPE_REQ: "Please select update type",
};

export const SUB_ADMINS_ERROR_MESSAGES = {
  NAME_REQ: 'Please enter sub admin name',
  EMAIL_REQ: 'Please enter email address',
  INVALID_EMAIL: 'Please enter a valid email address',
};

export const CATEGORY_ERROR_MESSAGES = {
  CATEGORY_NAME_REQ: 'Please enter category name',
  CATEGORY_ACCESS_TYPE: "Please select category access type",
  CHALLENGE_CATEGORY_TYPE: "Please select challenge category type",
  CHALLENGE_CHARITY: "Please select charity",
  CHALLENGE_CHARITY_ENTRY_FEES: "Please enter entry fees"
}

export const FAQ_ERROR_MESSAGES = {
  QUESTION_REQ: 'Please enter question',
  ORDER_REQ: 'Please enter question display order',
  INVALID_ORDER: 'Question display order should be greater than Zero',
  ANSWER_REQ: 'Please enter answer'
}

export const EDITOR_COMMON_MESSAGES = {
  CONTENT_REQ: 'Please fill some information about page',
  CMS_ACTION: (action: string) => `Content ${action} successfully`
}

export const INVALID_DATE_TIME_ERROR = {
  INVALID_DATE: "Please select valid date",
  INVALID_TIME: "Please select valid time",
}

export const STORY_ERROR_MESSAGES = {
  STORY_NAME_REQ: 'Please enter story name',
  STORY_START_DATE: "Please select story start date",
  STORY_END_DATE: "Please select story expiry date",
  STORY_START_TIME: "Please select story start time",
  STORY_END_TIME: "Please select story expiry time",
  STORY_ACCESS_TYPE: "Please select story access type",
  STORY_LINK_ACCESS_TYPE: "Please select story link access type",
  STORY_LINK_INTERNAL: "Please select story link",
  STORY_LINK_EXTERNAL: "Please enter story link",
  STORY_DURATION_TIME: "Please enter story dispaly duration time"
};

export const REELS_ERROR_MESSAGES = {
  REELS_THUMBNAIL_REQ: 'Please enter upload thumbnail',
  REELS_VIDEO_REQ: 'Please enter upload video',
  REELS_NAME_REQ: 'Please enter reels name',
  REELS_DESCRIPTION_REQ: 'Please enter reels name',
};


export const SELES_TRACKER_ERROR_MESSAGES = {
  REFERRER_NAME_REQ: 'Please enter referrer name',
  LWC_CREDIT_REQ: 'Please enter LWC credit',
  REFER_CODE_REQ: 'Please enter refer code',
  LIMIT_REQ: 'Please enter limit',
  MIN_MANUAL_CODE: 'Import atleast one manual coupon code',
  REDEMPTION_REQ: 'Please enter coupon quantity',
  INVALID_REDEMPTION: "Quantity should be greater than Zero"
};

export const REPORT_EXPORT_TYPE = {
  DOWNLOAD: "DOWNLOAD",
  SENDMAIL: "SWNDMAIL"
};

export const CHARITY_ERROR_MESSAGES = {
  CHARITY_NAME_REQ: 'Please enter charity name',
  EMAIL_REQ: 'Please enter email address',
  INVALID_EMAIL: 'Please enter a valid email address',
  CHARITY_MOB_NO: "Please enter charity contact number",
  MIN_MOB_NO: "Contact number should be of atleast 9 digits",
  INVALID_CHARITY_MOB_NO: "Please enter valid charity contact number",
  CHARITY_LOCATION: "Please select charity address",
  CHARITY_DESCRIPTION: "Please enter charity description",
  CHARITY_LINK: "Please enter charity link",
};

export const QUICK_lINK_ERROR_MESSAGES = {
  NAME_REQ: 'Please enter name',
  PRIORITY_REQ: 'Please enter priority',
  DEEP_LINK: "Please select deep link URL",
  DEEP_LINK_TYPE: "Please enter deep link type",
  CATEGORY_REQ: "Please select category",
  COLOR_CODE: "Please enter color code",
  QUICK_LINK_DESCRIPTION: "Please enter quick link description",
};

export const DEEP_LINK_ERROR_MESSAGES = {
  NAME_REQ: 'Please enter name',
  URL_REQ: 'Please enter url'
};

export const SPIN_WHEEL_ERROR_MESSAGES = {
  TITLE_REQ: 'Please enter title',
  VALUE_REQ: 'Please enter value',
  WEIGHT_REQ: 'Please enter weight',
  DESCRIPTION_REQ: 'Please enter description'
}

export const SUBSCRIPTION_FEATURE_ERROR_MESSAGES = {
  FEATURE_REQ: 'Please select feature name',
  PLAN_REQ: 'Please select subscription plan',
  VALUE_REQ: 'Please enter value',
  DISPLAY_REQ: 'Please enter display',
  DESCRIPTION_REQ: 'Please enter description',
};

export const DEFAULT_COUNTRY_CODE = "+84";
export const INVALID_ID_ERROR = 'Invalid ID';
export const DATA_NOT_FOUND = 'Data not found';
export const NOT_UPDATED = "You can't update codes"
export const MAP_LOCATION_ERROR = 'Oops! Something went wrong. Please select location';
export const NO_ACTION = "You can't perform this action";
export const NO_EDIT_ACTION = (pageType = 'class') => `You can't update this ${pageType}`;
export const SOMETHING_WRONG = 'Something went wrong. Please try again';
export const S3_BUCKET_ERROR = 'Network Failure or Sync up your system clock';
export const OFFLINE = 'Connection lost! You are not connected to Internet';
export const ONLINE = 'Back to online';
export const NO_INTERNET = 'No Internet Connection';
export const TIME_OUT = 'Connection timed out. Please retry';
export const INTERNAL_SERVER_ERROR = "Couldn't connect to the server. Please try again";
export const SELECT_VALID_FILE = "Please select Csv file";
export const VALID_CSV_FILE_SIZE = "Please select file of less than 5 MB";
export const VALID_CSV_FILE_HEADER = "Please write valid column header name(Match with sample csv)";
export const CORPORATE_CREATED_MSG = "Corporate created successfully. \n A verification link has been sent to this email address.";


export const MAX_IMAGE_SIZE = 10;
export const MAX_VIDEO_SIZE = 30;
export const MAX_AUDIO_SIZE = 30;

export const CLASS_MEDIA_LIMITS = {
  MAX_POST_MEDIA: 1,
  MAX_POST_VIDEOS: 1
}

export const IMAGE_FORMAT = 'image/jpeg,image/png,image/jpg';
export const VIDEO_FORMAT = 'video/mp4,video/webm,video/ogg';
export const AUDIO_FORMAT = 'audio/wav,audio/mpeg,audio/mp3';
export const DOC_FORMAT = 'application/pdf';


export const POST_MEDIA_ERROR = `Only ${IMAGE_FORMAT} images and ${VIDEO_FORMAT} videos are allowed`;

export const ALL_MEDIA_ERROR = `Only ${IMAGE_FORMAT} images, ${VIDEO_FORMAT} videos and ${DOC_FORMAT} documents are allowed`;

export const invalidImageError = (format = 'jpeg/png') => `Only ${format} images are allowed`;
export const invalidVideoError = (format = 'mp4/webm/ogg') => `Only ${format} videos are allowed`;
export const invalidAudioError = (format = 'mp3/wav/mpeg') => `Only ${format} audios are allowed`;

export const invalidFileSize = (size = 2) => `File size can not be more than ${size} MB`;

export const TIME_ERROR = {
  FUTURE_TIME: 'Please select future time',
  GREATER_TIME: 'End time should be greater than start time',
  SET_MIN_TIME: (time = 30) => `Set ${time} min time Interval from the start time`
}

export const CMS_TYPE = {
  TERM_CONDITION: "TERMS_AND_CONDITIONS",
  PRIVACY_POLICY: "PRIVACY_POLICY",
  CONTACT_US: "CONTACT_US",
  ABOUT_US: "ABOUT_US",
  FAQ: "FAQ"
}

export const DASHBOARD_TYPE = {
  LIVWELL: "LIVWELL",
  CORPORATE: "CORPORATE"
}

export const USER_STATUS = [
  { name: "Active", value: "UN_BLOCKED" },
  { name: "Blocked", value: "BLOCKED" }
];

export const STATUS = [
  { name: "Active", value: "UN_BLOCKED" },
  { name: "Inactive", value: "BLOCKED" }
];

export const FITNESS_REELS_STATUS_LIST = [
  { name: "Pending", value: "PENDING" },
  { name: "Approved", value: "APPROVED" },
  { name: "Rejected", value: "REJECTED" },
];

export const BOOKING_STATUS = [
  { name: "Pending", value: "PENDING" },
  { name: "Confirmed", value: "CONFIRMED" },
  { name: "Completed", value: "COMPLETE" },
  { name: "Cancelled", value: "CANCELLED" },
  { name: "Not Attended", value: "NOT_ATTENTED" }
];

export const CHALLENGE_PARTICIPANTS_STATUS = [
  { name: "Ongoing", value: "ONGOING" },
  { name: "Incomplete", value: "INCOMPLETE" },
  { name: "Completed", value: "COMPLETE" }
];

export const EVENT_STATUS = [
  { name: "Ongoing", value: "ONGOING" },
  { name: "Upcoming", value: "UPCOMING" },
  { name: "Expired", value: "EXPIRED" }
];

export const CLASS_TYPE = [
  { name: "Group X", value: "GROUPX" },
  { name: "Yoga", value: "YOGA" }
];

export const CLASS_PURCHASE_TYPE = [
  { name: "Money", value: "MONEY" },
  { name: "LWC", value: "LWC" }
]
export const REWARD_PRIVACY = [
  { name: "Public", value: "PUBLIC" },
  { name: "Private", value: "PRIVATE" }
];

export const GROUP_PRIVACY = [
  { name: "Public", value: "PUBLIC" },
  { name: "Corporate", value: "CORPORATE" }
];

export const CLASS_CREATED_BY = [
  { name: "FLG", value: "FLG" },
  { name: "ADMIN", value: "ADMIN" }
];

export const CHALLENGE_TYPE = [
  { name: "Steps", value: "STEPS" },
  { name: "Distance in Km", value: "KILOMETRES" },
  { name: "Class Booking", value: "CLASS_BOOKING" },
  { name: "Class Completed", value: "CLASS_COMPLETED" },
  { name: "Club Check In", value: "CHECK_IN_CLUB" },
  { name: "Premium Video Content", value: "VIDEO_CONTENT" }
];

export const OFFERS_TYPES = [
  { name: "Special Offers", value: "SPECIAL" },
  { name: "LivWell Offers", value: "LIVWELL" },
];

export const OFFERS_TYPES_OBJ = {
  SPECIAL: "SPECIAL",
  LIVWELL: "LIVWELL"
};

export const CHALANGE_STATUS = [
  { name: "Complete", value: "COMPLETE" },
  { name: "InComplete", value: "INCOMPLETE" },
  { name: "Ongoing", value: "ONGOING" },
  { name: "Upcoming", value: "UPCOMING" },
]

export const POINTS_EARNED_SPENDS_TYPE = [
  { name: "Sign Up", value: "SIGNUP" },
  { name: "Profile", value: "PROFILE" },
  { name: "Class Booking", value: "CLASS_BOOKING" },
  { name: "Challenge", value: "CHALLENGE" },
  { name: "Steps", value: "STEPS" },
  { name: "Badge", value: "BADGE" },
  { name: "Video Ads", value: "ADS" },
  { name: "Monthly Bonus", value: "MONTHLY_BONUS" },
  { name: "Referral Bonus", value: "REFERRAL_BONUS" },
  { name: "Reward Redemption", value: "REWARD" },
  { name: "Premium Video Content", value: "PREMIUM_VIDEO_CONTENT" }
];

export const POINTS_TYPE = [
  { name: "Earned", value: "EARNED" },
  { name: "Redeemed", value: "REDEEMED" }
];

export const INTEREST_CATGORY_TYPE = [
  { name: "Change the way I look", value: "CHANGE_THE_WAY_I_LOOK" },
  { name: "Change My Lifestyle", value: "CHANGE_MY_LIFESTYLE" },
  { name: "Challenge Myself", value: "CHALENGE_MYSELF" }
];

export const BADGE_TYPE = [
  { name: "Default Badges", value: "DEFAULT" },
  { name: "Created By Admin", value: "MANUAL" }
];

export const FREQUENCY = [
  { name: "None", value: "" },
  { name: "Daily", value: "DAILY" },
];

export const POINTS_DISTRIBUTION_FREQUENCY = [
  { name: "Once", value: "ONCE" },
  { name: "Once Every Month", value: "ONCE_EVERY_MONTH" },
];

export const ALL_INDUSTRIES = [
  { name: "Accounting", value: "Accounting" },
  { name: "Airlines / Aviation", value: "Airlines / Aviation" },
  { name: "Apparel / Fashion", value: "Apparel / Fashion" },
  { name: "Architecture / Planning", value: "Architecture / Planning" },
  { name: "Automotive", value: "Automotive" },
  { name: "Biotechnology / Greentech", value: "Biotechnology / Greentech" },
  { name: "Civic / Social Organization", value: "Civic / Social Organization" },
  { name: "Construction", value: "Construction" },
  { name: "Commercial Real Estate", value: "Commercial Real Estate" },
  { name: "Computer Software / Engineering / Hardware", value: "Computer Software / Engineering / Hardware" },
  { name: "Consumer Goods", value: "Consumer Goods" },
  { name: "Defense / Space", value: "Defense / Space" },
  { name: "Entertainment / Movie Production / Events Services", value: "Entertainment / Movie Production / Events Services" },
  { name: "Financial Services", value: "Financial Services" },
  { name: "Food / Beverages / Restuarants", value: "Food / Beverages / Restuarants" },
  { name: "Government Administration", value: "Government Administration" },
  { name: "Health / Fitness", value: "Health / Fitness" },
  { name: "Higher Education / Acadamia", value: "Higher Education / Acadamia" },
  { name: "Hospital / Health Care", value: "Hospital / Health Care" },
  { name: "Human Resources / HR", value: "Human Resources / HR" },
  { name: "Import / Export", value: "Import / Export" },
  { name: "Information Technology / IT", value: "Information Technology / IT" },
  { name: "Law Practice / Law Firms", value: "Law Practice / Law Firms" },
  { name: "Logistics / Procurement", value: "Logistics / Procurement" },
  { name: "Luxury Goods / Jewelry", value: "Luxury Goods / Jewelry" },
  { name: "Management Consulting", value: "Management Consulting" },
  { name: "Media / Marketing / Advertising / Sales / Market Research / PR", value: "Media / Marketing / Advertising / Sales / Market Research / PR" },
  { name: "Medical Practice / Hospitals", value: "Medical Practice / Hospitals" },
  { name: "Manufacturing", value: "Manufacturing" },
  { name: "Newspapers / Journalism", value: "Newspapers / Journalism" },
  { name: "Non-Profit / Volunteering", value: "Non-Profit / Volunteering" },
  { name: "Oil / Energy / Solar / Greentech", value: "Oil / Energy / Solar / Greentech" },
  { name: "Other Industry", value: "Other Industry" },
  { name: "Pharmaceuticals", value: "Pharmaceuticals" },
  { name: "Schools / University", value: "Schools / University" },
  { name: "Sports", value: "Sports" },
  { name: "Startup", value: "Startup" },
  { name: "Staffing / Recruiting", value: "Staffing / Recruiting" },
  { name: "Retail / Supermarkets", value: "Retail / Supermarkets" },
  { name: "Telecommunications", value: "Telecommunications" },
  { name: "Transportation", value: "Transportation" },
  { name: "Travel and Hospitality", value: "Travel and Hospitality" }
];

export const EMPLOYEE_RANGE = [
  { name: "1 - 10", value: "1-10" },
  { name: "11 - 30", value: "11-30" },
  { name: "30 - 50", value: "30-50" },
  { name: "50 - 100", value: "50-100" },
  { name: "100 - 300", value: "100-300" },
  { name: "300 - 500", value: "300-500" },
  { name: "1000 +", value: "1000+" }
];

export const COMPANY_TYPE = [
  { name: "Govt Owned Entity", value: "GOVT_OWNED_ENTITY" },
  { name: "Local Private Limited Company", value: "LOCAL_PRIVATE_LIMITED_COMPANY" },
  { name: "Local Public Limited Company", value: "LOCAL_PUBLIC_LIMITED_COMPANY" },
  { name: "MNC Private Limited Company", value: "MNC_PRIVATE_LIMITED_COMPANY" },
  { name: "MNC Public Limited Company", value: "MNC_PUBLIC_LIMITED_COMPANY" },
  { name: "Partnership Firm", value: "PARTNERSHIP_FIRM" },
  { name: "Startup", value: "STARTUP" },
];

export const COUPON_CODE_TYPE = [
  { name: "Auto Generate Code", value: "AUTO_GENERATE" },
  { name: "Import Codes", value: "MANUAL" }
];

export const REWARD_TYPE = [
  { name: "Point", value: "POINT" },
  { name: "Coupon", value: "COUPON" }
];

export const REWARD_HISTORY_TYPES = [
  { name: "Purchased", value: "PURCHASED" },
  { name: "Redeemed", value: "REDEEMED" },
  { name: "Earned", value: "EARNED" },
  { name: "Expired", value: "EXPIRED" }
];

export const ACCESS_TYPE = [
  { name: "All", value: "ALL" },
  { name: "Members Only", value: "MEMBERS" },
  { name: "Users Only", value: "USERS" }
];

export const CHALLENGE_ACCESS_TYPE = [
  { name: "All Users", value: "ALL" },
  // { name: "Pebble Users", value: "PEBBLE" }
];

export const CATEGORY_ACCESS_TYPE = [
  { name: "LivWell Users", value: "LW" },
  { name: "Premium Users", value: "ACTIVE" },
  { name: "Pebble Users", value: "PEBBLE"}
];

export const CHALLENGE_CATEGORY_TYPES = [
  { name: "CHALLENGE", value: "CHALLENGE" },
  { name: "SERIES", value: "SERIES" },
  { name: "GROUP", value: "GROUP" }
];

export const CHALLENGE_CATEGORY_TYPES_OBJECT = {
  CHALLENGE: "CHALLENGE",
  SERIES: "SERIES",
  GROUP: "GROUP"
};

export const CATEGORY_TYPE = {
  LIVWELL_BENEFITS: "LIVWELL_BENEFITS",
  GENERIC_CATEGORIES: "GENERIC_CATEGORIES",
  CLASS: "CLASS",
  EVENT: "EVENT",
  CHALLENGE: "CHALLENGE",
  PRODUCTS_STORE:"PRODUCTS_STORE"
};

export const STORY_ACCESS_TYPE = [
  { name: "All Users", value: "ALL" },
  { name: "CFYC Users", value: "FLG" }
];

export const STORY_LINK_ACCESS_TYPE = [
  { name: "INTERNAL", value: "internal" },
  { name: "EXTERNAL", value: "external" }
];

export const DEEPLINK_TYPES = [
  { name: "INTERNAL", value: "INTERNAL" },
  { name: "EXTERNAL", value: "EXTERNAL" }
];

export const BANNER_TYPES = [
  { name: "HOME", value: "HOME" },
  { name: "REWARD", value: "REWARD" },
  {name:"PRODUCT STORE", value:"PRODUCTS_STORE"}
];




export const DEEPLINK_URLS = [
  { name: "CLASSES", value: "open://livwell/classScreen" },
  { name: "VIDEOS", value: "open://livwell/videosScreen" },
  { name: "NUTRITION", value: "open://livwell/nutritionScreen" },
  { name: "EVENTS", value: "open://livwell/eventsScreen" },
  { name: "GOALS", value: "open://livwell/goalsScreen" },
  { name: "TRENDS", value: "open://livwell/trendsScreen" },
  { name: "WINKS", value: "open://livwell/winksScreen" },
  { name: "MEDIATION", value: "open://livwell/meditationScreen" },
  { name: "GAMES", value: "open://livwell/gamesScreen" },
  { name: "GROUPS", value: "open://livwell/groupsScreen" },
  { name: "CHALLENGES", value: "open://livwell/allChallengesScreen" },
  { name: "DEVICES", value: "open://livwell/devicesScreen" },
  { name: "BOOKINGS", value: "open://livwell/bookingsScreen" },
];

export const STORY_LINK_ACCESS = [
  { name: "SCREEN_1", value: "screen_1" },
  { name: "SCREEN_2", value: "screen_2" }
];

export const STORY_DISPALY_DURATION = [
  { name: "1-SEC", value: 1 },
  { name: "2-SEC", value: 2 },
  { name: "3-SEC", value: 3 },
  { name: "4-SEC", value: 4 },
  { name: "5-SEC", value: 5 },
];


export const STUDIO_TYPE = [
  { name: "Studio 1", value: "Studio 1" },
  { name: "Studio 2", value: "Studio 2" }
];

export const DIFFICULTY_LEVEL = [
  { name: "Beginner", value: "BEGINNER" },
  { name: "Medium", value: "MEDIUM" },
  { name: "Professional", value: "PROFESSIONAL" }
];

export const VERSION_UPDATES_TYPE = [
  { name: "Normally", value: "NORMAL" },
  { name: "Forcefully", value: "FORCEFULLY" }
];

export const PLATFORM_TYPE = [
  { name: "Android", value: "1" },
  { name: "iOS", value: "2" }
];

export const SQAUD_TYPES = [
  { name: "CALORIES", value: "CALORIES" },
  { name: "PT_SESSIONS", value: "PT_SESSIONS" },
  { name: "CHECKIN", value: "CHECKIN" },
  { name: "STEPS_AND_KMS", value: "STEPS_AND_KMS" },
]

export const FITNESS_REELS_REJECT_REASONS = [
  { name: "Nudity", value: "Nudity" },
  { name: "Misleading", value: "Misleading" },
  { name: "Violent Video", value: "Violent Video" },
  { name: "Violate LivWell Terms", value: "Violate LivWell Terms" },
  { name: "Poor Video Quality", value: "Poor Video Quality" },
  { name: "Others", value: "Others" },
];

export const SUBSCRIPTION_FEATURES = [
  { name: "CHALLENGE", value: "challenges" },
  { name: "URBOX_REWARDS", value: "urboxRewards" },
  { name: "PREMIUM_REWARDS", value: "premiumRewards" }, // Special Category on Premium Rewards
  { name: "SUBSCRIPTION_BONUS", value: "subscriptionBonus" },
  { name: "YEARLY_MAX_LWC_POINTS", value: "maxPoint" },
  { name: "DAILY_MAX_LWC_POINTS", value: "dailyMaxPoint" },
  { name: "LWC_PER_STEP", value: "lwcPerStep" },// Decided by LW on the Member day mulitplier On Steps points
  { name: "POINTS_VALIDITY", value: "pointsValidity" }
]

export const SUBSCRIPTION_PLANS = [
  { name: "MOVER", value: "MOVER" },
  { name: "ACTIVE", value: "ACTIVE" },
]

export const URBOX_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE"
};

export const DATE_TYPES = {
  SHORT_TIME: 'h:mm a',
  MEDIUM_DATE: 'MMM d, yyyy',
  FULL_DATE: 'EE, MMM d, yyyy',
  VALIDITY_TIME: 'MMM d, y - hh:mm:ss a',
  DATE_WITH_TIME: 'MMM d, y - hh:mm a',
}

export const CHALLENGE_TYPE_OBJ = {
  STEPS: "STEPS",
  KILOMETRES: "KILOMETRES", // DISTANCE
  CHECK_IN_CLUB: "CHECK_IN_CLUB",
  CLASS_BOOKING: "CLASS_BOOKING",
  VIDEO_CONTENT: "VIDEO_CONTENT", // WATCH_PREMIUM_CONTENT
  CLASS_COMPLETED: "CLASS_COMPLETED"
};

export const DASHBOARD_CARD_ID = {
  USERS: 'users',
  CLASSES: 'classes',
  CHALLENGES: 'challenges',
  CLIENT_LWC_DISTRIBUTION: 'clientLwcDistribution',
  LWC_REDEEMED: 'lwcRedeemed',
  VOUCHER_REDEEMED: 'voucherRedeemed',
  URBOX_VOUCHER_REDEEMED: 'urBoxvoucherRedeemed',
  ARTICLES: 'healthTrendArticles',
  EVENTS: 'events',
  REWARDS: 'rewards',
  CLUBS: 'clubs',
  LIVWELL_VIDEOS: 'livwellVideos'
}

export const FITNESS_REELS_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
}

export const CARD_COLLECTION_1 = [
  { _id: DASHBOARD_CARD_ID.USERS, name: 'Active Users', subname: 'Total App Users', image: '/assets/images/users.svg', activeCount: '0', totalCount: '0' },
  { _id: DASHBOARD_CARD_ID.CLASSES, name: 'Ongoing Classes', subname: 'Total Classes', image: '/assets/images/classes.svg', activeCount: '0', totalCount: '0' },
  { _id: DASHBOARD_CARD_ID.CHALLENGES, name: 'Active Challenges', subname: 'Total Challenges', image: '/assets/images/challenges.svg', activeCount: '0', totalCount: '0' },
  { _id: DASHBOARD_CARD_ID.ARTICLES, name: 'Articles on Health Trend', subname: 'Total Articles', image: '/assets/images/article.svg', activeCount: '0', totalCount: '0' },
  { _id: DASHBOARD_CARD_ID.EVENTS, name: 'Ongoing Events', subname: 'Total Events', image: '/assets/images/event.svg', activeCount: '0', totalCount: '0' },
  { _id: DASHBOARD_CARD_ID.REWARDS, name: 'Active Rewards', subname: 'Total Rewards', image: '/assets/images/trophy.svg', activeCount: '0', totalCount: '0' },
  { _id: DASHBOARD_CARD_ID.LIVWELL_VIDEOS, name: 'Active Livwell Videos', subname: 'Total Livwell Videos', image: '/assets/images/videos.svg', activeCount: '0', totalCount: '0' }
];

export const CARD_COLLECTION_2 = [
  { _id: DASHBOARD_CARD_ID.CLIENT_LWC_DISTRIBUTION, name: 'Client LWC Distributed', subname: 'Total Client LWC', image: '/assets/images/points-history.svg', activeCount: '0', totalCount: '0' },
  { _id: DASHBOARD_CARD_ID.LWC_REDEEMED, name: 'LWC Redeemed', subname: 'Total LWC Earned', image: '/assets/images/points-history.svg', activeCount: '0', totalCount: '0' },
  { _id: DASHBOARD_CARD_ID.VOUCHER_REDEEMED, name: 'Voucher Redeemed', subname: 'Total Voucher Purchased', image: '/assets/images/trophy.svg', activeCount: '0', totalCount: '0' },
  { _id: DASHBOARD_CARD_ID.URBOX_VOUCHER_REDEEMED, name: 'URBox Voucher Redeemed', subname: 'Total URBox Voucher Purchased', image: '/assets/images/trophy.svg', activeCount: '0', totalCount: '0' },
  { _id: DASHBOARD_CARD_ID.CLUBS, name: 'Active Clubs', subname: 'Total Clubs', image: '/assets/images/clubs.svg', activeCount: '0', totalCount: '0' }
];

export const LIVWELL_CARD_COLLECTION = [...CARD_COLLECTION_1, ...CARD_COLLECTION_2];
export const CORPORATE_CARD_COLLECTION = CARD_COLLECTION_1;

/**
 * @ROLE_MANAGEMENT_RELATED_STUFF
 */
export const SECTION_ID_OF = {
  USERS: '1',
  CATEGORIES: '2',
  INTERESTS: '3',
  CLASSES: '4',
  CHALLENGES: '5',
  EVENTS: '6',
  ARTICLES: '7',
  REWARDS: '8',
  BADGES: '9',
  BANNERS: '10',
  CLIENTS: '11',
  CLUBS: '12',
  LIVWELL_VIDEOS: '13',
  FAQ: '14',
  CMS: '15',
  STORIES: '16',
  REFERRAL: '17',
  AUDIT_LOG: '18',
  REPORTS: '19',
  CHARITY: '20',
  INSURANCE: '21',
  ONLINE_PURCHASED_INSURANCE: '22',
  OFFLINE_PURCHASED_INSURANCE: '23',
  GROUPS: '24',
  MESSAGE_BOARD: '25',
  QUICK_LINKS: '26',
  DEEP_LINKS: '27',
  LWC_CM: '28',
  SUBSCRIPTION_FEATURES: '29',
  SPIN_WHEEL: "30",
  PRODUCTS: "31"
}

export const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  UPDATED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENY_REQUIRED: 402,
  ACCESS_FORBIDDEN: 403,
  URL_NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  UNREGISTERED: 410,
  PAYLOAD_TOO_LARGE: 413,
  CONCURRENT_LIMITED_EXCEEDED: 429,
  // TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SHUTDOWN: 503,
  // 430
};

export const DEVICE_TYPE = (deviceno) => {
  switch (deviceno) {
    case 1:
    case "1":
      return "ANDROID";
    case 2:
    case "2":
      return "IOS";
    case 3:
    case "3":
      return "WEB";
    case 4:
    case "4":
      return "ALL";
    default: "ALL";
  }
};

export const MANAGE_TYPE_OF = {
  USERS: 'Manage Users',
  CATEGORIES: 'Manage Categories',
  INTERESTS: 'Manage Interests',
  CLASSES: 'Manage Classes',
  CHALLENGES: 'Manage Challenges',
  EVENTS: 'Manage Events',
  ARTICLES: 'Manage Articles',
  REWARDS: 'Manage Rewards',
  BADGES: 'Manage Badges',
  BANNERS: 'Manage Banners',
  CLIENTS: 'Manage Clients',
  CLUBS: 'Manage Clubs',
  LIVWELL_VIDEOS: 'Manage Livwell Videos',
  FAQ: "Manage FAQ's",
  CMS: 'Manage CMS Pages',
  STORIES: 'Manage Story',
  REFERRAL: 'Manage Sales Tracker',
  REPORTS: 'Manage Reports',
  AUDIT_LOG: 'Manage Audit Log',
  CHARITY: 'Manage Charity',
  INSURANCE: 'Manage Inusrance',
  ONLIE_INUSRANCE: 'Manage Online Purchase Insurance',
  OFFLINE_INSURANCE: 'Manage Offline Purchase Insurance',
  GROUP: 'Manage Group',
  MESSAGE_BOARD: 'Manage Message Board',
  QUICK_LINKS: 'Manage Quick Links',
  DEEP_LINKS: 'Manage Deep Links',
  LWC_CM: 'Manage Message LWC',
  SUBSCRIPTION_FEATURES: 'Manage Subscription Features',
  SPIN_WHEEL: 'Manage Spin Wheel'
}

export const PERMISSION = [
  { manageType: MANAGE_TYPE_OF.USERS, sectionId: SECTION_ID_OF.USERS },
  { manageType: MANAGE_TYPE_OF.CATEGORIES, sectionId: SECTION_ID_OF.CATEGORIES },
  { manageType: MANAGE_TYPE_OF.INTERESTS, sectionId: SECTION_ID_OF.INTERESTS },
  { manageType: MANAGE_TYPE_OF.CLASSES, sectionId: SECTION_ID_OF.CLASSES },
  { manageType: MANAGE_TYPE_OF.CHALLENGES, sectionId: SECTION_ID_OF.CHALLENGES },
  { manageType: MANAGE_TYPE_OF.EVENTS, sectionId: SECTION_ID_OF.EVENTS },
  { manageType: MANAGE_TYPE_OF.ARTICLES, sectionId: SECTION_ID_OF.ARTICLES },
  { manageType: MANAGE_TYPE_OF.REWARDS, sectionId: SECTION_ID_OF.REWARDS },
  { manageType: MANAGE_TYPE_OF.BADGES, sectionId: SECTION_ID_OF.BADGES },
  { manageType: MANAGE_TYPE_OF.BANNERS, sectionId: SECTION_ID_OF.BANNERS },
  { manageType: MANAGE_TYPE_OF.CLIENTS, sectionId: SECTION_ID_OF.CLIENTS },
  { manageType: MANAGE_TYPE_OF.CLUBS, sectionId: SECTION_ID_OF.CLUBS },
  { manageType: MANAGE_TYPE_OF.LIVWELL_VIDEOS, sectionId: SECTION_ID_OF.LIVWELL_VIDEOS },
  { manageType: MANAGE_TYPE_OF.FAQ, sectionId: SECTION_ID_OF.FAQ },
  { manageType: MANAGE_TYPE_OF.CMS, sectionId: SECTION_ID_OF.CMS },
  { manageType: MANAGE_TYPE_OF.STORIES, sectionId: SECTION_ID_OF.STORIES },
  { manageType: MANAGE_TYPE_OF.REFERRAL, sectionId: SECTION_ID_OF.REFERRAL },
  { manageType: MANAGE_TYPE_OF.AUDIT_LOG, sectionId: SECTION_ID_OF.AUDIT_LOG },
  { manageType: MANAGE_TYPE_OF.REPORTS, sectionId: SECTION_ID_OF.REPORTS },
  { manageType: MANAGE_TYPE_OF.CHARITY, sectionId: SECTION_ID_OF.CHARITY },
  { manageType: MANAGE_TYPE_OF.GROUP, sectionId: SECTION_ID_OF.GROUPS },
  { manageType: MANAGE_TYPE_OF.MESSAGE_BOARD, sectionId: SECTION_ID_OF.MESSAGE_BOARD },
  { manageType: MANAGE_TYPE_OF.QUICK_LINKS, sectionId: SECTION_ID_OF.QUICK_LINKS },
  { manageType: MANAGE_TYPE_OF.DEEP_LINKS, sectionId: SECTION_ID_OF.DEEP_LINKS },
  { manageType: MANAGE_TYPE_OF.LWC_CM, sectionId: SECTION_ID_OF.LWC_CM },
  { manageType: MANAGE_TYPE_OF.SPIN_WHEEL, sectionId: SECTION_ID_OF.SPIN_WHEEL },
  { manageType: MANAGE_TYPE_OF.SUBSCRIPTION_FEATURES, sectionId: SECTION_ID_OF.SUBSCRIPTION_FEATURES },
  { manageType: MANAGE_TYPE_OF.INSURANCE, sectionId: SECTION_ID_OF.INSURANCE },
  { manageType: MANAGE_TYPE_OF.ONLIE_INUSRANCE, sectionId: SECTION_ID_OF.ONLINE_PURCHASED_INSURANCE },
  { manageType: MANAGE_TYPE_OF.OFFLINE_INSURANCE, sectionId: SECTION_ID_OF.OFFLINE_PURCHASED_INSURANCE },

];



