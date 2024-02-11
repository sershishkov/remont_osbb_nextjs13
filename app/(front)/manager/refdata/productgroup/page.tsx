import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/manager/refdata/productgroup`;

export const metadata: Metadata = {
  title: 'Группы товаров',
};

function ProductGroupList() {
  const headerFields = ['Наименование'];
  const tableFields = ['productGroupName'];
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={`Группы товаров`}
      />
    </>
  );
}

export default ProductGroupList;
