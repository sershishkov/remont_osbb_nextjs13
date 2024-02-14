import type { Metadata } from 'next';

import FirmTypeAddEdit from '../FirmTypeAddEdit';

const title = 'Создать Форму собственности';

export const metadata: Metadata = {
  title: title,
};

export default function FirmTypeAdd() {
  return <FirmTypeAddEdit mode='add' title={title} />;
}
