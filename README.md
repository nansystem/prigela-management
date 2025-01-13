# コンポーネント設計

以下に、**Page Component** を含めたプロジェクトの層とアクセス制限を整理したテーブルを提示します。

---

| **層**                     | **役割**                                                                                                         | **アクセス可能な層**                                        | **アクセス禁止の層**                                                    |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Page Component**         | ページ単位のレイアウトや、必要なデータの取得・初期化を担当。<br>他のコンポーネントやロジックの組み合わせを管理。 | Container Component, Composable, Store                      | Repository, Presentation Component                                      |
| **Container Component**    | 状態管理とロジックを担当。Presentation Component にデータを渡し、イベントを処理。                                | Store, Composable, Presentation Component                   | Repository                                                              |
| **Presentation Component** | UI のレンダリング。ロジックや状態管理を含まない。                                                                | Container Component                                         | Store, Repository, Composable                                           |
| **Composable**             | 再利用可能なロジックや状態を提供。複数のコンポーネントで共有可能。                                               | Store, Page Component, Container Component                  | Repository, Presentation Component                                      |
| **Repository**             | データベースや API へのアクセスを一元管理。ビジネスロジックを含まない。                                          | Store                                                       | Page Component, Container Component, Presentation Component, Composable |
| **Store**                  | アプリ全体で共有する状態を管理。非同期処理やデータ取得を担当。                                                   | Repository, Page Component, Container Component, Composable | Presentation Component                                                  |

---

## **各層の役割とアクセスルール**

### **Page Component**

- **役割**:
  - ページ単位でのレイアウトやデータの初期化を行う。
  - ルートや外部コンポーネントの呼び出しを統括し、適切なコンテナにデータを渡す。
- **アクセス可能**:
  - `Store`: 状態の読み取り・更新。
  - `Composable`: 再利用可能なロジックの活用。
  - `Container Component`: 子コンポーネントとしてレイアウトやロジックを委譲。
- **アクセス禁止**:
  - `Repository`: 生データベース操作は行わない。
  - `Presentation Component`: 直接操作せず、必ず `Container Component` を介す。

---

### **例: データフロー**

1. **Page Component**:

   - ページ全体で必要なデータを取得（`Store` を使用）。
   - 必要な `Container Component` を呼び出し、状態やロジックを委譲。

2. **Container Component**:

   - ページ内のデータロジック（例: 材料の管理）を担当。
   - 状態を取得・管理し、UI コンポーネントに渡す。

3. **Presentation Component**:

   - 親コンポーネントから渡されたデータを表示。
   - イベントを親に通知。

4. **Composable**:

   - 再利用可能なロジック（例: 材料の追加・編集処理）を提供。
   - `Page Component` や `Container Component` で利用。

5. **Store**:

   - 状態を管理し、`Repository` を使用して非同期処理を行う。
   - アプリ全体で共有可能なデータを提供。

6. **Repository**:
   - データベースや API とのやり取りを抽象化。
   - `Store` を通じてデータ取得・更新を行う。

---

## **ディレクトリ構成**

```
src/
├── pages/
│   ├── MaterialsPage.vue       # 材料管理ページ
│   ├── DashboardPage.vue       # ダッシュボードページ
├── components/
│   ├── MaterialList.vue        # コンテナコンポーネント
│   ├── MaterialTable.vue       # プレゼンテーションコンポーネント
│   ├── MaterialRow.vue         # プレゼンテーションコンポーネント
│   ├── AddMaterialModal.vue    # プレゼンテーションコンポーネント
│   ├── DeleteConfirmationModal.vue # プレゼンテーションコンポーネント
├── composables/
│   ├── useAddMaterial.ts       # ロジックのカプセル化
│   ├── useEditMaterial.ts
│   ├── useDeleteMaterial.ts
├── stores/
│   ├── materialsStore.ts       # 状態管理
├── repositories/
│   ├── MaterialRepository.ts   # データベースアクセス
├── types/
│   ├── material.ts             # 型定義
```

---

## **設計のポイント**

1. **Page Component** を中心に、ルートやページごとの状態・初期化を統括する設計。
2. **Container Component** と **Composable** を活用し、ロジックの分離と再利用性を確保。
3. 各層の責務を明確化し、不適切なアクセスを防ぐことで、保守性とスケーラビリティを向上。

---

この構成により、役割分担が明確になり、各層が独立して開発・変更可能です。質問があればお気軽にどうぞ！
