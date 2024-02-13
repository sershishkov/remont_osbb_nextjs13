import type { Metadata } from 'next';

import ProductsAddEdit from '../ProductsAddEdit';

const title = 'Создать Товар';

export const metadata: Metadata = {
  title: title,
};

export default function ProductsAdd() {
  return <ProductsAddEdit mode='add' title={title} />;
}
