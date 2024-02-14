import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import WorkersAddEdit from '../WorkersAddEdit';

const title = 'Редактировать Сотрудника';

export const metadata: Metadata = {
  title: title,
};

export default function WorkerEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <WorkersAddEdit id={id} mode='edit' title={title} />;
}
