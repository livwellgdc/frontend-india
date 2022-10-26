/**
 * @BC === BREADCRUMB
 */

import * as route from 'src/app/constants/absolute-route';

/**
 * @ADMIN_MODULE_BREADCRUMB_ROUTE
 */
export const BC_ADMIN_PROFILE = [{ path: route.ABS_ADMIN_PROFILE, label: 'Admin Profile' }];
export const BC_ADMIN_EDIT = [
  ...BC_ADMIN_PROFILE,
  { path: route.ABS_ADMIN_PROFILE_EDIT, label: 'Edit' },
];
export const BC_ADMIN_CHANGE_PASSWORD = [
  ...BC_ADMIN_PROFILE,
  { path: route.ABS_ADMIN_CHANGE_PASSWORD, label: 'Change Password' },
];

/**
 * @USER_MODULE_BREADCRUMB_ROUTE
 */
export const BC_USERS = [{ path: route.ABS_USERS, label: 'Users' }];
export const BC_USERS_DETAILS = (label = 'Details') => [
  ...BC_USERS,
  { path: route.ABS_USERS_DETAILS, label: label }
];

/**
 * @CATEGORY_MODULE_BREADCRUMB_ROUTE
 */
export const BC_CATEGORIES = [{ path: route.ABS_CATEGORY, label: 'Categories' }];
export const BC_CATEGORIES_FILTER_STATUS = (label = 'Generic Categories') => [
  ...BC_CATEGORIES,
  { path: route.ABS_CATEGORY, label: label }
];
export const BC_CATEGORIES_DETAILS = [
  ...BC_CATEGORIES,
  { path: route.ABS_CATEGORY_DETAILS, label: 'Details' },
];

/**
 * @PROFILE_INTEREST_MODULE_BREADCRUMB_ROUTE
 */
export const BC_PROFILE_INTERESTS = [{ path: route.ABS_PROFILE_INTERESTS, label: 'Profile Interests' }];
export const BC_PROFILE_INTERESTS_DETAILS = [
  ...BC_PROFILE_INTERESTS,
  { path: route.ABS_PROFILE_INTERESTS_DETAILS, label: 'Details' },
];

/**
 * @CLASS_MODULE_BREADCRUMB_ROUTE
 */
export const BC_CLASSES = [{ path: route.ABS_CLASSES, label: 'Classes' }];
export const BC_CLASSES_FILTER_STATUS = (label = 'All') => [
  ...BC_CLASSES,
  { path: route.ABS_CLASSES, label: label }
];
export const BC_CLASSES_ADD = [
  ...BC_CLASSES,
  { path: route.ABS_CLASSES_ADD, label: 'Add' }
];
export const BC_CLASSES_EDIT = [
  ...BC_CLASSES,
  { path: route.ABS_CLASSES_EDIT, label: 'Edit' }
];
export const BC_CLASSES_COPY = [
  ...BC_CLASSES,
  { path: route.ABS_CLASSES_COPY, label: 'Copy' }
];
export const BC_CLASSES_DETAILS = [
  ...BC_CLASSES,
  { path: route.ABS_CLASSES_DETAILS, label: 'Details' },
];


/**
 * @EVENT_MODULE_BREADCRUMB_ROUTE
 */
export const BC_EVENTS = [{ path: route.ABS_EVENTS, label: 'Events' }];
export const BC_EVENTS_FILTER_STATUS = (label = 'All') => [
  ...BC_EVENTS,
  { path: route.ABS_CLASSES, label: label }
];
export const BC_EVENTS_ADD = [
  ...BC_EVENTS,
  { path: route.ABS_EVENTS_ADD, label: 'Add' },
];
export const BC_EVENTS_COPY = [
  ...BC_EVENTS,
  { path: route.ABS_EVENTS_COPY, label: 'Copy' }
];
export const BC_EVENTS_EDIT = [
  ...BC_EVENTS,
  { path: route.ABS_EVENTS_EDIT, label: 'Edit' },
];
export const BC_EVENTS_DETAILS = [
  ...BC_EVENTS,
  { path: route.ABS_EVENTS_DETAILS, label: 'Details' },
];

/**
 * @ARTICLES_MODULE_BREADCRUMB_ROUTE
 */
