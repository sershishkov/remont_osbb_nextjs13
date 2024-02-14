import type { Metadata } from 'next';

import UsersAddEdit from '../UsersAddEdit';

const title = 'Создать Пользователя';

export const metadata: Metadata = {
  title: title,
};

export default function AdminUsersAdd() {
  return <UsersAddEdit mode='add' title={title} />;
}
