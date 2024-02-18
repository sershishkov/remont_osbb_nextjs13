import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import ProductListShow from './ProductListShow';

const currentURL = `/manager/refdata/products`;
const title = 'Товары';

export const metadata: Metadata = {
  title: title,
};

export default function ProductsList() {
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <ProductListShow currentURL={currentURL} tableHeader={title} />
    </>
  );
}
