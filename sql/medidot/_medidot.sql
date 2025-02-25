
-- DROP VIEW IF EXISTS _medidot;
CREATE VIEW _medidot AS
SELECT m.id AS "id",
    m.item AS "item",
    m.width AS "width",
    m.height AS "height",
    m.depth AS "depth",
    m.media AS "media",
    m."createdAt" AS "createdAt",

    q."prjId" AS "prjId",
    q."qrNum" AS "qrNum",
    q.loc AS "loc",
    q.floor,
    q."aptNum",
    q.front,
    q."locInApt",

    p.name AS "part_name",
    u_create.name AS "create_name"
FROM measure m
    LEFT JOIN "Qr" q ON m."qrId" = q.id
    LEFT JOIN "Part" p ON q."partId" = p.id
    LEFT JOIN "User" u_create ON m."createdById" = u_create.id
ORDER BY m."createdById" DESC;

-- DROP VIEW IF EXISTS _medidot;
