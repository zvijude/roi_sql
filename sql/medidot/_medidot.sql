CREATE VIEW _medidot AS
SELECT m.id AS "id",
    m.item AS "item",
    m.width AS "width",
    m.height AS "height",
    m.depth AS "depth",
    m.media AS "media",
    m."createdAt" AS "createdAt",
    m."resAt" AS "resAt",
    m."updatedAt" AS "updatedAt",
    m."isActive" AS "isActive",
    
    q."prjId" AS "prjId",
    q."qrNum" AS "qrNum",
    q.loc AS "loc",
    q.floor,
    q."aptNum",
    q.front,
    q."locInApt",

    p.name AS "part_name",
    u_create.name AS "create_name",
    u_res.name AS "res_by"
FROM medidot m
    LEFT JOIN "Qr" q ON m."qrId" = q.id
    LEFT JOIN "Part" p ON q."partId" = p.id
    LEFT JOIN "User" u_create ON m."createdById" = u_create.id
    LEFT JOIN "User" u_res ON m."updatedById" = u_res.id
ORDER BY m."resAt" DESC;


-- DROP VIEW IF EXISTS _medidot;