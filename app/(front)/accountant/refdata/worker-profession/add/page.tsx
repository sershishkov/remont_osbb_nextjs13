import type { Metadata } from 'next';

import WorkerProfAddEdit from '../WorkerProfAddEdit';

const title = 'Создать Профессию';

export const metadata: Metadata = {
  title: title,
};

export default function WorkerProfessionAdd() {
  return <WorkerProfAddEdit mode='add' title={title} />;
}
