import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import NaklRemsAddEdit from '../NaklRemsAddEdit';

const title = 'Редактировать Накладную';

export const metadata: Metadata = {
  title: title,
};

export default function NakladnayaRemsEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <NaklRemsAddEdit id={id} mode='edit' title={title} />;
}
