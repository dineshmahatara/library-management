// PageLayout.js
import React from 'react';
import RootLayout from '../../layout';
const PageLayout = ({ children }) => {
  return (
    <RootLayout>
      {/* Other layout components or styling for the page */}
      {children}
    </RootLayout>
  );
};

export default PageLayout;