export const BC_ARTICLES = [{ path: route.ABS_ARTICLES, label: 'Articles' }];
export const BC_ARTICLES_ADD = [
  ...BC_ARTICLES,
  { path: route.ABS_ARTICLES_ADD, label: 'Add' }
];
export const BC_ARTICLES_EDIT = [
  ...BC_ARTICLES,
  { path: route.ABS_ARTICLES_EDIT, label: 'Edit' }
];
export const BC_ARTICLES_DETAILS = [
  ...BC_ARTICLES,
  { path: route.ABS_ARTICLES_DETAILS, label: 'Details' },
];

/**
 * @REWARDS_MODULE_BREADCRUMB_ROUTE
 */
export const BC_REWARDS = [{ path: route.ABS_REWARDS, label: 'Rewards' }];
export const BC_REWARDS_ADD = [
  ...BC_REWARDS,
  { path: route.ABS_REWARDS_ADD, label: 'Add' }
];
export const BC_REWARDS_EDIT = [
  ...BC_REWARDS,
  { path: route.ABS_REWARDS_EDIT, label: 'Edit' }
];
export const BC_REWARDS_DETAILS = [
  ...BC_REWARDS,
  { path: route.ABS_REWARDS_DETAILS, label: 'Details' },
];

/**
 * @PROMO_MGMT_MODULE_BREADCRUMB_ROUTE
 */
export const BC_PROMO_MGMT = [{ path: route.ABS_PROMO_MGMT, label: 'Promo Code Management' }];

/**
 * @AGE_CALCULATOR_MODULE_BREADCRUMB_ROUTE
 */
export const BC_AGE_CALCULATOR = [{ path: route.ABS_AGE_CALCULATOR, label: 'Age Calculator Questions' }];
export const BC_AGE_CALCULATOR_EDIT = [
  ...BC_AGE_CALCULATOR,
  { path: route.ABS_AGE_CALCULATOR_EDIT, label: 'Edit' }
];

/**
 * @SPECIAL_OFFERS_MODULE_BREADCRUMB_ROUTE
 */
export const BC_SPECIAL_OFFERS = [{ path: route.ABS_SPECIAL_OFFERS, label: 'Special Offers' }];
export const BC_SPECIAL_OFFERS_ADD = [
  ...BC_SPECIAL_OFFERS,
  { path: route.ABS_SPECIAL_OFFERS_ADD, label: 'Add' }
];
export const BC_SPECIAL_OFFERS_EDIT = [
  ...BC_SPECIAL_OFFERS,
  { path: route.ABS_SPECIAL_OFFERS_EDIT, label: 'Edit' }
];
export const BC_SPECIAL_OFFERS_DETAILS = [
  ...BC_SPECIAL_OFFERS,
  { path: route.ABS_SPECIAL_OFFERS_DETAILS, label: 'Details' },
];

/**
 * @CHALLENGES_MODULE_BREADCRUMB_ROUTE
 */
export const BC_CHALLENGES = [{ path: route.ABS_CHALLENGES, label: 'Challenges' }];
export const BC_CHALLENGES_COPY = [
  ...BC_CHALLENGES,
  { path: route.ABS_CHALLENGES_COPY, label: 'Copy' }
];
export const BC_CHALLENGES_ADD = [
  ...BC_CHALLENGES,
  { path: route.ABS_CHALLENGES_ADD, label: 'Add' }
];
export const BC_CHALLENGES_EDIT = [
  ...BC_CHALLENGES,
  { path: route.ABS_CHALLENGES_EDIT, label: 'Edit' }
];
export const BC_CHALLENGES_DETAILS = [
  ...BC_CHALLENGES,
  { path: route.ABS_CHALLENGES_DETAILS, label: 'Details' },
];

/**
 * @GROUPS_MODULE_BREADCRUMB_ROUTE
 */
export const BC_GROUPS = [{ path: route.ABS_GROUPS, label: 'Groups' }];
export const BC_GROUPS_ADD = [
  ...BC_GROUPS,
  { path: route.ABS_GROUPS_ADD, label: 'Add' }
];
export const BC_GROUPS_EDIT = [
  ...BC_GROUPS,
  { path: route.ABS_GROUPS_EDIT, label: 'Edit' }
];
export const BC_GROUPS_DETAILS = [
  ...BC_GROUPS,
  { path: route.ABS_GROUPS_DETAILS, label: 'Details' },
];

/**
 * @BADGES_MODULE_BREADCRUMB_ROUTE
 */
