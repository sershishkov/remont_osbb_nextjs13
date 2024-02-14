import type { Metadata } from 'next';

import PaySourceAddEdit from '../PaySourceAddEdit';

const title = 'Создать Источник средств';

export const metadata: Metadata = {
  title: title,
};

export default function PaymentSourceAdd() {
  return <PaySourceAddEdit mode='add' title={title} />;
}
