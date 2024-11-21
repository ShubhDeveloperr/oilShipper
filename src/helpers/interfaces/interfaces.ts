// import { Icon } from "@fortawesome/fontawesome-svg-core";
type Icon = React.ReactElement;

export interface nominationTable {
    batchCode: string;
    scheduled: Icon;
    ticketed: Icon;
    volume: string;
    projected: string;
    location: string;
    tank: string;
    details: string;
    events: string;
    grantedTo: string;
    supplierConsignee: string;
    tankage: string;
    carrierStatus: Icon;
  }
  export interface schedulesTable {
    line: string;
    startDate: string;
    batchCode: string;
    location: string;
    tankage: string;
    grantedTo: string;
    volume: string;
    ticketed: Icon;
    action: string;
    dateCreated: string;
    createdBy: string;
  }
  export interface ticketsTable {
    batchCode: string;
    date: string;
    ticket: string;
    volume: string;
    grantedBy: string;
    grantedTo: string;
    event: string;
    location: string;
    supplier: string;
    consignee: string;
    tankage: string;
    externalBatchID: string;
  }
  export interface ptoSTable {
    pto: string;
    type: string;
    volume: string;
    fromShipper: string;
    toShipper: string;
    carrierStatus: Icon;
    fromShipperStatus: string;
    toShipperStatus: string;
    requestedDate: string;
    fromBatchCode: string;
    toBatchCode: string;
    daysToExpire: string;
  }
  export interface thirdPartyTicketTable {
    grantReject: string;
    batchCode: string;
    location: string;
    tankage: string;
    grantedBy: string;
    grantedTo: string;
    daysToExpire: string;
    ticket: string;
    nomination: string;
    schedule: string;
    tickets: string;
  }