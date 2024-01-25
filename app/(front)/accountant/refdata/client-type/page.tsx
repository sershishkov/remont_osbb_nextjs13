import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/accountant/refdata/client-type`;

function ClientTypeList() {
  const headerFields = ['Наименование'];
  const tableFields = ['clientTypeName'];
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={`Тип Клиента`}
      />
    </>
  );
}

export default ClientTypeList;
