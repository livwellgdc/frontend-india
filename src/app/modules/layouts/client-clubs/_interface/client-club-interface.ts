declare namespace ClientClub {
  export interface ClientClubData extends CommonInterface.Id {
    name: string;
    points: number;
    pointsRemaining: number;
    startDate: number;
    endDate: number;
    joinedDate: number;
    frequencyType: string;
    allMembers: PointsDistribution;
    members: PointsDistribution;
    nonMembers: PointsDistribution;
    centurionMembers: PointsDistribution;
    status: string;
    created?: number;
  }

  export interface PointsDistribution {
    value: string | boolean;
    points: number;
  }

  export interface ClientClubDetail extends CommonInterface.ResponseStatusCodeMsg {
    data: ClientClubData;
  }

};
