import { PropsWithChildren } from "react";

export default function BaseLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-background dark:bg-[#222831] dark:text-white">
      {children}
    </div>
  );
}
