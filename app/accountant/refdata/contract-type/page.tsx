import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/accountant/refdata/contract-type`;

function ContractTypeList() {
  const headerFields = ['Наименование'];
  const tableFields = ['contractTypeName'];
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={`Тип Контракта`}
      />
    </>
  );
}

export default ContractTypeList;
