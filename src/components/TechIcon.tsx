import React from "react";

const TechIcon = ({ component }: { component: React.ElementType }) => {
  const Component = component;
  return (
    <>
      <Component className="size-12 fill-[url(#tech-icon-gradient)] font-bold" />
      <svg className="absolute size-0">
        <linearGradient id="tech-icon-gradient">
          <stop offset="0%" stopColor="#8fdcc2" />
          <stop offset="50%" stopColor="#A7F3DF" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
      </svg>
    </>
  );
};

export default TechIcon;
