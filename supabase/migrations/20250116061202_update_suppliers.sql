-- 1. id カラムのデフォルト値を追加

ALTER TABLE suppliers
ALTER COLUMN id
SET DEFAULT gen_random_uuid();

-- 2. created_at カラムを追加

ALTER TABLE suppliers ADD COLUMN created_at TIMESTAMPTZ DEFAULT now();

-- 3. url カラムを NOT NULL に変更

ALTER TABLE suppliers
ALTER COLUMN url
SET NOT NULL;

