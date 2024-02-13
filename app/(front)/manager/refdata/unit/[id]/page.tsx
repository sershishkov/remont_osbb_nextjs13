import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import UnitAddEdit from '../UnitAddEdit';

const title = 'Редактировать Единицу измерения';

export const metadata: Metadata = {
  title: title,
};

export default function UnitEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <UnitAddEdit id={id} mode='edit' title={title} />;
}
