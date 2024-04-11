import type { Metadata } from 'next';

import AktRemsMusorAddEdit from '../../AktRemsMusorAddEdit';
import { paramsProps } from '@/interfaces/CommonInterfaces';

const title = 'Создать Акт';

export const metadata: Metadata = {
  title: title,
};

export default function AktRemsMusorAddContractID({
  params,
}: Readonly<paramsProps>) {
  const { id } = params;
  return <AktRemsMusorAddEdit mode='add' title={title} contractID={id} />;
}
