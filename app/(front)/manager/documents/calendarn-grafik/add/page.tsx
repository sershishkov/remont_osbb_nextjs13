import type { Metadata } from 'next';

import CalendarnAddEdit from '../CalendarnAddEdit';

const title = 'Создать График';

export const metadata: Metadata = {
  title: title,
};

export default function CalendarnAdd() {
  return <CalendarnAddEdit mode='add' title={title} />;
}
