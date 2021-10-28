declare namespace QuickLink {
    export interface QuickLinkData extends CommonInterface.Id {
      name: CommonInterface.Language;
      icon: string;
      deepLink: string;
      priority: number;
      isEdited: boolean;
    }
  
    export interface QuickLinkDetail extends CommonInterface.ResponseStatusCodeMsg {
      data: QuickLinkData;
    }
  };