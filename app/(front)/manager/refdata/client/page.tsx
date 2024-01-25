import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/manager/refdata/client`;

function ServiceWorksList() {
  const headerFields = ['Фирма', 'ТИП', 'telNumber', 'email'];
  const tableFields = [
    'clientLongName',
    'firmType.firmTypeShortName',
    'telNumber',
    'email',
  ];

  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={`Контагенты`}
      />
    </>
  );
}

export default ServiceWorksList;