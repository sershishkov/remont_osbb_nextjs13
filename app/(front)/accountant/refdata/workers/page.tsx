import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import WorkersShow from './WorkersShow';
const currentURL = `/accountant/refdata/workers`;

const title = 'Сотрудники';

export const metadata: Metadata = {
  title: title,
};

export default function WorkersList() {
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <WorkersShow currentURL={currentURL} tableHeader={title} />
    </>
  );
}
