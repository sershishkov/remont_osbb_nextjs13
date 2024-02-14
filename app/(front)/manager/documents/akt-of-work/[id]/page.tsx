import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import AktAddEdit from '../AktAddEdit';

const title = 'Редактировать Акт';

export const metadata: Metadata = {
  title: title,
};

export default function AktOfWorkEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <AktAddEdit id={id} mode='edit' title={title} />;
}
