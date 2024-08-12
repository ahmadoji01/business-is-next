"use client";
import React from "react";
import { useThemeStore } from "@/store";

const DirectionProvider = ({ children, lang }: { children: React.ReactNode; lang: string }) => {
  const { isRtl } = useThemeStore();

  const direction = lang === "ar" || isRtl ? "rtl" : "ltr";

  return (
    <div dir={direction}>
        {children}
    </div>
  );
};

export default DirectionProvider;
