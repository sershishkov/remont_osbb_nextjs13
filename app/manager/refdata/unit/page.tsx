import MyIconButtonAdd from '@/components/common/MyIconButtonAdd';

import TableFilter from '@/components/common/TableFilter';

import {
  unit__get_all,
  unit__delete_one,
} from '../../../features/refData/unit/unit__Slice';

const editLink = `/manager/refdata/unit`;

function ListUnit() {
  // const currentState = store.getState().users__state;
  const currentState = 'unit__state';
  const headerFields = ['Name'];
  const tableFields = ['unitName'];
  return (
    <>
      <MyIconButtonAdd href={`${editLink}/add`} />

      <TableFilter
        currentState={currentState}
        get__all={unit__get_all}
        delete__one={unit__delete_one}
        headerFields={headerFields}
        tableFields={tableFields}
        editLink={editLink}
        tableHeader={`Единицы измерения`}
      />
    </>
  );
}

export default ListUnit;
