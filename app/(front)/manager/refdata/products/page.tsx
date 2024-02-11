import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/manager/refdata/products`;

export const metadata: Metadata = {
  title: 'Товары',
};

function ProductsList() {
  const headerFields = ['Наименование', 'ед.изм', 'Цена вход', 'Тип товара'];
  const tableFields = [
    'productName',
    'unit.unitName',
    'priceBuyRecommend',
    'productType.productTypeName',
  ];

  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={`Товары`}
      />
    </>
  );
}

export default ProductsList;
