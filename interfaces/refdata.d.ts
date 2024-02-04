import { Types } from 'mongoose';

export interface I_User {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export interface I_Unit {
  _id?: string;
  unitName?: string;
}

export interface I_ProductGroup {
  _id?: string;
  productGroupName?: string;
  //Трубы, канализация, сыпучие,металлопрокат,краска...
}

export interface I_ProductType {
  _id?: string;
  productTypeName?: string;
  //стройматериалы, инвентарь, инструмент, оборудование, средства защиты
}

export interface I_Product {
  _id?: string;
  productName?: string;
  description?: string;
  unit?: Types.ObjectId | I_Unit | string;
  productGroup?: Types.ObjectId[] | I_ProductGroup[] | string[];
  productType?: Types.ObjectId | I_ProductType | string;
  priceBuyRecommend?: number;
  normPerOne?: number;
  amountInPackage?: number;
  weight?: number;
  height?: number;
  width?: number;
  length?: number;
  paintingArea?: number;
}
//////////////////////////////////////////
export interface I_ServiceWorkGroup {
  _id?: string;
  serviceWorkGroupName?: string; //Асфальт,Цоколь,ОкнаПласт, ДвериПласт, ГибкаОц,Швы межпанельные ...
}

export interface I_ThirdPartyServiceGroup {
  _id?: string;
  thirdPartyServiceGroupName?: string; //смета, доставка,обслуживание оборудования, грузоподъемные, информационные,ремонт,вывоз мусора
}

export interface I_ServiceWork {
  _id?: string;
  serviceWorkName?: string;
  description?: string;
  unit?: Types.ObjectId | I_Unit | string;
  serviceWorkGroup?: Types.ObjectId[] | I_ServiceWorkGroup[] | string[];
  priceWorkerRecommend?: number;
  priceClientRecommend?: number;

  products?: Types.ObjectId[] | I_Product[] | string[]; //цемент, краска, пенопласт...

  inventars?: Types.ObjectId[] | I_Product[] | string[]; //шпатель, ведро, венчик, кисточка...
  tools?: Types.ObjectId[] | I_Product[] | string[]; //дрель, переноска, перфоратор...
  equipment?: Types.ObjectId[] | I_Product[] | string[]; //лестница, бетономешалка, компрессор...
  workerProtection?: Types.ObjectId[] | I_Product[] | string[]; //перчатки, очки, маска, рабочая одежда...
}

export interface I_ThirdPartyService {
  _id?: string;
  thirdPartyServiceName?: string;
  description?: string;
  unit?: Types.ObjectId | I_Unit | string;
  thirdPartyServiceGroup?:
    | Types.ObjectId[]
    | I_ThirdPartyServiceGroup[]
    | string[];
  priceBuyRecommend?: number;
}
//////////////////////////////////////////

export interface I_WorkerProfession {
  _id?: string;
  workerProfessionName?: string;
  description?: string;
}

export interface I_Worker {
  _id?: string;
  user?: Types.ObjectId | I_User | string;
  firstName?: string;
  patronymic?: string;
  lastName?: string;

  workerProfessions?: Types.ObjectId[] | I_WorkerProfession[] | string[];

  passportNumber?: string;
  representedBy?: string;
  whenIssued?: Date;

  inn?: string;
  birthDay?: Date;

  telNumber?: string;
  address?: string;
}
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

export interface I_FirmType {
  _id?: string;
  firmTypeLongName?: string;
  firmTypeShortName?: string;
  //ФОП, ООО, АО, ФизЛицо...
}

export interface I_TaxationType {
  _id?: string;
  taxationTypeName?: string;

  //є платником на прибуток на загальних засадах (без ПДВ).
  //є платником єдиного податку за ставкою 5%, 3 група, не платник ПДВ
  //є платником єдиного податку , 2 група, не платник ПДВ......
}

export interface I_ContractType {
  _id?: string;
  contractTypeName?: string;
  // ['Общий',
  // 'Сумма',
  // 'Сумма Кошторис',
  // 'Предоплата',
  // 'Частичная предоплата''Частичная предоплата материал',Бюджет, РемсервисКап, РемсервисПоточн,Покупка]
}

export interface I_PaymentSource {
  _id?: string;
  paymentSourceName?: string;
  // ['Собственные',
  // 'Бюджет',
  // 'Софинанс',
  // 'Форма2',]
}

export interface I_ClientType {
  _id?: string;
  clientTypeName?: string;
  //[поставщик, покупатель, наша фирма, налоговая..., услуги]
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////

export interface I_Client {
  _id?: string;
  firmType?: Types.ObjectId | I_FirmType | string;

  clientLongName?: string;
  clientShortName?: string;

  postIndex?: string;
  address?: string;
  edrpou?: string;
  inn?: string;
  iban?: string;
  iban_budget?: string;

  passportNumber?: string;
  firstName_imen?: string;
  patronymic_imen?: string;
  lastName_imen?: string;
  firstName_rodit?: string;
  patronymic_rodit?: string;
  lastName_rodit?: string;

