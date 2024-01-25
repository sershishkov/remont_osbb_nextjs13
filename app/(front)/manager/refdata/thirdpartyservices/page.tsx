import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/manager/refdata/thirdpartyservices`;

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
        tableHeader={`Сторонние сервисы`}
      />
    </>
  );
}

export default ThirdPartyServicesList;
