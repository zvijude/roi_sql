SELECT 
    u.id AS kablan_id,
    (
        COALESCE(SUM(mt.price), 0) +
        COALESCE(p.price_bgt_reqs, 0)
    ) AS total_price,
    COALESCE(SUM(mt.price), 0) AS task_price,
    COALESCE(p.price_bgt_reqs, 0) AS bgt_req_price,
    COALESCE(COUNT(DISTINCT t.id), 0) AS total_task,
    COALESCE(p.total_granted_bgt_reqs, 0) AS total_bgt_req
FROM "User" u
LEFT JOIN "Task" t ON u.id = t."kablanId" 
                    AND t.status = 'COMPLETED'
                    AND t."prjId" = 1
LEFT JOIN "MainTask" mt ON t."mainTaskId" = mt.id
LEFT JOIN (
    SELECT 
        p."kablanId",
        COALESCE(SUM(p.price), 0) AS price_bgt_reqs,
        COALESCE(COUNT(p.id), 0) AS total_granted_bgt_reqs
    FROM "Prob" p
    WHERE p.status = 'GRANTED' 
    AND p.type = 'BGT_REQ'
    AND p."prjId" = 1
    GROUP BY p."kablanId"
) p ON u.id = p."kablanId"
WHERE u.id = 21
GROUP BY u.id, p.price_bgt_reqs, p.total_granted_bgt_reqs;
