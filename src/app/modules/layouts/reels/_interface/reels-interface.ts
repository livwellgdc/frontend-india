declare namespace Reels {
    export interface ReelsData extends CommonInterface.Id {
      name: CommonInterface.Language;
      description: CommonInterface.Language;
      thumbnail: string;
      video: string;
      isEdited: boolean;
    }
  
    export interface ReelsDetail extends CommonInterface.ResponseStatusCodeMsg {
      data: ReelsData;
    }
  
  };