CREATE VIEW _glass_info AS
SELECT gi.id,
  gi.width,
  gi.height,
  gi.thick,
  gi.props,
  p."prjId",
  p.name AS "partName",
  p.id AS "partId",
 p.name || 
  COALESCE(' (רוחב ' || gi.width, '') || 
  COALESCE(', גובה ' || gi.height, '') || 
  COALESCE(', עובי ' || gi.thick, '') || 
  CASE 
    WHEN gi.props IS NOT NULL AND gi.props <> '' THEN ', ' || gi.props 
    ELSE '' 
  END || ')' AS "name"
FROM glass_info gi
  LEFT JOIN "Part" p ON gi."partId" = p.id
ORDER BY gi."updatedAt" DESC;

-- DROP VIEW IF EXISTS _glass_info;