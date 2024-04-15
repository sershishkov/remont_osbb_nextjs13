import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import CashRegisterAddEdit from '../CashFlowTypeAddEdit';

const title = 'Редактировать Тип Операции';

export const metadata: Metadata = {
  title: title,
};

export default function CashRegisterEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <CashRegisterAddEdit id={id} mode='edit' title={title} />;
}
