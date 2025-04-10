import React from 'react';

/**
 * The StudioLayout component is a React functional component that wraps its children within a div
 * element with the id "studio-page-layout".
 * @param  - The `StudioLayout` function is a React component that takes a single prop `children`,
 * which is of type `React.ReactNode`. The `children` prop represents the content that will be rendered
 * inside the `StudioLayout` component. In this case, the `children` will be rendered inside a `
 * @returns The `StudioLayout` function is being returned, which takes in a `children` prop of type
 * `React.ReactNode` and renders a `<div>` with the id "studio-page-layout" wrapping around the
 * `children`.
 */
export default function StudioLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <div id="studio-page-layout">{children}</div>
    </React.Fragment>
  );
}
