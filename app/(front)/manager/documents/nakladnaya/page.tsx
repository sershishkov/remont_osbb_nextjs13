import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/manager/documents/nakladnaya`;

function DocumentNakladnayaList() {
  const headerFields = [
    'nakladnayaNumber',
    'active',
    'typeNakl',
    'totalNaklSum',
    'ourFirm',
    'client',
  ];
  const tableFields = [
    'nakladnayaNumber',
    'active',
    'typeNakl',
    'totalNaklSum',
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
        tableHeader={`Накладные`}
      />
    </>
  );
}

export default DocumentNakladnayaList;
