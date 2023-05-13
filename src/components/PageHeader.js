import React from "react";

export const PageHeader = ({ title }) => (
  <div style={{ paddingTop: 24 }}>
    <h2 className="has-text-weight-bold is-size-1 is-size-2-mobile is-medium is-primary page-header-tile has-text-centered has-text-primary">
      {title}
    </h2>
  </div>
);
