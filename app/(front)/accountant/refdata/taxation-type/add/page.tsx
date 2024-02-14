import type { Metadata } from 'next';

import TaxTypeAddEdit from '../TaxTypeAddEdit';

const title = 'Создать Тип налогооблажения';

export const metadata: Metadata = {
  title: title,
};

export default function TaxationTypeAdd() {
  return <TaxTypeAddEdit mode='add' title={title} />;
}
