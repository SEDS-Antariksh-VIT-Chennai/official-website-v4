"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function NavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest('a');
      if (!target) return;
      
      const href = target.getAttribute('href');
      if (!href) return;
      
      if (
        (href.startsWith('/') || href.startsWith(window.location.origin)) &&
        !href.includes('#') // Ignore anchor links
      ) {
        const targetUrl = new URL(href, window.location.origin);
        if (targetUrl.pathname !== window.location.pathname) {
          setIsLoading(true);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/80 md:bg-black/60 md:backdrop-blur-md opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .loader {
            --color-1: #fff;
            --size: 1.5px;
            width: calc(48 * var(--size));
            height: calc(48 * var(--size));
            border-radius: 50%;
            display: inline-block;
            box-sizing: border-box;
            animation: animloader 1s linear infinite;
          }
          @keyframes animloader {
            0% {
              box-shadow: calc(-72 * var(--size)) 0 var(--color-1) inset;
            }
            100% {
              box-shadow: calc(48 * var(--size)) 0 var(--color-1) inset;
            }
          }
        `}
      </style>
      <span className="loader"></span>
      
      {/* Loading Text */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <p className="text-sm font-mono font-bold tracking-[0.5em] uppercase text-white">
          Loading
        </p>
      </div>
    </div>
  );
}
