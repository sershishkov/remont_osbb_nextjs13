import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import CashFlowAddEdit from '../CashFlowAddEdit';

const title = 'Редактировать операцию Кассы';

export const metadata: Metadata = {
  title: title,
};

export default function CashFlowEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <CashFlowAddEdit id={id} mode='edit' title={title} />;
}
