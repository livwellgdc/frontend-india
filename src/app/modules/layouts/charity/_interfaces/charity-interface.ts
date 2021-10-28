declare namespace Charity {
    export interface CharityData extends CommonInterface.Id {
      name: CommonInterface.Language;
      description: CommonInterface.Language;
      location: CommonInterface.Location;
      logo: string;
      mobileNo: string;
      email: string;
      websiteLink: string;
      isEdited: boolean;
      created: string;
      status: string;
    }
  
    export interface CharityDetail extends CommonInterface.ResponseStatusCodeMsg {
      data: CharityData;
    }
  
  };