export const BC_BADGES = [{ path: route.ABS_BADGES, label: 'Badges' }];
export const BC_BADGES_ADD = [
  ...BC_BADGES,
  { path: route.ABS_BADGES_ADD, label: 'Add' }
];
export const BC_BADGES_EDIT = [
  ...BC_BADGES,
  { path: route.ABS_BADGES_EDIT, label: 'Edit' }
];
export const BC_BADGES_DETAILS = [
  ...BC_BADGES,
  { path: route.ABS_BADGES_DETAILS, label: 'Details' },
];

/**
 * @BANNERS_MODULE_BREADCRUMB_ROUTE
 */
export const BC_BANNERS = [{ path: route.ABS_BANNERS, label: 'Banners' }];
export const BC_BANNERS_ADD = [
  ...BC_BANNERS,
  { path: route.ABS_BANNERS_ADD, label: 'Add' }
];
export const BC_BANNERS_EDIT = [
  ...BC_BANNERS,
  { path: route.ABS_BANNERS_EDIT, label: 'Edit' }
];
export const BC_BANNERS_DETAILS = [
  ...BC_BANNERS,
  { path: route.ABS_BANNERS_DETAILS, label: 'Details' },
];

/**
 * @CORPORATES_MODULE_BREADCRUMB_ROUTE
 */
export const BC_CORPORATES = [{ path: route.ABS_CORPORATES, label: 'Corporates' }];
export const BC_CORPORATES_ADD = [
  ...BC_CORPORATES,
  { path: route.ABS_CORPORATES_ADD, label: 'Add' }
];
export const BC_CORPORATES_EDIT = [
  ...BC_CORPORATES,
  { path: route.ABS_CORPORATES_EDIT, label: 'Edit' }
];
export const BC_CORPORATES_DETAILS = [
  ...BC_CORPORATES,
  { path: route.ABS_CORPORATES_DETAILS, label: 'Details' },
];

/**
 * @CLIENT_CLUBS_MODULE_BREADCRUMB_ROUTE
 */
export const BC_CLIENT_CLUBS = [{ path: route.ABS_CLIENT_CLUBS, label: 'Clients' }];
export const BC_CLIENT_CLUBS_ADD = [
  ...BC_CLIENT_CLUBS,
  { path: route.ABS_CLIENT_CLUBS_ADD, label: 'Add' }
];
export const BC_CLIENT_CLUBS_EDIT = [
  ...BC_CLIENT_CLUBS,
  { path: route.ABS_CLIENT_CLUBS_EDIT, label: 'Edit' }
];
export const BC_CLIENT_CLUBS_DETAILS = [
  ...BC_CLIENT_CLUBS,
  { path: route.ABS_CLIENT_CLUBS_DETAILS, label: 'Details' },
];

/**
 * @CLUBS_MODULE_BREADCRUMB_ROUTE
 */
export const BC_CLUBS = [{ path: route.ABS_CLUBS, label: 'Clubs' }];
export const BC_CLUBS_ADD = [
  ...BC_CLUBS,
  { path: route.ABS_CLUBS_ADD, label: 'Add' }
];
export const BC_CLUBS_EDIT = [
  ...BC_CLUBS,
  { path: route.ABS_CLUBS_EDIT, label: 'Edit' }
];
export const BC_CLUBS_DETAILS = [
  ...BC_CLUBS,
  { path: route.ABS_CLUBS_DETAILS, label: 'Details' },
];

/**
 * @HEALTH_SCORE_MODULE_BREADCRUMB_ROUTE
 */
export const BC_HEALTH_SCORE = [{ path: route.ABS_MANAGE_HEALTH_SCORE, label: 'Manage Health Score' }];

/**
 * @POINTS_DISTRIBUTION_MODULE_BREADCRUMB_ROUTE
 */
export const BC_POINTS_DISTRIBUTION = [{ path: route.ABS_POINTS_DISTRIBUTION, label: 'Video Ads LWC Distribution' }];

/**
 * @PER_STEP_LWC_MODULE_BREADCRUMB_ROUTE
 */
export const BC_PER_STEP_LWC = [{ path: route.ABS_PER_STEP_LWC, label: 'Per Step LWC Distribution' }];


/**
 * @POINTS_DISTRIBUTION_HISTORY_MODULE_BREADCRUMB_ROUTE
 */
export const BC_POINTS_DISTRIBUTION_HISTORY = [{ path: route.ABS_POINTS_DISTRIBUTION_HISTORY, label: 'LWC History' }];

/**
 * @LIVWELL_VIDEOS_MODULE_BREADCRUMB_ROUTE
 */
