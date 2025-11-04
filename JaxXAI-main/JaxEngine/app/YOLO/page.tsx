"use client";

import dynamic from "next/dynamic";

const JaxSystemDashboard = dynamic(() => import("./jax-system-dashboard"), { ssr: false });

export default function YoloPage() {
  return <JaxSystemDashboard />;
}

