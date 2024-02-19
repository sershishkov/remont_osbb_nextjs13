import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import ThirdServShow from './ThirdServShow';
const currentURL = `/manager/refdata/thirdpartyservices`;

const title = 'Сторонние сервисы';

export const metadata: Metadata = {
  title: title,
};

function ThirdPartyServicesList() {
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <ThirdServShow currentURL={currentURL} tableHeader={title} />
    </>
  );
}

export default ThirdPartyServicesList;
