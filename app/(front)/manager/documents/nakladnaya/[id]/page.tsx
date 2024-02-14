import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import NaklAddEdit from '../NaklAddEdit';

const title = 'Редактировать Накладную';

export const metadata: Metadata = {
  title: title,
};

export default function DocumentNakladnayaEdit({
  params,
}: Readonly<paramsProps>) {
  const { id } = params;
  return <NaklAddEdit id={id} mode='edit' title={title} />;
}
