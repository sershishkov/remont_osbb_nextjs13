import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/manager/refdata/thirdpartyservice-group`;

function ThirdPartyServiceGroupList() {
  const headerFields = ['Наименование'];
  const tableFields = ['thirdPartyServiceGroupName'];
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={`Группы сторонних сервисов`}
      />
    </>
  );
}

export default ThirdPartyServiceGroupList;
