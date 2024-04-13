import type { Metadata } from 'next';

import CashRegisterEdit from '../CashRegisterAddEdit';

const title = 'Создать Кассу';

export const metadata: Metadata = {
  title: title,
};

export default function CashRegisterAdd() {
  return <CashRegisterEdit mode='add' title={title} />;
}
