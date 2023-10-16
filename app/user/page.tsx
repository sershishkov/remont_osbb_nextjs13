'use client';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const UserPage = () => {
  const session = useSession();
  const user = session?.data?.user;

  return (
    <div>
      <p>{`role: ${user?.role}`}</p>
      <p>{`email: ${user?.email}`}</p>
      <p>{`name: ${user?.name}`}</p>
    </div>
  );
};

export default UserPage;
