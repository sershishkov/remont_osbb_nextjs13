import type { Metadata } from 'next';

import AktAddEdit from '../../AktAddEdit';
import { paramsProps } from '@/interfaces/CommonInterfaces';

const title = 'Создать Акт';

export const metadata: Metadata = {
  title: title,
};

export default function AktOfWorkAddContractID({
  params,
}: Readonly<paramsProps>) {
  const { id } = params;
  return <AktAddEdit mode='add' title={title} contractID={id} />;
}
