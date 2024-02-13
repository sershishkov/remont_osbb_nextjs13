import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import ThirdServGroupAddEdit from '../ThirdServGroupAddEdit';

const title = 'Редактировать группу сторонних сервисов';

export const metadata: Metadata = {
  title: title,
};

export default function ThirdPartyServiceGroupEdit({
  params,
}: Readonly<paramsProps>) {
  const { id } = params;
  return <ThirdServGroupAddEdit id={id} mode='edit' title={title} />;
}
