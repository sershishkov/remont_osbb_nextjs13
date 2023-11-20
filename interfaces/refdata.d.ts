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
  passportSeries?: string;
  passportNumber?: string;
  representedBy?: string;
  whenIssued?: Date;

  inn?: string;
  birthDay?: Date;

  telNumber?: string;
  address?: string;
}
