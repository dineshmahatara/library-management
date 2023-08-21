// pages/404.js
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div>
      <h1>Page not found</h1>
      <p>The page you're looking for does not exist.</p>
      <Link href="/">Go back to home</Link>
    </div>
  );
};

export default Custom404;
