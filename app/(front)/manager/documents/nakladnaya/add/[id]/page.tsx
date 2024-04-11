import type { Metadata } from 'next';

import NaklAddEdit from '../../NaklAddEdit';
import { paramsProps } from '@/interfaces/CommonInterfaces';

const title = 'Создать Накладную';

export const metadata: Metadata = {
  title: title,
};

export default function DocumentNakladnayaAddContractID({
  params,
}: Readonly<paramsProps>) {
  const { id } = params;
  return <NaklAddEdit mode='add' title={title} contractID={id} />;
}
