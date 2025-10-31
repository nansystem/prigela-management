import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SuppliersPage() {
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
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">仕入先管理</h1>
          <p className="text-gray-600">仕入先の情報を管理します</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">仕入先一覧</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              新規登録
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">仕入先名</th>
                  <th className="text-left py-3 px-4">担当者</th>
                  <th className="text-left py-3 px-4">電話番号</th>
                  <th className="text-left py-3 px-4">メールアドレス</th>
                  <th className="text-left py-3 px-4">住所</th>
                  <th className="text-left py-3 px-4">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4" colSpan={6}>
                    <div className="text-center text-gray-500">
                      データがありません
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
