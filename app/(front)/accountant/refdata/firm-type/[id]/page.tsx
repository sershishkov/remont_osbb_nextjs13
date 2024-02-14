import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import FirmTypeAddEdit from '../FirmTypeAddEdit';

const title = 'Редактировать Форму собственности';

export const metadata: Metadata = {
  title: title,
};

export default function FirmTypeEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <FirmTypeAddEdit id={id} mode='edit' title={title} />;
}
