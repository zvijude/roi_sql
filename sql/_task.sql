CREATE VIEW _tasks AS 
SELECT 
    t.id,
    t.status,
    t."kablanId",
    t.note,
    t."prjId",
    t."createdAt",
    t."updatedAt",
    t."resAt",
    t."resById",
    t.media,
    
    -- QR Details
    q."qrNum",
    q.loc,
    q.floor,
    q."aptNum",
    q.front,
    q."locInApt",
    
    -- MainTask Details
    mt.title,
    mt.desc,
    mt.order,
    mt.price,

    -- Part Details
    p.name AS part_name,

    -- User Details
    u_res."name" AS res_name,
    u_create."name" AS create_name
    
FROM "Task" t
JOIN "Qr" q ON t."qrId" = q.id
JOIN "MainTask" mt ON t."mainTaskId" = mt.id
JOIN "Part" p ON q."partId" = p.id
LEFT JOIN "User" u_res ON u_res.id = t."resById"
LEFT JOIN "User" u_create ON u_create.id = t."createdById"
WHERE t.status IS NOT NULL
ORDER BY t."updatedAt" DESC;
