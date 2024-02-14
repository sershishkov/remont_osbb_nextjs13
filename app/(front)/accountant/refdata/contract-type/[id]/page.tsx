import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import ContrTypeAddEdit from '../ContrTypeAddEdit';

const title = 'Редактировать Тип Контракта';

export const metadata: Metadata = {
  title: title,
};

export default function ContractTypeEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <ContrTypeAddEdit id={id} mode='edit' title={title} />;
}
