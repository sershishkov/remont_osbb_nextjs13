import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import TaxTypeAddEdit from '../TaxTypeAddEdit';

const title = 'Редактировать Тип налогооблажения';

export const metadata: Metadata = {
  title: title,
};

export default function TaxationTypeEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <TaxTypeAddEdit id={id} mode='edit' title={title} />;
}
