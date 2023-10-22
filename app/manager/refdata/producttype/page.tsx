import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/manager/refdata/producttype`;

function ProductTypeList() {
  const headerFields = ['Наименование'];
  const tableFields = ['productTypeName'];
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={`Типы товаров`}
      />
    </>
  );
}

export default ProductTypeList;
