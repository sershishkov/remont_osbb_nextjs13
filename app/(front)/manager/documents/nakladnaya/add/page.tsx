import type { Metadata } from 'next';

import NaklAddEdit from '../NaklAddEdit';

const title = 'Создать Накладную';

export const metadata: Metadata = {
  title: title,
};

export default function DocumentNakladnayaAdd() {
  return <NaklAddEdit mode='add' title={title} />;
}
