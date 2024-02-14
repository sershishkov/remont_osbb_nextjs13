import type { Metadata } from 'next';

import AktAddEdit from '../AktAddEdit';

const title = 'Создать Акт';

export const metadata: Metadata = {
  title: title,
};

export default function AktOfWorkAdd() {
  return <AktAddEdit mode='add' title={title} />;
}
