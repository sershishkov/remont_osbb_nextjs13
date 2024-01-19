import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/accountant/refdata/firm-type`;

function FirmTypeList() {
  const headerFields = ['Полное', 'Сокращенное'];
  const tableFields = ['firmTypeLongName', 'firmTypeShortName'];
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={`Формы собственности`}
      />
    </>
  );
}

export default FirmTypeList;
