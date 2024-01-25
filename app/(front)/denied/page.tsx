import Link from 'next/link';

export default function Denied() {
  return (
    <section>
      <h1 style={{ color: 'white' }}>Access Denied</h1>
      <p>
        You are logged in, but you do not have the required access level to view
        this page.
      </p>
      <Link href='/'>Return to Home Page</Link>
    </section>
  );
}
