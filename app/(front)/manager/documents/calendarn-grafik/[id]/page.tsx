import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import CalendarnAddEdit from '../CalendarnAddEdit';

const title = 'Редактировать График';

export const metadata: Metadata = {
  title: title,
};

export default function CalendarnEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <CalendarnAddEdit id={id} mode='edit' title={title} />;
}
