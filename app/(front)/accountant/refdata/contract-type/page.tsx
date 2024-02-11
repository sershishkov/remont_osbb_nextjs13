import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/accountant/refdata/contract-type`;

export const metadata: Metadata = {
  title: 'Тип Контракта',
};

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
