import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="flex justify-between items-center p-5 shadow-sm h-20">
      <Image src={"/CourseGenie A.svg"} width={200} height={90} />
      <UserButton />

    </div>
  );
}

export default Header;