export const BC_LIVWELL_VIDEOS = [{ path: route.ABS_LIVWELL_VIDEOS, label: 'Livwell Videos' }];
export const BC_LIVWELL_VIDEOS_ADD = [
  ...BC_LIVWELL_VIDEOS,
  { path: route.ABS_LIVWELL_VIDEOS_ADD, label: 'Add' }
];
export const BC_LIVWELL_VIDEOS_EDIT = [
  ...BC_LIVWELL_VIDEOS,
  { path: route.ABS_LIVWELL_VIDEOS_EDIT, label: 'Edit' }
];
export const BC_LIVWELL_VIDEOS_DETAILS = [
  ...BC_LIVWELL_VIDEOS,
  { path: route.ABS_LIVWELL_VIDEOS_DETAILS, label: 'Details' },
];

/**
 * @VERSION_MODULE_BREADCRUMB_ROUTE
 */
export const BC_VERSIONS = [{ path: route.ABS_VERSIONS, label: 'Versions' }];
export const BC_VERSIONS_DETAILS = [
  ...BC_VERSIONS,
  { path: route.ABS_VERSIONS_DETAILS, label: 'Details' },
];

/**
 * @BOARDS_MODULE_BREADCRUMB_ROUTE
 */
export const BC_BOARDS = [{ path: route.ABS_BOARDS, label: 'Boards' }];
export const BC_BOARDS_ADD = [
  ...BC_BOARDS,
  { path: route.ABS_BOARDS_ADD, label: 'Add' }
];
export const BC_BOARDS_EDIT = [
  ...BC_BOARDS,
  { path: route.ABS_BOARDS_EDIT, label: 'Edit' }
];
export const BC_BOARDS_DETAILS = [
  ...BC_BOARDS,
  { path: route.ABS_BOARDS_DETAILS, label: 'Details' },
];


/**
 * @POSTS_MODULE_BREADCRUMB_ROUTE
 */
export const BC_POSTS = [{ path: route.ABS_POSTS, label: 'Posts' }];
export const BC_POSTS_ADD = [
  ...BC_POSTS,
  { path: route.ABS_POSTS_ADD, label: 'Add' }
];
export const BC_POSTS_EDIT = [
  ...BC_POSTS,
  { path: route.ABS_POSTS_EDIT, label: 'Edit' }
];
export const BC_POSTS_DETAILS = [
  ...BC_POSTS,
  { path: route.ABS_POSTS_DETAILS, label: 'Details' },
];


/**
 * @PAYMENTS_MODULE_BREADCRUMB_ROUTE
 */
export const BC_PAYMENTS = [{ path: route.ABS_PAYMENTS, label: 'Subscriptions' }];
export const BC_PAYMENTS_DETAILS = [
  ...BC_PAYMENTS,
  { path: route.ABS_PAYMENTS_DETAILS, label: 'Details' },
];

/**
 * @SUB_ADMINS_MODULE_BREADCRUMB_ROUTE
 */
export const BC_SUB_ADMINS = [{ path: route.ABS_SUB_ADMINS, label: 'Sub Admins' }];
export const BC_SUB_ADMINS_ADD = [
  ...BC_SUB_ADMINS,
  { path: route.ABS_SUB_ADMINS_ADD, label: 'Add' }
];
export const BC_SUB_ADMINS_EDIT = [
  ...BC_SUB_ADMINS,
  { path: route.ABS_SUB_ADMINS_EDIT, label: 'Edit' }
];
export const BC_SUB_ADMINS_DETAILS = [
  ...BC_SUB_ADMINS,
  { path: route.ABS_SUB_ADMINS_DETAILS, label: 'Details' },
];

/**
 * @FAQ_MODULE_BREADCRUMB_ROUTE
 */
export const BC_FAQ = [{ path: route.ABS_FAQ, label: 'FAQ' }];
export const BC_FAQ_ADD = [
  ...BC_FAQ,
  { path: route.ABS_FAQ_ADD, label: 'Add' }
];
export const BC_FAQ_EDIT = [
  ...BC_FAQ,
  { path: route.ABS_FAQ_EDIT, label: 'Edit' }
];
export const BC_FAQ_DETAILS = [
  ...BC_FAQ,
  { path: route.ABS_FAQ_DETAILS, label: 'Details' },
];

/**
 * @CMS_MODULE_BREADCRUMB_ROUTE
 */
