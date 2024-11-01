"use client";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  Sparkles,
  Upload,
  Link as LinkIcon,
  Clock,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import profilePic from "@/assets/e.png";

export function BentoGridThirdDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-zinc-500 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-200 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:dark:bg-zinc-950" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-zinc-500 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100"
      >
        <div className="w-full bg-gray-100 h-4 rounded-full dark:dark:bg-zinc-950" />
        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-200 flex-shrink-0" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-zinc-500 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100"
      >
        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-200 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-zinc-950" />
      </motion.div>
    </motion.div>
  );
};

const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skelenton-two" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-zinc-500 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 w-full h-4"
        ></motion.div>
      ))}
    </motion.div>
  );
};

const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
      style={{
        background: "linear-gradient(-45deg, #f59e0b,#fde68a)",
        backgroundSize: "400% 400%",
      }}
    >
      {" "}
      <motion.div className="h-full w-full rounded-lg flex items-center justify-center">
        {" "}
        <svg
          width="75"
          height="75"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <g clipPath="url(#clip0_105_666)">
            {" "}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M100 22C100 9.84974 90.1503 0 78 0H22C9.84974 0 0 9.84972 0 22V78.7194C0 90.8697 9.84974 100.719 22 100.719H78C90.1503 100.719 100 110.569 100 122.719V178C100 190.15 109.85 200 122 200H178C190.15 200 200 190.15 200 178V121.28C200 109.13 190.15 99.2805 178 99.2805H122C109.85 99.2805 100 89.4308 100 77.2805V22Z"
              fill="url(#paint0_linear_105_666)"
            />{" "}
          </g>{" "}
          <defs>
            {" "}
            <linearGradient
              id="paint0_linear_105_666"
              x1="14"
              y1="26"
              x2="179"
              y2="179.5"
              gradientUnits="userSpaceOnUse"
            >
              {" "}
              <stop stopColor="#09090b" />{" "}
              <stop offset="1" stopColor="#09090b" />{" "}
            </linearGradient>{" "}
            <clipPath id="clip0_105_666">
              {" "}
              <rect width="200" height="200" fill="white" />{" "}
            </clipPath>{" "}
          </defs>{" "}
        </svg>{" "}
      </motion.div>{" "}
    </motion.div>
  );
};

const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg-zinc-500 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 p-4  dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Secure storage
        </p>
        <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Reliable
        </p>
      </motion.div>
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl p-4 bg-zinc-500 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Easy sharing
        </p>
        <p className="border border-blue-500 bg-blue-100 dark:bg-blue-900/20 text-blue-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Convenient
        </p>
      </motion.div>
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl p-4 bg-zinc-500 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Temporary storage
        </p>
        <p className="border border-yellow-500 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 text-xs rounded-full px-2 py-0.5 mt-4">
          Efficient
        </p>
      </motion.div>
    </motion.div>
  );
};

const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2 space-y-2 bg-zinc-500 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100"
      >
        <Image
          src={profilePic}
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <div className="pl-3">
          <h5 className="text-sm font-medium text-neutral-400 dark:text-neutral-300">
            Ethan
          </h5>
          <p className="text-xs text-neutral-500">
            Amber provides a simple and secure way to store and share your
            images temporarily...
          </p>
        </div>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-zinc-500 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100"
      >
        <p className="text-xs text-neutral-500">Try Amber now!</p>
        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-200 flex-shrink-0" />
      </motion.div>
    </motion.div>
  );
};

const items = [
  {
    title: "Easy Upload",
    description: (
      <span className="text-sm">
        Quickly upload your images with our intuitive interface.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <Upload className="h-4 w-4 text-amber-500" />,
  },
  {
    title: "Instant Sharing",
    description: (
      <span className="text-sm">
        Get a shareable link immediately after uploading.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <LinkIcon className="h-4 w-4 text-amber-500" />,
  },
  {
    title: "Temporary Storage",
    description: (
      <span className="text-sm">
        Your images are securely stored for one month.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <Clock className="h-4 w-4 text-amber-500" />,
  },
  {
    title: "Amber Features",
    description: (
      <span className="text-sm">
        Secure, easy to share, and efficient temporary storage.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <Sparkles className="h-4 w-4 text-amber-500" />,
  },
  {
    title: "About Amber",
    description: (
      <span className="text-sm">
        Created by Ethan as a fun project for secure, temporary image storage.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <Shield className="h-4 w-4 text-amber-500" />,
  },
];
