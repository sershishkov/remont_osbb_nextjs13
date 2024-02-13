import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import ProductGrAddEdit from '../ProductGrAddEdit';

const title = 'Редактировать Группу товаров';

export const metadata: Metadata = {
  title: title,
};

export default function ProductGroupEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <ProductGrAddEdit id={id} mode='edit' title={title} />;
}
