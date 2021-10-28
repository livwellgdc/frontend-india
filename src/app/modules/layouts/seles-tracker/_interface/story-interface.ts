declare namespace Story {
    export interface StoryData extends CommonInterface.Id {
      name: CommonInterface.Language;
      image: string;
      linkAccessType: string;
      accessLink: string;
      displayDurationTime: number;
      startDate: number;
      expiryDate: number;
      isEdited: boolean;
    }
  
    export interface StoryDetail extends CommonInterface.ResponseStatusCodeMsg {
      data: StoryData;
    }
  
  };