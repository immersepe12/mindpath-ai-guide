
import { Button } from "./button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        hero: "bg-mindtalk-orange text-white hover:bg-mindtalk-orange/90 shadow-lg hover:shadow-xl font-semibold",
        journey: "bg-mindtalk-green text-white hover:bg-mindtalk-green/90 shadow-md hover:shadow-lg",
        ai: "bg-mindtalk-blue text-white hover:bg-mindtalk-blue/90 shadow-md hover:shadow-lg font-medium",
        outline: "border-2 border-mindtalk-orange text-mindtalk-orange hover:bg-mindtalk-orange hover:text-white",
        ghost: "text-mindtalk-orange hover:bg-mindtalk-orange/10"
      },
      size: {
        hero: "h-14 px-8 text-lg",
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "hero",
      size: "default"
    }
  }
);

export interface MindTalkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const MindTalkButton = forwardRef<HTMLButtonElement, MindTalkButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

MindTalkButton.displayName = "MindTalkButton";

export { MindTalkButton, buttonVariants };
