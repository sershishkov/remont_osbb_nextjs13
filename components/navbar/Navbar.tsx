'use client';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const session = useSession();

  const signOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    signOut();
  };

  // console.log(session.data?.user);

  const user = session.data?.user;

  return (
    <div>
      <h6>Navbarjj</h6>
      {session.status == 'authenticated' && (
        <>
          <p>{`role: ${user?.role}`}</p>
          <p>{`email: ${user?.email}`}</p>
          <p>{`name: ${user?.name}`}</p>
          <button onClick={signOutHandler}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Navbar;
