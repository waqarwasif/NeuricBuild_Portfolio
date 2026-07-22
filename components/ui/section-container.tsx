import { cn } from "@/lib/utils";

interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function SectionContainer({
  children,
  className,
  ...props
}: SectionContainerProps) {
  return (
    <section
      className={cn("py-16 md:py-[120px] w-full", className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-[1280px] px-6">
        {children}
      </div>
    </section>
  );
}
