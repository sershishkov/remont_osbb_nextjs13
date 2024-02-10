import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/manager/documents/akt-of-work`;

function DocumentAktOfWorkList() {
  const headerFields = ['№ Акта', 'Сумма акта', 'Наша фирма', 'Клиент'];
  const tableFields = [
    'aktOfWorkNumber',

    'totalSums.totalAktSum',
    'contract.ourFirm.clientShortName',
    'contract.client.clientShortName',
  ];

  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={`Акты`}
      />
    </>
  );
}

export default DocumentAktOfWorkList;
