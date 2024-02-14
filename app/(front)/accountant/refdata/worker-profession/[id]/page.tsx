import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import WorkerProfAddEdit from '../WorkerProfAddEdit';

const title = 'Редактировать Профессию';

export const metadata: Metadata = {
  title: title,
};

export default function WorkerProfessionEdit({
  params,
}: Readonly<paramsProps>) {
  const { id } = params;
  return <WorkerProfAddEdit id={id} mode='edit' title={title} />;
}
