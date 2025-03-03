CREATE VIEW _pallet AS
SELECT 
  gp.id AS glass_pallet_id,
  gp.loc,
  gp.prj_id,
  COALESCE(json_agg(
    json_build_object(
      'glass_id', g.id,
      'qntt', g.qntt,
      'height', g.height,
      'width', g.width,
      'note', g.note,
      'created_at', g.created_at,
      'created_by_name', u.name
    )
  ) FILTER (WHERE g.id IS NOT NULL), '[]') AS glass_list
FROM glass_pallet gp
LEFT JOIN glass g ON gp.id = g.glass_pallet_id
LEFT JOIN "User" u ON g.created_by_id = u.id
GROUP BY gp.id, gp.loc, gp.prj_id;
