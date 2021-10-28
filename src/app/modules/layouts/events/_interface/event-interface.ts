declare namespace Event {

  export interface EventData extends CommonInterface.Id {
    categoryId: {
      _id: string,
      name: CommonInterface.Language
    },
    name: CommonInterface.Language;
    startTime: number;
    endTime: number;
    created?: number;
    eventStatus: string;
    sponsorName?: string;
    websiteLink: string;
    enrolmentLink: string;
    isEdited?: boolean;
    location: {
      address: string,
      coordinates: string[];
    }
    description: CommonInterface.Language;
    isFeatured: boolean;
    image: string;
  }

  export interface EventDetail extends CommonInterface.ResponseStatusCodeMsg {
    data: EventData;
  }

};
