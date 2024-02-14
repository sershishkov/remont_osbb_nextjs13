import type { Metadata } from 'next';

import ContrTypeAddEdit from '../ContrTypeAddEdit';

const title = 'Создать Тип Контракта';

export const metadata: Metadata = {
  title: title,
};

export default function ContractTypeAdd() {
  return <ContrTypeAddEdit mode='add' title={title} />;
}
