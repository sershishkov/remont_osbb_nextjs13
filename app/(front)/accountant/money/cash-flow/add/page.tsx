import type { Metadata } from 'next';

import CashRegisterEdit from '../CashFlowAddEdit';

const title = 'Создать операцию Кассы';

export const metadata: Metadata = {
  title: title,
};

export default function CashFlowAdd() {
  return <CashRegisterEdit mode='add' title={title} />;
}
