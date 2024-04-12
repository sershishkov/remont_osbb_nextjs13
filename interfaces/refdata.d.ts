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
  ourFirm?: Types.ObjectId | I_Client | string;
  client?: Types.ObjectId | I_Client | string;
  contractDate?: Date;
  contractDescription?: string;
  workAddress?: string;
  contractType?: Types.ObjectId | I_ContractType | string;
  paymentSource?: Types.ObjectId | I_PaymentSource | string;
  responsibleManager: Types.ObjectId | I_Worker | string;
  responsibleWorker: Types.ObjectId | I_Worker | string;
  participantsOfContract?: {
    id?: string;
    _id?: string;
    participant: Types.ObjectId | I_Worker | string;
    participantPercentage: Number;
  }[];

  guaranteePeriod: string;
  prepaymentPercentage: number;

  invoiceNumberBase: string;
  invoiceNumberNakl: string;
  invoiceNumberAkt: string;

  aktNumber: string;
  naklNumber: string;
  koshtorisNumber: string;

  contrProectAvtorskNumber: string;
  aktProectAvtorskNumber: string;

  jurnalAvtoskiyNumber: string;
  jurnalRabotNumber: string;
  prikazGipNumber: string;
  prikazEngineeNumber: string;
  prikazOhranaTrudaNumber: string;

  proectnSumBudjet: number;
  avtorskSumBudjet: number;
  expertizaSumBudjet: number;
  tehnadzorSumBudjet: number;
  tehnadzorSumBudjetGlava1_9: number;

  zvedeniySumBudjet: number;
  dogovornayaSumBudjet: number;
  dopUgodaSum: number;

  salaryMin: number;
  salaryLevel_3_8: number;
  planPributokSum: number;
  adminVytratySum: number;
  salaryOneDaySum: number;
  lifeTime: number;
  whereWirkIsPerfomed: string; //Где производятся работы? Подъезд, подвал, крыша
  servWorkShortForJournal: string; //заміні вікон, ремонт цоколя, ремонт кровли....

  paymentSourceProectnAvt: string; //собств, бюджет
  startMonthWorkBudjet: string; //["січень","лютий","березень","квітень","травень","червень","липень","серпень","вересень","жовтень","листопад","грудень"]
  endMonthWorkBudjet: string;
  kodDkBudjet: string;

  endWorkRemservis: Date;
  remsCalendarGrafikUnit: string;
  remsCalendarGrafikAmount: string;

  remsAktSkrytRabotWork: string;
  remsAktSkrytRabotMaterial: string;

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
  extraInformation?: string;
  unit: string | I_Unit;
  amount: string;
  price: string;
  rowSum?: string;
}
export interface I_LProduct {
  row_id: string;
  product: string;
  extraInformation?: string;
  unit: string;
  amount: string;
  price: string;
  rowSum: string;
}
export interface I_ProductInNakl {
  _id?: string;
  product: Types.ObjectId | I_Product | string;
  extraInformation?: string;
  amount: number;
  price: number;
}

export interface I_DocumentNakladnaya {
  _id?: string;
  nakladnayaNumber: string;
  nakladnayaDate: Date;
  contract: Types.ObjectId;
  naklOurFirm?: Types.ObjectId | I_Client | string;
  naklClient?: Types.ObjectId | I_Client | string;

  products: I_ProductInNakl[];

  storeHouse: Types.ObjectId;

  isActive: Boolean;
  creator: Types.ObjectId;
  typeNakl: string;
  totalNaklSum?: string;
}

export interface I_ThirdPartyServiceInAkt {
  _id?: string;

  thirdPartyService?: Types.ObjectId | I_ThirdPartyService | string;
  product?: string;
  amount?: number;
  price?: number;
  extraInformation?: string;
}
export interface I_ServiceWorkInAkt {
  _id?: string;

  serviceWork?: Types.ObjectId | I_ServiceWork | string;
  product?: string;
  amount?: number;
  price?: number;
  extraInformation?: string;
}
export interface I_LThirdPartyService {
  row_id: string;
  thirdPartyService: string;
  product?: string;
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
  product?: string;
  extraInformation?: string;
  unit: string;
  amount: string;
  price: string;
  rowSum: string;
  extraInformation?: string;
}
export interface I_WorkRows {
  row_id: string;
  workName?: string;
  product?: string;
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
  aktOurFirm?: Types.ObjectId | I_Client | string;
  aktClient?: Types.ObjectId | I_Client | string;
  thirdPartyServices: I_ThirdPartyServiceInAkt[];
  serviceWorks: I_ServiceWorkInAkt[];
  product?: string;

