import type { Metadata } from 'next';

import StoreHouseAddEdit from '../StoreHouseAddEdit';

const title = 'Создать Склад';

export const metadata: Metadata = {
  title: title,
};

export default function StoreHouseAdd() {
  return <StoreHouseAddEdit mode='add' title={title} />;
}
