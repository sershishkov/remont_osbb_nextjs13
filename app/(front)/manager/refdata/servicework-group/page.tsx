import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/manager/refdata/servicework-group`;

const title = 'Группы работ';

export const metadata: Metadata = {
  title: title,
};

export default function ServiceWorkGroupList() {
  const headerFields = ['Наименование'];
  const tableFields = ['serviceWorkGroupName'];
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
