import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import UsersAddEdit from '../UsersAddEdit';

const title = 'Редактировать Пользователя';

export const metadata: Metadata = {
  title: title,
};

export default function AdminUsersEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <UsersAddEdit id={id} mode='edit' title={title} />;
}
