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
    _id: 'accountant',
    caption: 'Бухгалтер',
  },
  {
    _id: 'boss',
    caption: 'Руководитель',
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
  'accountant',
  'boss',
  'admin',
];

export const client_role = ['client', 'manager', 'accountant', 'boss', 'admin'];

export const worker_role = ['worker', 'manager', 'accountant', 'boss', 'admin'];

export const manager_role = ['manager', 'accountant', 'boss', 'admin'];

export const accountant_role = ['accountant', 'boss', 'admin'];

export const boss_role = ['boss', 'admin'];
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
const manager_Refdata = '/manager/refdata';
export const manager_refData_links = [
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
];
