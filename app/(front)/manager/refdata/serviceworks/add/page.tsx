import type { Metadata } from 'next';

import ServWorkAddEdit from '../ServWorkAddEdit';

const title = 'Создать Услугу (работу)';

export const metadata: Metadata = {
  title: title,
};

export default function ServiceWorksAdd() {
  return <ServWorkAddEdit mode='add' title={title} />;
}
