import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import PaySourceAddEdit from '../PaySourceAddEdit';

const title = 'Редактировать Источник средств';

export const metadata: Metadata = {
  title: title,
};

export default function PaymentSourceEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <PaySourceAddEdit id={id} mode='edit' title={title} />;
}
