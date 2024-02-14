import type { Metadata } from 'next';

import ClientTypeAddEdit from '../ClientTypeAddEdit';

const title = 'Создать Тип Клиента';

export const metadata: Metadata = {
  title: title,
};

export default function ClientTypeAdd() {
  return <ClientTypeAddEdit mode='add' title={title} />;
}
