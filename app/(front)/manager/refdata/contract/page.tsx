import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/manager/refdata/contract`;

function ContractList() {
  const headerFields = [
    'contractNumber',
    'ourFirm',
    'client',

    'contractDescription',
  ];
  const tableFields = [
    'contractNumber',
    'ourFirm.clientShortName',
    'client.clientShortName',

    'contractDescription',
  ];

  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={`Контракты`}
      />
    </>
  );
}

export default ContractList;
