-- DROP VIEW _probs 
CREATE VIEW _probs AS
SELECT 
    p.id,
    p.type,
    p."prjId",
    p.desc,
    p."kablanId",
    p."createdAt",
    p."updatedAt",
    p."resAt",
    p."resById",
    p.price,
    p.status,
    p.media,

    -- QR Details
    q."qrNum",
    q.loc,
    q.floor,
    q."aptNum",
    q.front,
    q."locInApt",
    
    -- MainTask Details
    mt.title,
    mt.order,

    -- Part Details
    pa.name AS part_name,

    -- User Details
    u_res."name" AS res_name,
    u_create."name" AS create_name,
    u_create.id AS created_by_id
    
FROM "Prob" p
LEFT JOIN "Task" t ON p."taskId" = t.id
JOIN "Qr" q ON t."qrId" = q.id
JOIN "MainTask" mt ON t."mainTaskId" = mt.id
JOIN "Part" pa ON q."partId" = pa.id
LEFT JOIN "User" u_res ON u_res.id = p."resById"
LEFT JOIN "User" u_create ON u_create.id = p."createdById"
ORDER BY p."updatedAt" DESC;
