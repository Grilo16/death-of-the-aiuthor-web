import type { HTMLAttributes } from "react";
import { motion, type Variants } from "framer-motion";
import clsx from "clsx";

type MotionConflicts =
  | "onDrag" | "onDragStart" | "onDragEnd" | "onDragOver"
  | "onAnimationStart" | "onAnimationEnd";

type SectionVariant = "container" | "container-fluid" | "narrow";
type SectionBg = "transparent" | "dark" | "darker" | "light";
type SectionAnimation = "fade-up" | "fade-in" | "slide-left" | "none";

const sectionAnimations: Record<Exclude<SectionAnimation, "none">, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  },
  "slide-left": {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  },
};

const variantClassMap: Record<SectionVariant, string> = {
  container: "container",
  "container-fluid": "container-fluid",
  narrow: "container" ,
};

interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, MotionConflicts> {
  variant?: SectionVariant;
  bgOpacity?: SectionBg;
  hasBorder?: boolean;
  animation?: SectionAnimation;
  children: React.ReactNode;
}

export function Section({
  variant,
  bgOpacity = "dark",
  hasBorder = false,
  animation = "fade-up",
  className,
  children,
  ...rest
}: SectionProps) {
  const isAnimated = animation !== "none";

  const sectionClass = clsx(
    "py-5",
    bgOpacity !== "transparent" && `section-${bgOpacity}`,
    hasBorder && "border-top border-bottom border-secondary border-opacity-25",
    className,
  );

  const content = variant ? (
    <div
      className={clsx(
        variantClassMap[variant],
        variant === "narrow" && "mx-auto",
      )}
      style={variant === "narrow" ? { maxWidth: 720 } : undefined}
    >
      {children}
    </div>
  ) : (
    children
  );

  if (!isAnimated) {
    return (
      <section className={sectionClass} {...rest}>
        {content}
      </section>
    );
  }

  return (
    <motion.section
      className={sectionClass}
      variants={sectionAnimations[animation]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      {...rest}
    >
      {content}
    </motion.section>
  );
}
