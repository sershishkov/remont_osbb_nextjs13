import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/manager/refdata/unit`;

function UnitList() {
  const headerFields = ['Ед.изм'];
  const tableFields = ['unitName'];
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={`Единицы измерения`}
      />
    </>
  );
}

export default UnitList;
