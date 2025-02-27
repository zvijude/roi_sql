
-- DROP VIEW IF EXISTS _miss;
CREATE VIEW _miss AS
SELECT m.id AS "id",
    m."isActive" as "isActive",
    m.item AS "item",
    m.qntt AS "qntt",
    m."createdAt" AS "createdAt",
    m."updatedAt" AS "updatedAt",
    m."resAt" AS "resAt",
    m.media AS "media",

    q."qrNum" AS "qrNum",
    q.loc AS "loc",
    q."prjId" AS "prjId",
    q.floor,
    q."aptNum",
    q.front,
    q."locInApt",

    p.name AS "part_name",
    u_create.name AS "create_name",
    u_res.name AS "res_by"
FROM missing m
    LEFT JOIN "Qr" q ON m."qrId" = q.id
    LEFT JOIN "Part" p ON q."partId" = p.id
    LEFT JOIN "User" u_create ON m."createdById" = u_create.id
    LEFT JOIN "User" u_res ON m."updatedById" = u_res.id
ORDER BY m."updatedAt" DESC;

-- DELETE FROM missing;