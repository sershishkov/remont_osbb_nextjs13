import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import ServWorkGrAddEdit from '../ServWorkGrAddEdit';

const title = 'Редактировать Группу работ';

export const metadata: Metadata = {
  title: title,
};

export default function ServiceWorkGroupEdit({
  params,
}: Readonly<paramsProps>) {
  const { id } = params;
  return <ServWorkGrAddEdit id={id} mode='edit' title={title} />;
}
