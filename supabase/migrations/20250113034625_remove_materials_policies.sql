-- Drop the "Enable insert for all users" policy on the "materials" table
DROP POLICY IF EXISTS "Enable insert for all users" ON "public"."materials";

-- Drop the "Enable read access for all users" policy on the "materials" table
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."materials";