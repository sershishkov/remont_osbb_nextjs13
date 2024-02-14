import type { Metadata } from 'next';

import WorkersAddEdit from '../WorkersAddEdit';

const title = 'Создать Сотрудника';

export const metadata: Metadata = {
  title: title,
};

export default function WorkersAdd() {
  return <WorkersAddEdit mode='add' title={title} />;
}
