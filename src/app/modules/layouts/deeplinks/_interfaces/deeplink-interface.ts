declare namespace Deeplink {
    export interface DeeplinkData extends CommonInterface.Id {
      name: string;
      url: string;
      isEdited: boolean;
    }
  
    export interface DeeplinkDetail extends CommonInterface.ResponseStatusCodeMsg {
      data: DeeplinkData;
    }
  
  };