  isActive: Boolean;
  creator: Types.ObjectId;
  typeAkt: string;

  totalSums?: {
    totalThirdPartySum: string;
    totalServiceWorkSum: string;
    totalAktSum: string;
  };
}
//////////////////////////////////////////
//////////////////////////////////////////
export interface I_ServiceWorkInCalendarnGrafik {
  row_id?: string;
  serviceWork: string;
  unit: string;
  amount: string;
}

export interface I_CalendarnGrafik {
  _id?: string;
  contract: Types.ObjectId | I_Contract | string;
  serviceWorks: I_ServiceWorkInCalendarnGrafik[];
  creator: Types.ObjectId;
}

////////////////////////////////////////////
////////////////////////////////////////////
export interface I_RowInNakladnayaRems {
  row_id: string;
  product: string;
  extraInformation?: string;
  unit: string;
  amount: string;
  price: string;
  rowSum: string;
}
export interface I_ProductInNakladnayaRems {
  _id?: string;
  product: Types.ObjectId | I_Product | string;
  extraInformation?: string;
  amount: number;
  price: number;
  rowSum: number;
}

export interface I_NakladnayaRems {
  _id?: string;
  nakladnayaRemsNumber1: string;
  nakladnayaRemsNumber2: string;
  nakladnayaRemsNumber3: string;

  nakladnayaRemsDate: Date;
  contract: Types.ObjectId | I_Contract | string;
  //для удобного поиска
  executorFirm1?: Types.ObjectId | I_Client | string;
  executorFirm2?: Types.ObjectId | I_Client | string;
  executorFirm3?: Types.ObjectId | I_Client | string;
  clientFirm?: Types.ObjectId | I_Client | string;
  ourFirm?: Types.ObjectId | I_Client | string;

  percent2: number;
  percent3: number;
  products: I_ProductInNakladnayaRems[];
  totalRemsNaklSum?: string;
  totalRemsNaklSumToShow: number;

  creator: Types.ObjectId;
}

////////////////////////////////////////////
////////////////////////////////////////////
export interface I_RowInAktRemsMusor {
  row_id: string;
  serviceWork: string;
  extraInformation?: string;
  unit: string;
  amount: string;
  price: string;
  rowSum: string;
}
export interface I_ServiceWorkInAktRemsMusor {
  _id?: string;
  serviceWork: Types.ObjectId | I_ServiceWork | string;
  extraInformation?: string;
  amount: number;
  price: number;
  rowSum: number;
}
export interface I_AktRemsMusor {
  _id?: string;
  aktRemsMusorNumber: string;
  aktRemsMusorDate: Date;
  contract: Types.ObjectId | I_Contract | string;
  //для удобного поиска
  executorFirm?: Types.ObjectId | I_Client | string;

  clientFirm?: Types.ObjectId | I_Client | string;
  ourFirm?: Types.ObjectId | I_Client | string;

  serviceWorks: I_ServiceWorkInAktRemsMusor[];
  totalAktRemsMusorSum?: string;
  totalAktRemsMusorToShow: number;

  creator: Types.ObjectId;
}
///////////////////////////////////////////
///////////////////////////////////////////
export interface I_CashRegister {
  _id?: string;
  cashRegisterName: string; //2023_Касса_Борм_Тур_Шиш, 2023_Касса_Шиш
  allowedWorkers: Types.ObjectId[] | I_Worker[] | string[];
}

export interface I_CashMovementType {
  _id?: string;
  cashMovementTypeName: string; //шоколадка, Помощь, транспортные на сделку, допЗатраты, материалы, оплатаТруда, бензин, канцелярия, закупка иструмента, прочие расходы, снятиеБанкомат, инвестиция,зарлата менеджер
  incomeOrExpense: string;
}
export interface I_CashFlow {
  _id?: string;
  cashFlowDate: Date;
  cashFlowSum: number;
  cashMovementType: Types.ObjectId | I_CashMovementType | string;
  contract: Types.ObjectId | I_Contract | string;
  responsiblePerson: Types.ObjectId | I_Worker | string;
  additionalInformation: string;
  creator: Types.ObjectId | I_User | string;
}
