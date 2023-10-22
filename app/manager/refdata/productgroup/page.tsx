import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/manager/refdata/productgroup`;

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
