declare namespace Version {

  export interface VersionData extends CommonInterface.Id {
    name: string;
    currentVersion: string;
    platform: string;
    updateType: string;
    status: string;
    created: number;
    description?: string;
  }

  export interface VersionDetail extends CommonInterface.ResponseStatusCodeMsg {
    data: VersionData;
  }

};
