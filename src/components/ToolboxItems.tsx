import React, { Fragment } from "react";
import TechIcon from "@/components/TechIcon";
import { twMerge } from "tailwind-merge";

const ToolboxItems = ({
  items,
  className,
  itemsWrapperClassName,
}: {
  items: {
    iconType: React.ElementType;
  }[];
  className?: string;
  itemsWrapperClassName?: string;
}) => {
  return (
    <div
      className={twMerge(
        "flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <div
        className={twMerge(
          "flex flex-none gap-6 py-0.5 pr-6",
          itemsWrapperClassName,
        )}
      >
        {[...new Array(2)].fill(0).map((_, idx) => (
          <Fragment key={idx}>
            {items.map((item, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-4 px-3 py-2"
              >
                <TechIcon component={item.iconType} />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ToolboxItems;
