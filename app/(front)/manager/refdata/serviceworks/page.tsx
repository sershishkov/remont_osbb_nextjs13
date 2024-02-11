import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/manager/refdata/serviceworks`;

export const metadata: Metadata = {
  title: 'Услуги (работы)',
};

function ServiceWorksList() {
  const headerFields = ['Наименование', 'ед.изм', 'Цена Вход'];
  const tableFields = [
    'serviceWorkName',
    'unit.unitName',
    'priceWorkerRecommend',
  ];

  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={`Услуги (работы)`}
      />
    </>
  );
}

export default ServiceWorksList;
