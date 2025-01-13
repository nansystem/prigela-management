-- Allow SELECT for authenticated users
CREATE POLICY "Authenticated users only - SELECT"
  ON public.materials
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Allow INSERT for authenticated users
CREATE POLICY "Authenticated users only - INSERT"
  ON public.materials
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Allow UPDATE for authenticated users
CREATE POLICY "Authenticated users only - UPDATE"
  ON public.materials
  FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Allow DELETE for authenticated users
CREATE POLICY "Authenticated users only - DELETE"
  ON public.materials
  FOR DELETE
  USING (auth.uid() IS NOT NULL);