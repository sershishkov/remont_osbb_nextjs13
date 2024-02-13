import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import ThirdServAddEdit from '../ThirdServAddEdit';

const title = 'Редактировать Сторонний сервис';

export const metadata: Metadata = {
  title: title,
};

function ThirdPartyServicesEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <ThirdServAddEdit id={id} mode='edit' title={title} />;
}

export default ThirdPartyServicesEdit;
