import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/admin/users`;

const title = 'ПольЗователи';

export const metadata: Metadata = {
  title: title,
};

export default function AdminUsersList() {
  const headerFields = ['Name', 'email', 'role'];
  const tableFields = ['name', 'email', 'role'];

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
