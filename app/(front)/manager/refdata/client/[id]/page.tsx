import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import ClientAddEdit from '../ClientAddEdit';

const title = 'Редактировать Клиента';

export const metadata: Metadata = {
  title: title,
};

export default function ClientEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <ClientAddEdit id={id} mode='edit' title={title} />;
}
