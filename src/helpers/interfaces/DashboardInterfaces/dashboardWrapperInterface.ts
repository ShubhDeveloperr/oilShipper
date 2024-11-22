// import { Icon } from "@fortawesome/fontawesome-svg-core";
type Icon = React.ReactElement;

export interface nominationTable {
    "Batch Code": string;
    "Scheduled": Icon;
    "Ticketed": Icon;
    "Volume": string;
    "Projected": string;
    "Location": string;
    "Tank": string;
    "Details": string;
    "Events": string;
    "Granted To": string;
    "Supplier Consignee": string;
    "Tankage": string;
    "Carrier Status": Icon;
  }
  export interface schedulesTable {
    "Line": string;
    "Start Date": string;
    "Batch Code": string;
    "Location": string;
    "Tankage": string;
    "Granted To": string;
    "Volume": string;
    "Ticketed": Icon;
    "Action": string;
    "Date Created": string;
    "Created By": string;
  }
  export interface ticketsTable {
    "Batch Code": string;
    "Date": string;
    "Ticket": string;
    "Volume": string;
    "Granted By": string;
    "Granted To": string;
    "Event": string;
    "Location": string;
    "Supplier": string;
    "Consignee": string;
    "Tankage": string;
    "External Batch ID": string;
  }
  export interface ptoSTable {
    "PTO": string;
    "Type": string;
    "Volume": string;
    "From Shipper": string;
    "To Shipper": string;
    "Carrier Status": Icon;
    "From Shipper Status": string;
    "To Shipper Status": string;
    "Requested Date": string;
    "From Batch Code": string;
    "To Batch Code": string;
    "Days To Expire": string;
  }
  export interface thirdPartyTicketTable {
    "Grant/Reject": string;
    "Batch Code": string;
    "Location": string;
    "Tankage": string;
    "Granted By": string;
    "Granted To": string;
    "Days To Expire": string;
    "Ticket": string;
    "Nomination": string;
    "Schedule": string;
    "Tickets": string;
  }