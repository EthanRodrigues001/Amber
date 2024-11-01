"use client";
import React from "react";
import { MaskContainer } from "../ui/svg-mask-effect";

const Section3 = () => {
  return (
    <div className="h-[40rem] w-full flex items-center justify-center  overflow-hidden">
      <MaskContainer
        revealText={
          <p className="mx-auto text-slate-800 text-center  text-4xl font-bold">
            Secure your memories with Amber. Upload, share, and store with
            confidence. Your images, your control.
          </p>
        }
      >
        Secure your memories with <span className="text-amber-500">Amber</span>.
        Upload, share, and store with confidence. Your images, your control.{" "}
        <span className="text-amber-500">:)</span>
      </MaskContainer>
    </div>
  );
};

export default Section3;
