import type { Metadata } from 'next';

import NaklRemsAddEdit from '../../NaklRemsAddEdit';
import { paramsProps } from '@/interfaces/CommonInterfaces';

const title = 'Создать Накладную';

export const metadata: Metadata = {
  title: title,
};

export default function NakladnayaRemsAddContractID({
  params,
}: Readonly<paramsProps>) {
  const { id } = params;
  return <NaklRemsAddEdit mode='add' title={title} contractID={id} />;
}
