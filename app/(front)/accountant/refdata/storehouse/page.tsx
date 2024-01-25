import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/accountant/refdata/storehouse`;

function StoreHouseList() {
  const headerFields = ['storeHouseName', 'address', 'responsiblePerson'];
  const tableFields = [
    'storeHouseName',
    'address',
    'responsiblePerson.lastName',
  ];
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={`Склады`}
      />
    </>
  );
}

export default StoreHouseList;
