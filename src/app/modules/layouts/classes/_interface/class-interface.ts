declare namespace Class {
  export interface ClassData extends CommonInterface.Id {
    accessType: string;
    categoryId: {
      _id: string,
      name: CommonInterface.Language
    },
    clubId: {
      _id: string,
      name: string,
      shortName: string
    },
    city: string;
    description?: string;
    difficultyLevel: string[];
    instructorName: string;
    name: string;
    startTime: number;
    endTime: number;
    created?: number;
    status: string;
    classStatus: string;
    studioName: string;
    totalParticipant: number;
    activeParticipant: number;
    seatsLeft: number;
    endedReason?: string;
    type: string,
    classType: string,
    venue: string;
    isEdited: boolean;
    image:string,
    seatMapImage: string;
    seats: string[];
    media?: Media[];
  }

  export interface Media {
    url: string;
    type: string;
  }

  export interface ClassDetail extends CommonInterface.ResponseStatusCodeMsg {
    data: ClassData;
  }

};
