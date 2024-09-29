import React from "react";

const SectionHeader = ({
  eyebrow,
  description,
}: {
  eyebrow: string;
  description: string;
}) => {
  return (
    <>
      <h2 className="mt-6 text-center font-acorn text-3xl font-bold text-primary md:text-5xl">
        {eyebrow}
      </h2>
      <p className="mx-auto mt-4 max-w-[540px] text-center text-white/80 md:text-lg lg:text-xl">
        {description}
      </p>
    </>
  );
};

export default SectionHeader;
