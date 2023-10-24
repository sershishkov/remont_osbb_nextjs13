import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/admin/users`;

function AdminUsersList() {
  const headerFields = ['Name', 'email', 'role'];
  const tableFields = ['name', 'email', 'role'];

  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={`ПольЗователи`}
      />
    </>
  );
}

export default AdminUsersList;
