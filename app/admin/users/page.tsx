'use client';
import React, { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const AdminUsers = () => {
  //   const session = useSession();

  //   const [role, set__role] = useState('');

  //   useEffect(() => {
  //     if (session?.data?.user.role) {
  //       set__role(session?.data?.user.role);
  //     }
  //   }, [session?.data?.user.role]);

  //   if (role !== 'admin') redirect('/');

  return <div>AdminUsers</div>;
};

export default AdminUsers;
