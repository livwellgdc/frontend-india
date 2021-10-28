declare namespace Corporate {

  export interface CorporateData extends CommonInterface.Id {
    logo: string;
    name: string;
    adminName: string;
    adminEmail: string;
    countryCode: string;
    mobileNo: string;
    taxCode: string;
    categoryName: string;
    companyType: string;
    noOfEmployees: string;
    industry: string;
    startDate: number | string;
    endDate: number | string;
    points: number;
    allMembers: number;
    pointsRemaining: number;
    pointsSpend: number;
    frequencyType: string;
    cityName: string;
    domains: string[];
    otherAddresses?: CommonInterface.Location[],
    registeredAddress: CommonInterface.Location;
    description: CommonInterface.Language;
    distributionStatus: string;
    isExpired: boolean;
    healthScore: number;
    created?: number;
  }

  export interface CorporateDetail extends CommonInterface.ResponseStatusCodeMsg {
    data: CorporateData;
  }

};
