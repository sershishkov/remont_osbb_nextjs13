export const roles = [
  {
    value: 'user',
    caption: 'Пользователь',
  },
  {
    value: 'client',
    caption: 'Клиент',
  },
  {
    value: 'worker',
    caption: 'Работник',
  },
  {
    value: 'manager',
    caption: 'Менеджер',
  },
  {
    value: 'accountant',
    caption: 'Бухгалтер',
  },
  {
    value: 'boss',
    caption: 'Руководитель',
  },
  {
    value: 'admin',
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
export const refData_links = [
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
