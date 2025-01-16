INSERT INTO suppliers (id, name, url)
VALUES ('00000000-0000-0000-0000-000000000000',
        '不明',
        '');

-- supplier_id カラムの追加

ALTER TABLE materials ADD COLUMN supplier_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';

-- 外部キー制約の追加

ALTER TABLE materials ADD CONSTRAINT fk_supplier
FOREIGN KEY (supplier_id) REFERENCES suppliers (id);