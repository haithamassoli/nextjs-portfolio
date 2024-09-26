import { forwardRef } from "react";
import { classes } from "@/utils/style";
import styles from "./visually-hidden.module.css";

export const VisuallyHidden = forwardRef(
  (
    {
      className,
      showOnFocus,
      as: Component = "span",
      children,
      ...rest
    }: {
      className?: string;
      showOnFocus?: boolean;
      as?: any;
      children: React.ReactNode;
    },
    ref,
  ) => {
    const visible = false;
    return (
      <Component
        className={classes(styles.customHidden, className)}
        data-hidden={!visible && !showOnFocus}
        data-show-on-focus={showOnFocus}
        ref={ref}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);
