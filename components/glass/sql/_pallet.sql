CREATE VIEW _pallet AS
SELECT 
  gp.id,
  gp.loc,
  gp."prjId",
  gp.name,
  CONCAT(gp.name, ' - ', gp.loc) AS "nameLoc"
FROM glass_pallet gp
LEFT JOIN glass g ON gp.id = g."palletId"
GROUP BY gp.id, gp.loc, gp."prjId", gp.name;
