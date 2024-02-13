import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import ProductTypeAddEdit from '../ProductTypeAddEdit';

const title = 'Редактировать Тип товара';

export const metadata: Metadata = {
  title: title,
};

export default function ProductTypeEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <ProductTypeAddEdit id={id} mode='edit' title={title} />;
}