  certificateNumber?: string;
  representedBy?: string;
  whichActsOnTheBasis?: string;

  jobTitle?: string;
  jobTitle_rodit?: string;
  tax?: number;
  taxationType?: Types.ObjectId | I_TaxationType | string;

  certificate_PDV: string;
  telNumber?: string;
  email?: string;
  clientType?: Types.ObjectId[] | I_ClientType[];
}

export interface I_Contract {
  _id?: string;
  contractNumber?: string;
  ourFirm?: Types.ObjectId;
  client?: Types.ObjectId;
  contractDate?: Date;
  contractDescription?: string;
  workAddress?: string;
  contractType?: Types.ObjectId;
  paymentSource?: Types.ObjectId;
  responsibleManager: Types.ObjectId;
  responsibleWorker: Types.ObjectId;
  participantsOfContract?: {
    id?: string;
    _id?: string;
    participant: Types.ObjectId;
    participantPercentage: Number;
  }[];

  isMeasured: boolean;
  isEstimateCalculated: boolean;
  isEstimateHasBeenSentToClient: boolean;
  isEstimateApprovedByClient: boolean;
  isMaterialsHaveBeenOrdered: boolean;
  isMaterialsDelivered: boolean;
  isWorkCompleted: boolean;
  isDocumentsHaveBeenIssued: boolean;
  isDocumentsHaveBeenGivenToClient: boolean;
  isClientReturnedSignedDocuments: boolean;
  isContractPaid: boolean;
  isMaterialsPaid: boolean;
  isWorksPaid: boolean;
}

export interface I_StoreHouse {
  _id?: string;
  storeHouseName?: string;
  address?: string;
  products?: {
    product: Types.ObjectId;
    amount: number;
    priceInStore: number;
  }[];
  responsiblePerson?: Types.ObjectId;
}

//////////////////////////////////////////
//////////////////////////////////////////
export interface I_LocalProduct {
  row_id: string;
  product: string;
  unit: string | I_Unit;
  amount: string;
  price: string;
  rowSum?: string;
}
export interface I_LProduct {
  row_id: string;
  product: string;
  unit: string;
  amount: string;
  price: string;
  rowSum: string;
}
export interface I_ProductInNakl {
  _id?: string;
  product: Types.ObjectId | I_Product | string;
  amount: number;
  price: number;
}

export interface I_DocumentNakladnaya {
  _id?: string;
  nakladnayaNumber: string;
  nakladnayaDate: Date;
  contract: Types.ObjectId;

  products: I_ProductInNakl[];

  storeHouse: Types.ObjectId;

  isActive: Boolean;
  creator: Types.ObjectId;
  typeNakl: string;

  isDeleted: Boolean;
  whoDeleted: Types.ObjectId;
}

export interface I_ThirdPartyServiceInAkt {
  _id?: string;

  thirdPartyService?: Types.ObjectId | I_ThirdPartyService | string;
  amount?: number;
  price?: number;
  extraInformation?: string;
}
export interface I_ServiceWorkInAkt {
  _id?: string;

  serviceWork?: Types.ObjectId | I_ServiceWork | string;
  amount?: number;
  price?: number;
  extraInformation?: string;
}
export interface I_LThirdPartyService {
  row_id: string;
  thirdPartyService: string;
  extraInformation?: string;
  unit: string;
  amount: string;
  price: string;
  rowSum: string;
  extraInformation?: string;
}

export interface I_LServiceWork {
  row_id: string;
  serviceWork: string;
  extraInformation?: string;
  unit: string;
  amount: string;
  price: string;
  rowSum: string;
  extraInformation?: string;
}
export interface I_WorkRows {
  row_id: string;
  workName: string;
  extraInformation: string;
  unit: string;
  amount: string;
  price: string;
  rowSum: string;
}

export interface I_DocumentAktOfWork {
  _id?: string;
  aktOfWorkNumber: string;
  aktOfWorkDate: Date;
  contract: Types.ObjectId;
  thirdPartyServices: I_ThirdPartyServiceInAkt[];
  serviceWorks: I_ServiceWorkInAkt[];

  isActive: Boolean;
  creator: Types.ObjectId;
  typeAkt: string;

  isDeleted: Boolean;
  whoDeleted: Types.ObjectId;
  totalSums?: {
    totalThirdPartySum: string;
    totalServiceWorkSum: string;
    totalAktSum: string;
  };
}
//////////////////////////////////////////
//////////////////////////////////////////
export interface I_DocumentInvoice {
  _id?: string;
  invoiceNumber: string;
  invoiceDate: Date;
  contract: Types.ObjectId;
  thirdPartyServices: I_ThirdPartyServiceInAkt[];
  serviceWorks: I_ServiceWorkInAkt[];
  products: I_ProductInNakl[];

  isActive: Boolean;
  creator: Types.ObjectId;
  typeInvoice: string;

  isDeleted: Boolean;
  whoDeleted: Types.ObjectId;
  totalSums?: {
    totalThirdPartySum: string;
    totalServiceWorkSum: string;
    totalProductSum: string;
    totalInvoiceSum: string;
  };
}
