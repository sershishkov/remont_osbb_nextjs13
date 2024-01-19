import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';
const currentURL = `/accountant/refdata/payment-source`;

function PaymentSourceList() {
  const headerFields = ['Наименование'];
  const tableFields = ['paymentSourceName'];
  return (
    <>
      <MyIconButtonAdd href={`${currentURL}/add`} />

      <TableFilter
        headerFields={headerFields}
        tableFields={tableFields}
        currentURL={currentURL}
        tableHeader={`Источник средств`}
      />
    </>
  );
}

export default PaymentSourceList;
