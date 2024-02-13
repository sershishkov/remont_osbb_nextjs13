import type { Metadata } from 'next';
import { paramsProps } from '@/interfaces/CommonInterfaces';
import ContractAddEdit from '../ContractAddEdit';

const title = 'Редактировать Контракт';

export const metadata: Metadata = {
  title: title,
};

export default function ContractEdit({ params }: Readonly<paramsProps>) {
  const { id } = params;
  return <ContractAddEdit id={id} mode='edit' title={title} />;
}
