import type { Metadata } from 'next';

import NaklRemsAddEdit from '../NaklRemsAddEdit';

const title = 'Создать Накладную';

export const metadata: Metadata = {
  title: title,
};

export default function NakladnayaRemsAdd() {
  return <NaklRemsAddEdit mode='add' title={title} />;
}