export const BC_CMS = [{ path: route.ABS_CMS, label: 'Content Management' }];
export const BC_TERM_CONDTIONS = [
  ...BC_CMS,
  { path: route.ABS_TERM_CONDITIONS, label: 'Terms & Conditions' }
];
export const BC_PRIVACY_POLICY = [
  ...BC_CMS,
  { path: route.ABS_PRIVACY_POLICY, label: 'Privacy Policy' }
];
export const BC_ABOUT_US = [
  ...BC_CMS,
  { path: route.ABS_ABOUT_US, label: 'About Us' }
];
export const BC_CONTACT_US = [
  ...BC_CMS,
  { path: route.ABS_CONTACT_US, label: 'Contact Us' }
];

/** 
 * @AUDIT_LOG_MODULE_BREADCRUMB_ROUTE
 */
export const BC_AUDIT_LOG = [{ path: route.ABS_AUDIT_LOG, label: 'AuditLog' }];
export const BC_AUDIT_LOG_FILTER_STATUS = (label = 'Joining') => [
  ...BC_AUDIT_LOG,
  { path: route.ABS_AUDIT_LOG, label: label }
];

/**
 * @STORIES_MODULE_BREADCRUMB_ROUTE
 */
export const BC_STORIES = [{ path: route.ABS_STORIES, label: 'Story' }];
export const BC_STORIES_EDIT = [
  ...BC_STORIES,
  { path: route.ABS_STORIES_EDIT, label: 'Edit' }
];

export const BC_STORY_ADD = [
  ...BC_STORIES,
  { path: route.ABS_STORIES_ADD, label: 'Add' }
];

export const BC_STORY_DETAILS = [
  ...BC_STORIES,
  { path: route.ABS_STORY_DETAILS, label: 'Details' },
];


/**
 * @REELS_MODULE_BREADCRUMB_ROUTE
 */
 export const BC_REELS = [{ path: route.ABS_REELS, label: 'Reels' }];
 export const BC_REELS_EDIT = [
   ...BC_REELS,
   { path: route.ABS_REELS_EDIT, label: 'Edit' }
 ];
 
 export const BC_REELS_ADD = [
   ...BC_REELS,
   { path: route.ABS_REELS_ADD, label: 'Add' }
 ];
 
 export const BC_REELS_DETAILS = [
   ...BC_REELS,
   { path: route.ABS_REELS_DETAILS, label: 'Details' },
 ];

/**
 * @SELES_TRACKER_MODULE_BREADCRUMB_ROUTE
 */
export const BC_SELES_TRACKER = [{ path: route.ABS_SELES_TRACKER, label: 'Sales Tracker' }];
export const BC_SELES_TRACKER_LIST = (label = 'List') => [
  ...BC_SELES_TRACKER,
  { path: route.ABS_SELES_TRACKER_LIST, label: label }
];

/**
 * @SALES_TRACKER_REPORT_MODULE_BREADCRUMB_ROUTE
 */
export const BC_SELES_TRACKER_REPORT = [{ path: route.ABS_SELES_REPORTS, label: 'Sales Tracker Report' }];
export const BC_SELES_TRACKER_REPORT_LIST = (label = 'List') => [
  ...BC_SELES_TRACKER_REPORT,
  { path: route.ABS_REPORTS, label: label }
];

/**
 * @REFERRER_TRACK_REPORT_MODULE_BREADCRUMB_ROUTE
 */
 export const BC_REFERRER_REPORT = [{ path: route.ABS_REFERRER_REPORTS, label: 'Referrer Report' }];
 export const BC_REFERRER_REPORT_LIST = (label = 'List') => [
   ...BC_REFERRER_REPORT,
   { path: route.ABS_REFERRER_REPORTS, label: label }
 ];


/**
 * @CHARITY_MODULE_BREADCRUMB_ROUTE
 */
export const BC_CHARITY = [{ path: route.ABS_CHARITY, label: 'Charity' }];
export const BC_CHARITY_EDIT = [
  ...BC_CHARITY,
  { path: route.ABS_CHARITY_EDIT, label: 'Edit' }
];

export const BC_CHARITY_ADD = [
  ...BC_CHARITY,
  { path: route.ABS_CHARITY_ADD, label: 'Add' }
];

export const BC_CHARITY_DETAILS = [
  ...BC_CHARITY,
  { path: route.ABS_CHARITY_DETAILS, label: 'Details' },
];

