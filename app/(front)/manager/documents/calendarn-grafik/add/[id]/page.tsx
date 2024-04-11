import type { Metadata } from 'next';

import CalendarnAddEdit from '../../CalendarnAddEdit';
import { paramsProps } from '@/interfaces/CommonInterfaces';

const title = 'Создать График';

export const metadata: Metadata = {
  title: title,
};

export default function CalendarnAddContractID({
  params,
}: Readonly<paramsProps>) {
  const { id } = params;
  return <CalendarnAddEdit mode='add' title={title} contractID={id} />;
}
