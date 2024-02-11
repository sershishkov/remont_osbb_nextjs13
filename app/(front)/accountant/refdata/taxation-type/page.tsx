import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/accountant/refdata/taxation-type`;

export const metadata: Metadata = {
  title: 'Тип налогооблажения',
};

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
