import type { Metadata } from 'next';

import ServWorkGrAddEdit from '../ServWorkGrAddEdit';

const title = 'Создать Группу работ';

export const metadata: Metadata = {
  title: title,
};

export default function ServiceWorkGroupAdd() {
  return <ServWorkGrAddEdit mode='add' title={title} />;
}
