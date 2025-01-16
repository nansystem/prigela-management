-- 別名管理用のテーブル作成

CREATE TABLE public.material_aliases
    (id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                 material_id UUID NOT NULL,
                                                  alias VARCHAR(255) NOT NULL DEFAULT '',
                                                                                      created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
     FOREIGN KEY (material_id) REFERENCES public.materials (id) ON DELETE CASCADE);

-- Row-Level Security の有効化

ALTER TABLE public.material_aliases ENABLE ROW LEVEL SECURITY;

-- SELECT ポリシー (認証済みユーザーのみ)

CREATE POLICY "Allow read for authenticated users" ON public.material_aliases
FOR
SELECT USING (auth.uid() IS NOT NULL);

-- INSERT ポリシー (認証済みユーザーのみ)

CREATE POLICY "Allow insert for authenticated users" ON public.material_aliases
FOR
INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- UPDATE ポリシー (認証済みユーザーのみ)

CREATE POLICY "Allow update for authenticated users" ON public.material_aliases
FOR
UPDATE USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

-- DELETE ポリシー (認証済みユーザーのみ)

CREATE POLICY "Allow delete for authenticated users" ON public.material_aliases
FOR
DELETE USING (auth.uid() IS NOT NULL);

