import type { Metadata } from 'next';

import ClientAddEdit from '../ClientAddEdit';

const title = 'Создать Клиента';

export const metadata: Metadata = {
  title: title,
};

export default function NewClientAdd() {
  return <ClientAddEdit mode='add' title={title} />;
}
