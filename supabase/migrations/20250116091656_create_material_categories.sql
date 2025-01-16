-- 1. categoriesテーブルの作成

CREATE TABLE public.categories ( id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                                                                           name VARCHAR(255) NOT NULL,
                                                                                             created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());

-- 2. material_categories中間テーブルの作成

CREATE TABLE public.material_categories
    ( material_id UUID NOT NULL REFERENCES public.materials (id) ON DELETE CASCADE,
                                                                           category_id UUID NOT NULL REFERENCES public.categories (id) ON DELETE CASCADE,
                                                                                                                                                 PRIMARY KEY (material_id,
                                                                                                                                                              category_id));

-- 3. カテゴリーに基づくポリシー
-- categoriesテーブル: 読み取り・書き込みはauth.uid()が存在する場合のみ許可

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;


CREATE POLICY select_categories ON public.categories
FOR
SELECT USING (auth.uid() IS NOT NULL);


CREATE POLICY insert_categories ON public.categories
FOR
INSERT WITH CHECK (auth.uid() IS NOT NULL);


CREATE POLICY update_categories ON public.categories
FOR
UPDATE USING (auth.uid() IS NOT NULL);


CREATE POLICY delete_categories ON public.categories
FOR
DELETE USING (auth.uid() IS NOT NULL);

-- 4. material_categories中間テーブルにポリシーを追加
-- 読み取り・書き込みはauth.uid()が存在する場合のみ許可

ALTER TABLE public.material_categories ENABLE ROW LEVEL SECURITY;


CREATE POLICY select_material_categories ON public.material_categories
FOR
SELECT USING (auth.uid() IS NOT NULL);


CREATE POLICY insert_material_categories ON public.material_categories
FOR
INSERT WITH CHECK (auth.uid() IS NOT NULL);


CREATE POLICY update_material_categories ON public.material_categories
FOR
UPDATE USING (auth.uid() IS NOT NULL);


CREATE POLICY delete_material_categories ON public.material_categories
FOR
DELETE USING (auth.uid() IS NOT NULL);

