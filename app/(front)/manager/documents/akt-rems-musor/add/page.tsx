import type { Metadata } from 'next';

import AktRemsMusorAddEdit from '../AktRemsMusorAddEdit';

const title = 'Создать Акт';

export const metadata: Metadata = {
  title: title,
};

export default function AktRemsMusorAdd() {
  return <AktRemsMusorAddEdit mode='add' title={title} />;
}
