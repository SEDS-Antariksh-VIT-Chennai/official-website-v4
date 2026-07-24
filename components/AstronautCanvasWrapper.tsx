"use client";

import dynamic from "next/dynamic";

const AstronautCanvas = dynamic(() => import("./AstronautCanvas"), {
  ssr: false,
});

export default function AstronautCanvasWrapper() {
  return <AstronautCanvas />;
}
