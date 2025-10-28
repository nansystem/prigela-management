"use client";

import { SignOutButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function AuthErrorPage() {
  const [shouldSignOut, setShouldSignOut] = useState(false);

  useEffect(() => {
    // 1.5秒後に自動ログアウトをトリガー
    const timer = setTimeout(() => {
      setShouldSignOut(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // 自動的にSignOutButtonをクリック
  useEffect(() => {
    if (shouldSignOut) {
      const button = document.getElementById("auto-signout-button");
      if (button) {
        button.click();
      }
    }
  }, [shouldSignOut]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4">アクセスが拒否されました</h1>
        <p className="text-gray-600 mb-6">
          このアプリケーションは @prigela.com
          のメールアドレスのみ利用可能です。
        </p>
        <p className="text-sm text-gray-500 mb-4">
          自動的にログアウトしています...
        </p>
        {/* 非表示のSignOutButton - 自動的にクリックされる */}
        <SignOutButton redirectUrl="/">
          <button id="auto-signout-button" className="hidden">
            Sign Out
          </button>
        </SignOutButton>
      </div>
    </main>
  );
}
