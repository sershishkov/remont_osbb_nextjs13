import type { Metadata } from 'next';

import ThirdServGroupAddEdit from '../ThirdServGroupAddEdit';

const title = 'Создать группу сторонних сервисов';

export const metadata: Metadata = {
  title: title,
};

export default function ThirdPartyServiceGroupAdd() {
  return <ThirdServGroupAddEdit mode='add' title={title} />;
}
