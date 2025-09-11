export const revalidate = 0;

import { redirect } from 'next/navigation';
import { Pagination, Title } from '@/components';
import UsersTable from './ui/UsersTable';
import { getPaginatedUsers } from '@/actions';

const UsersManagementPage = async () => {

  const { ok, users = [] } = await getPaginatedUsers();
  if (!ok) redirect('/auth/login');
  return (
    <>
      <Title title="Gestión de usuarios" />

      <div className="mb-10">
        <UsersTable users={users} />

        <Pagination totalPages={3} />
      </div>
    </>
  );
}
export default UsersManagementPage;