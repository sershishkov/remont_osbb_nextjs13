import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import ProductsAddEdit from '../ProductsAddEdit';

const title = 'Редактировать Товар';

export const metadata: Metadata = {
  title: title,
};

export default function ProductsEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <ProductsAddEdit id={id} mode='edit' title={title} />;
}
