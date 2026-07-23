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
      className={cn("py-16 md:py-24 lg:py-[120px] w-full overflow-hidden", className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
