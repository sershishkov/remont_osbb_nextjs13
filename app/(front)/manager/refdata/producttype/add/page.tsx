import type { Metadata } from 'next';

import ProductTypeAddEdit from '../ProductTypeAddEdit';

const title = 'Создать Тип товара';

export const metadata: Metadata = {
  title: title,
};

export default function ProductTypeAdd() {
  return <ProductTypeAddEdit mode='add' title={title} />;
}
