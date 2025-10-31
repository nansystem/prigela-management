import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  // @prigela.comドメインのメールアドレスのみ許可
  const email = user?.emailAddresses[0]?.emailAddress;
  if (!email || !email.endsWith("@prigela.com")) {
    redirect("/auth-error");
  }

  return (
    <main className="flex min-h-screen flex-col p-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">ダッシュボード</h1>
          <p className="text-gray-600">Prigela管理システムへようこそ</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">ユーザー情報</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">ユーザーID:</span> {userId}
            </p>
            <p>
              <span className="font-medium">メールアドレス:</span>{" "}
              {user?.emailAddresses[0]?.emailAddress}
            </p>
            <p>
              <span className="font-medium">名前:</span> {user?.firstName}{" "}
              {user?.lastName}
            </p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">クイックアクセス</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/dashboard/materials"
              className="border rounded p-4 hover:bg-gray-50 cursor-pointer transition"
            >
              <h3 className="font-semibold mb-2">材料管理</h3>
              <p className="text-sm text-gray-600">
                材料の登録、編集、削除を行います
              </p>
            </Link>
            <Link
              href="/dashboard/suppliers"
              className="border rounded p-4 hover:bg-gray-50 cursor-pointer transition"
            >
              <h3 className="font-semibold mb-2">仕入先管理</h3>
              <p className="text-sm text-gray-600">
                仕入先の情報を管理します
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
