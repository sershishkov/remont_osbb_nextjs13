import type { Metadata } from 'next';

import ProductGrAddEdit from '../ProductGrAddEdit';

const title = 'Создать Группу товаров';

export const metadata: Metadata = {
  title: title,
};

export default function ProductGroupAdd() {
  return <ProductGrAddEdit mode='add' title={title} />;
}
