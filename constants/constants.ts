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

const linkRefdata = '/refdata';

export const refData_links = [
  {
    link: `${linkRefdata}/unit`,
    caption: `Ед.Измер`,
  },

  {
    link: `${linkRefdata}/productgroup`,
    caption: `Группа товаров`,
  },

  {
    link: `${linkRefdata}/producttype`,
    caption: `Тип товара`,
  },

  {
    link: `${linkRefdata}/products`,
    caption: `Товары`,
  },
  /////
  {
    link: `${linkRefdata}/servicework-group`,
    caption: `Группы работ`,
  },

  {
    link: `${linkRefdata}/thirdpartyservice-group`,
    caption: `Группы работ сторонние`,
  },

  {
    link: `${linkRefdata}/serviceworks`,
    caption: `Наши работы(услуги)`,
  },

  {
    link: `${linkRefdata}/thirdpartyservices`,
    caption: `Сторонние работы(услуги)`,
  },
];
