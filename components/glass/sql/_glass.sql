CREATE VIEW _glass AS
SELECT 
    g.id,
    g."palletId",
    gp.loc,
    gp."prjId",
    gp.name AS "palletName",
    g.qntt,
    g.note,
    gi.height,
    gi.width,
    gi.thick,
    gi.props,
    g."createdAt"
FROM glass g
JOIN glass_pallet gp ON g."palletId" = gp.id
JOIN glass_info gi ON g."glassInfoId" = gi.id
ORDER BY g."palletId", g."createdAt";


-- DROP VIEW IF EXISTS _glass;