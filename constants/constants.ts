export const roles = [
  {
    _id: 'user',
    caption: 'Пользователь',
  },
  {
    _id: 'client',
    caption: 'Клиент',
  },
  {
    _id: 'worker',
    caption: 'Работник',
  },
  {
    _id: 'manager',
    caption: 'Менеджер',
  },
  {
    _id: 'boss',
    caption: 'Руководитель',
  },
  {
    _id: 'accountant',
    caption: 'Бухгалтер',
  },
  {
    _id: 'admin',
    caption: 'Admin',
  },
];

export const all_roles = [
  'user',
  'client',
  'worker',
  'manager',
  'boss',
  'accountant',
  'admin',
];

export const client_role = ['client', 'manager', 'boss', 'accountant', 'admin'];

export const worker_role = ['worker', 'manager', 'boss', 'accountant', 'admin'];

export const manager_role = ['manager', 'boss', 'accountant', 'admin'];

export const boss_role = ['boss', 'accountant', 'admin'];

export const accountant_role = ['accountant', 'admin'];

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
const manager_Refdata = '/manager/refdata';
export const manager_refData_links = [
  {
    link: `${manager_Refdata}/client`,
    caption: `Клиенты`,
  },
  {
    link: `${manager_Refdata}/contract`,
    caption: `Контракты`,
  },
  {
    link: `${manager_Refdata}/unit`,
    caption: `Ед.Измер`,
  },

  {
    link: `${manager_Refdata}/productgroup`,
    caption: `Группа товаров`,
  },

  {
    link: `${manager_Refdata}/producttype`,
    caption: `Тип товара`,
  },

  {
    link: `${manager_Refdata}/products`,
    caption: `Товары`,
  },

  {
    link: `${manager_Refdata}/servicework-group`,
    caption: `Группы работ`,
  },

  {
    link: `${manager_Refdata}/thirdpartyservice-group`,
    caption: `Группы работ сторонние`,
  },

  {
    link: `${manager_Refdata}/serviceworks`,
    caption: `Наши работы(услуги)`,
  },

  {
    link: `${manager_Refdata}/thirdpartyservices`,
    caption: `Сторонние работы(услуги)`,
  },
];

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
const manager_Docums = '/manager/documents';
export const manager_Docums_links = [
  {
    link: `${manager_Docums}/nakladnaya`,
    caption: `Накладные`,
  },
  {
    link: `${manager_Docums}/akt-of-work`,
    caption: `Акты`,
  },
];
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
const mainAdmin = '/admin';
export const admin_links = [
  {
    link: `${mainAdmin}/users`,
    caption: `Пользователи`,
  },
];
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
const accountant_Refdata = '/accountant/refdata';
export const accountant_refData_links = [
  {
    link: `${accountant_Refdata}/worker-profession`,
    caption: `Профессии`,
  },
  {
    link: `${accountant_Refdata}/workers`,
    caption: `Работники`,
  },
  {
    link: `${accountant_Refdata}/storehouse`,
    caption: `Склады`,
  },
  {
    link: `${accountant_Refdata}/client-type`,
    caption: `Тип Клиента`,
  },
  {
    link: `${accountant_Refdata}/contract-type`,
    caption: `Тип Контракта`,
  },

  {
    link: `${accountant_Refdata}/firm-type`,
    caption: `Тип Фирмы`,
  },
  {
    link: `${accountant_Refdata}/payment-source`,
    caption: `Источник Средств`,
  },
  {
    link: `${accountant_Refdata}/taxation-type`,
    caption: `Налогооблажение`,
  },
];

export const arr__typeNakl = [
  { _id: 'incoming', caption: 'Прибуткова накладна', prefix: '№ ПН-' },
  { _id: 'outgoing', caption: 'Видаткова накладна', prefix: '№ ВН-' },
  {
    _id: 'returnFromBuyer',
    caption: 'Накладна - Повернення клієнта',
    prefix: '№ НПК-',
  },
  {
    _id: 'returnToSupplier',
    caption: 'Накладна - Повернення постачальнику',
    prefix: '№ НПП-',
  },
];

export const arr__typeAkt = [
  {
    _id: 'incoming',
    caption: 'Вхідний акт виконаних робіт',
    prefix: '№ ВАВР-',
  },
  {
    _id: 'outgoing',
    caption: 'АКТ виконаних робіт (послуг) ',
    prefix: '№ АВР-',
  },
];

export const arr__typeInvoice = [
  {
    _id: 'incoming',
    caption: 'Вхідний рахунок',
    prefix: '№ ВР-',
  },
  {
    _id: 'outgoing',
    caption: 'Рахунок - фактура',
    prefix: '№ СФ-',
  },
];