/**
 * @QUICK_LINKS_MODULE_BREADCRUMB_ROUTE
 */
 export const BC_QUICK_LINKS = [{ path: route.ABS_QUICK_LINKS, label: 'Quick Links' }];
 export const BC_QUICK_LINKS_EDIT = [
   ...BC_QUICK_LINKS,
   { path: route.ABS_QUICK_LINKS_EDIT, label: 'Edit' }
 ];
 
 export const BC_QUICK_LINKS_ADD = [
   ...BC_QUICK_LINKS,
   { path: route.ABS_QUICK_LINKS_ADD, label: 'Add' }
 ];
 
 export const BC_QUICK_LINKS_DETAILS = [
   ...BC_QUICK_LINKS,
   { path: route.ABS_QUICK_LINKS_DETAILS, label: 'Details' },
 ];

 /**
 * @QUICK_LINKS_MODULE_BREADCRUMB_ROUTE
 */
  export const BC_DEEP_LINKS = [{ path: route.ABS_QUICK_LINKS, label: 'Deep Links' }];
  export const BC_DEEP_LINKS_EDIT = [
    ...BC_DEEP_LINKS,
    { path: route.ABS_DEEP_LINKS_EDIT, label: 'Edit' }
  ];
  
  export const BC_DEEP_LINKS_ADD = [
    ...BC_DEEP_LINKS,
    { path: route.ABS_DEEP_LINKS_ADD, label: 'Add' }
  ];
  
  export const BC_DEEP_LINKS_DETAILS = [
    ...BC_DEEP_LINKS,
    { path: route.ABS_DEEP_LINKS_DETAILS, label: 'Details' },
  ];

/**
 * @SPIN_WHEEL_MODULE_BREADCRUMB_ROUTE
 */
 export const BC_SPIN_WHEEL = [{ path: route.ABS_SPIN_WHEEL, label: 'Spin Wheels' }];
 export const BC_SPIN_WHEEL_EDIT = [
   ...BC_SPIN_WHEEL,
   { path: route.ABS_SPIN_WHEEL_EDIT, label: 'Edit' }
 ];
 
 export const BC_SPIN_WHEEL_ADD = [
   ...BC_SPIN_WHEEL,
   { path: route.ABS_SPIN_WHEEL_ADD, label: 'Add' }
 ];
 
 export const BC_SPIN_WHEEL_DETAILS = [
   ...BC_SPIN_WHEEL,
   { path: route.ABS_SPIN_WHEEL_DETAILS, label: 'Details' },
 ];
  /**
 * @SUBSCRIPTION_FEATURE_MODULE_BREADCRUMB_ROUTE
 */
export const BC_SUBSCRIPTION_FEATURE = [{ path: route.ABS_SUBSCRIPTION_FETURES, label: 'Subscription > Features' }];
export const BC_SUBSCRIPTION_FEATURE_EDIT = [
  ...BC_SUBSCRIPTION_FEATURE,
  { path: route.ABS_SUBSCRIPTION_FETURES_EDIT, label: 'Edit' }
];

export const BC_SUBSCRIPTION_FEATURE_ADD = [
  ...BC_SUBSCRIPTION_FEATURE,
  { path: route.ABS_SUBSCRIPTION_FETURES_ADD, label: 'Add' }
];

export const BC_SUBSCRIPTION_FEATURE_DETAILS = [
  ...BC_SUBSCRIPTION_FEATURE,
  { path: route.ABS_SUBSCRIPTION_FETURES_DETAILS, label: 'Details' },
];


/**
 * @PRODUCTS_MODULE_BREADCRUMB_ROUTE
 */
 export const BC_PRODUCTS = [{ path: route.ABS_PRODUCTS, label: 'products' }];
 export const BC_PRODUCTS_COPY = [
   ...BC_PRODUCTS,
   { path: route.ABS_PRODUCTS_COPY, label: 'Copy' }
 ];
 export const BC_PRODUCTS_ADD = [
   ...BC_PRODUCTS,
   { path: route.ABS_PRODUCTS_ADD, label: 'Add' }
 ];
 export const BC_PRODUCTS_EDIT = [
   ...BC_PRODUCTS,
   { path: route.ABS_PRODUCTS_EDIT, label: 'Edit' }
 ];
 export const BC_PRODUCTS_DETAILS = [
   ...BC_PRODUCTS,
   { path: route.ABS_PRODUCTS_DETAILS, label: 'Details' },
 ];


