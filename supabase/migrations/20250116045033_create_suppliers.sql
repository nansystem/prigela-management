CREATE TABLE suppliers (id UUID PRIMARY KEY,
                                        name VARCHAR(255) NOT NULL,
                                                          url TEXT DEFAULT '');

-- 読み取りポリシー (SELECT) - 認証済みユーザーのみ

CREATE POLICY "Enable read access for authenticated users" ON public.suppliers
FOR
SELECT USING (auth.uid() IS NOT NULL);

-- 挿入ポリシー (INSERT) - 認証済みユーザーのみ

CREATE POLICY "Enable insert for authenticated users" ON public.suppliers
FOR
INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- 更新ポリシー (UPDATE) - 認証済みユーザーのみ

CREATE POLICY "Enable update for authenticated users" ON public.suppliers
FOR
UPDATE USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

-- 削除ポリシー (DELETE) - 認証済みユーザーのみ

CREATE POLICY "Enable delete for authenticated users" ON public.suppliers
FOR
DELETE USING (auth.uid() IS NOT NULL);

