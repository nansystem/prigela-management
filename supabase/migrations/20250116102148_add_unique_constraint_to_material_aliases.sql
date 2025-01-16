-- material_id にユニーク制約を追加

ALTER TABLE public.material_aliases ADD CONSTRAINT uq_material_id UNIQUE (material_id);