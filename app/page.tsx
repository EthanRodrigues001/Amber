import Section1 from "@/components/home/section1";
import Section2 from "@/components/home/section2";
import Section3 from "@/components/home/section3";
import React from "react";

// import { Toaster } from "sonner";

export default function Component() {
  return (
    <div>
      <Section1 />
      <Section2 />
      <div className="w-full">
        <Section3 />
      </div>
    </div>
  );
}
