declare namespace Club {
  export interface ClubData extends CommonInterface.Id {
    name: string;
    shortName: string;
    cityName: string;
    qrCode: string;
    mobileNo: string;
    clientId: {
      _id: string;
      name: string;
    }
    location: {
      address: string,
      coordinates: string[];
    }
    status: string;
    created?: number;
  }

  export interface ClubDetail extends CommonInterface.ResponseStatusCodeMsg {
    data: ClubData;
  }

};
