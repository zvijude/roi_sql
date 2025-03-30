CREATE OR REPLACE VIEW _miss AS
SELECT m.id AS "id",
    m."prjId" AS "prjId",
    m."isActive" AS "isActive",
    m.item AS "item",
    m.qntt AS "qntt",
    m."createdAt" AS "createdAt",
    m."updatedAt" AS "updatedAt",
    m."resAt" AS "resAt",
    m.media AS "media",
    m.note AS "note",
    q."qrNum" AS "qrNum",
    m.loc AS "loc",
    m.floor AS "floor",
    m."aptNum",
    m.front,
    m."locInApt",
    p.name AS "part_name",
    u_create.name AS "create_name",
    u_res.name AS "res_by"
FROM missing m
    LEFT JOIN "Qr" q ON m."qrId" = q.id
    LEFT JOIN "Part" p ON m."partId" = p.id
    LEFT JOIN "User" u_create ON m."createdById" = u_create.id
    LEFT JOIN "User" u_res ON m."updatedById" = u_res.id
ORDER BY m."updatedAt" DESC;

-- DROP VIEW IF EXISTS _miss;