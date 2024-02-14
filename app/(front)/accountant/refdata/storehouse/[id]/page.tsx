import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import StoreHouseAddEdit from '../StoreHouseAddEdit';

const title = 'Редактировать Склад';

export const metadata: Metadata = {
  title: title,
};

export default function StoreHouseEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <StoreHouseAddEdit id={id} mode='edit' title={title} />;
}
