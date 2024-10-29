"use client";
import React, { useState } from "react";
import YouTube from "react-youtube";
import ReactMarkdown from "react-markdown";
import { TbCopyCheck } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const opts = {
  height: "440",
  width: "740",
  playerVars: {
    autoplay: 0,
  },
};

function ChapterContent({ chapter, content }) {
  console.log("chapter", chapter);
  console.log("content", content);

  const [copiedIndex, setCopiedIndex] = useState(null); // Track the copied index

  if (!chapter) {
    return <div className="p-10 text-center text-gray-500">Loading...</div>;
  } else if (!content) {
    return (
      <div className="p-10 bg-white shadow-lg rounded-lg">
        <h2 className="font-medium text-2xl text-gray-800">{chapter?.name}</h2>
        <p className="text-gray-500">{chapter?.about}</p>
        <div className="animate-pulse mt-4">
          <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
        </div>

        <p className="text-xl font-semibold mb-2 mt-6">For More Video Contents Upgrade you Plan</p>
        <Link href={"/dashboard/upgrade"}>
            <Button>Upgrade</Button>
        </Link>
      </div>
    );
  }

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedIndex(index); // Set the copied index
      setTimeout(() => setCopiedIndex(null), 2000); // Clear message after 2 seconds
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };

  return (
    <div className="p-10 bg-white shadow-lg rounded-lg">
      <h2 className="font-medium text-2xl text-gray-800">{chapter?.name}</h2>
      <p className="text-gray-500">{chapter?.about}</p>

      {/* Video */}
      <div className="flex justify-center my-6">
        {content?.videoId && <YouTube videoId={content?.videoId} opts={opts} />}
      </div>
      <div>
        {content?.content?.map((item, index) => (
          <div key={index} className="p-5 bg-sky-50 mb-3 rounded-lg">
            <h2 className="font-bold text-lg text-gray-800">{item.title}:</h2>
            <ReactMarkdown>{item?.description}</ReactMarkdown>
            {item.code && (
              <div className="relative p-4 bg-gray-900 text-white rounded-md mt-3">
                <button
                  className="text-lg top-2 right-2 text-green-400 items-end hover:text-green-500"
                  onClick={() => handleCopy(item.code, index)}
                  aria-label="Copy code to clipboard"
                >
                  <TbCopyCheck />
                </button>
                {copiedIndex === index && (
                  <span className="absolute top-2 right-10 text-green-300">Copied!</span>
                )}
                <pre className="overflow-x-auto bg-gray-200 p-4 rounded-md">
                  <code className="text-blue-950">{item.code}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;
