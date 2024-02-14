import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import ClientTypeAddEdit from '../ClientTypeAddEdit';

const title = 'Редактировать Тип Клиента';

export const metadata: Metadata = {
  title: title,
};

export default function ClientTypeEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <ClientTypeAddEdit id={id} mode='edit' title={title} />;
}
