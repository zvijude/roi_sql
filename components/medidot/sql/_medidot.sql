CREATE OR REPLACE VIEW _medidot AS
SELECT 
    m.id AS "id",
    m."prjId" AS "prjId",
    m.item AS "item",
    m.width AS "width",
    m.height AS "height",
    m.depth AS "depth",
    m.media AS "media",
    m."createdAt" AS "createdAt",
    m."resAt" AS "resAt",
    m."updatedAt" AS "updatedAt",
    m."isActive" AS "isActive",
    m."note" AS "note",
    
    q."qrNum" AS "qrNum",
    
    -- Location now comes from "medidot"
    m.loc AS "loc",
    m.floor AS "floor",
    m."aptNum",
    m.front,
    m."locInApt",

    -- "partId" is now optional, so we join using "m.partId"
    p.name AS "part_name",
    u_create.name AS "create_name",
    u_res.name AS "res_by"
FROM medidot m
    LEFT JOIN "Qr" q ON m."qrId" = q.id
    LEFT JOIN "Part" p ON m."partId" = p.id
    LEFT JOIN "User" u_create ON m."createdById" = u_create.id
    LEFT JOIN "User" u_res ON m."updatedById" = u_res.id
ORDER BY m."updatedAt" DESC;

-- DROP VIEW IF EXISTS _medidot;

-- SELECT * FROM _medidot;