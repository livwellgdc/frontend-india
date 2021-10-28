declare namespace SubAdmin {
  export interface SubAdminData extends CommonInterface.Id {
    name: string;
    email: string;
    created?: number;
    status: string;
    permission: Permission[];
  }

  export interface Permission {
    manageType: string;
    sectionId: string;
    all: boolean;
    view: boolean;
    deleteBlock: boolean;
    addEdit: boolean;
  }

  export interface SubAdminDetail extends CommonInterface.ResponseStatusCodeMsg {
    data: SubAdminData;
  }

};
