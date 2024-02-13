import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import ServWorkAddEdit from '../ServWorkAddEdit';

const title = 'Редактировать Услугу (работу)';

export const metadata: Metadata = {
  title: title,
};

export default function ServiceWorksEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <ServWorkAddEdit id={id} mode='edit' title={title} />;
}
