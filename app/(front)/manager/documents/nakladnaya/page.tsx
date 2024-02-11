import type { Metadata } from 'next';

import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/manager/documents/nakladnaya`;

export const metadata: Metadata = {
  title: 'Накладные',
};

function DocumentNakladnayaList() {
  const headerFields = [
    '№ Дог',
    '№ накладн',
    'Сумма накладн',
    'Наша Фирма',
    'Клиент',
    'Работа',
  ];
  const tableFields = [
    'contract.contractNumber',
    'nakladnayaNumber',

    'totalNaklSum',
    'contract.ourFirm.clientShortName',
    'contract.client.clientShortName',
    'contract.contractDescription',
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
