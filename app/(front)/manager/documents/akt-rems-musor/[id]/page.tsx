import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import AktRemsMusorAddEdit from '../AktRemsMusorAddEdit';

const title = 'Редактировать Акт';

export const metadata: Metadata = {
  title: title,
};

export default function AktRemsMusorEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <AktRemsMusorAddEdit id={id} mode='edit' title={title} />;
}
