import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/manager/refdata/thirdpartyservice-group`;

const title = 'Группы сторонних сервисов';

export const metadata: Metadata = {
  title: title,
};

export default function ThirdPartyServiceGroupList() {
  const headerFields = ['Наименование'];
  const tableFields = ['thirdPartyServiceGroupName'];
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={title}
      />
    </>
  );
}
