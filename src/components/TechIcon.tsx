import React from "react";

/** Filled from the #tech-icon-gradient that About defines once. */
const TechIcon = ({ component }: { component: React.ElementType }) => {
  const Component = component;
  return (
    <Component className="size-12 fill-[url(#tech-icon-gradient)] font-bold light:brightness-50 light:saturate-150" />
  );
};

export default TechIcon;
