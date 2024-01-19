import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/accountant/refdata/taxation-type`;

function TaxationTypeList() {
  const headerFields = ['Наименование'];
  const tableFields = ['taxationTypeName'];
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={`Тип налогооблажения`}
      />
    </>
  );
}

export default TaxationTypeList;
