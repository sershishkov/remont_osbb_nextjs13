import type { Metadata } from 'next';

import ThirdServAddEdit from '../ThirdServAddEdit';

const title = 'Создать Сторонний сервис';

export const metadata: Metadata = {
  title: title,
};

function ThirdPartyServicesAdd() {
  return <ThirdServAddEdit mode='add' title={title} />;
}

export default ThirdPartyServicesAdd;
