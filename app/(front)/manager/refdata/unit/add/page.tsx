import type { Metadata } from 'next';

import UnitAddEdit from '../UnitAddEdit';

const title = 'Создать Единицу измерения';

export const metadata: Metadata = {
  title: title,
};

export default function UnitAdd() {
  return <UnitAddEdit mode='add' title={title} />;
}
