import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import ServiceWorkShow from './ServiceWorkShow';
const currentURL = `/manager/refdata/serviceworks`;

const title = 'Услуги (работы)';

export const metadata: Metadata = {
  title: title,
};

function ServiceWorksList() {
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <ServiceWorkShow currentURL={currentURL} tableHeader={title} />
    </>
  );
}

export default ServiceWorksList;
