import StarIcon from "@/assets/icons/star.svg";
import { twMerge } from "tailwind-merge";

const CardHeader = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <div className={twMerge("flex flex-col p-6 md:px-10 md:py-8", className)}>
      <div className="inline-flex items-center gap-2">
        <StarIcon className="size-9 text-emerald-300" />
        <h3 className="font-acorn text-3xl">{title}</h3>
      </div>
      <p className="text-muted mt-2 max-w-xs text-sm lg:text-base">
        {description}
      </p>
    </div>
  );
};

export default CardHeader;
