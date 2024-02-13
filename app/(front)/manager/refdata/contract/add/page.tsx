import type { Metadata } from 'next';

import ContractAddEdit from '../ContractAddEdit';

const title = 'Создать Контракт';

export const metadata: Metadata = {
  title: title,
};

export default function ContractAdd() {
  return <ContractAddEdit mode='add' title={title} />;
}
