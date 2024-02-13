import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/manager/refdata/thirdpartyservices`;

const title = 'Сторонние сервисы';

export const metadata: Metadata = {
  title: title,
};

function ThirdPartyServicesList() {
  const headerFields = ['Наименование', 'ед.изм', 'Цена Вход'];
  const tableFields = [
    'thirdPartyServiceName',
    'unit.unitName',
    'priceBuyRecommend',
  ];

  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={title}
      />
    </>
  );
}

export default ThirdPartyServicesList;
