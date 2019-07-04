import * as React from "react";
import { Fade, GetComponentProps } from "@nickjmorrow/react-component-library";

export const SlideInFade: React.FC<
GetComponentProps<typeof Fade>
> = ({ children, ...props }) => {
  return (
    <Fade
      in={true}
      appear={true}
      styleKeys={["top"]}
      unmounted={{ top: "-40px" }}
      mounted={{ top: "0px" }}
      style={{ position: "relative" }}
	  transitionVariant={'slow'}
      {...props}
    >
      {children}
    </Fade>
  );
};
