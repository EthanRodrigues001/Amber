"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Sparkles, ChevronRight } from "lucide-react";
import { Lamp } from "@/components/lamp_mod";
import { FileUpload } from "@/components/test3";
import Link from "next/link";
import { SparklesCore } from "../ui/sparkles";

const Section1 = () => {
  return (
    <div className="min-h-screen  text-zinc-100 p-8 flex flex-col items-center relative overflow-hidden">
      {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_2%,black)]"></div> */}
      {/* Grid Background */}
      {/* <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(20,minmax(0,1fr))] gap-0.5 opacity-10 pointer-events-none">
        {Array.from({ length: 400 }).map((_, i) => (
          <div key={i} className="bg-zinc-700 col-span-1 row-span-1"></div>
        ))}
      </div> */}
      {/* <Toaster /> */}
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="w-full max-w-3xl relative z-10">
        <div className="mb-12 text-center">
          <div className="flex justify-center items-center mb-2">
            <Lamp />
          </div>
          <div className="flex justify-center items-center mb-5">
            <Sparkles className="w-5 h-5 mr-2 text-zinc-400" />
            <span className="text-sm font-medium text-zinc-400">
              Store With Ease
            </span>
          </div>
          <h1 className="text-8xl font-bold mb-4 bg-gradient-to-br from-amber-500 to-amber-200 text-transparent bg-clip-text">
            Amber
          </h1>
          <p className="text-zinc-400 max-w-lg mx-auto">
            Premium and secure image storage.
          </p>
        </div>

        <Card className="bg-zinc-800 border-zinc-700 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 shadow-lg overflow-hidden">
          <CardContent className="p-0 relative z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>

            <FileUpload />
          </CardContent>
        </Card>
        <div className="text-center mb-12 pt-5">
          <Link href="/storage">
            <Button variant="outline" className="group">
              View Stored Images
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Section1;
