-- CREATE VIEW _all_kablans AS
SELECT 
    u.id AS "kablanId",
    u.name AS kablan_name,
    COALESCE(t."prjId", p."prjId") AS "prjId",
    COALESCE(t.price_tasks, 0) AS price_tasks,
    COALESCE(p.price_bgt_reqs, 0) AS price_bgt_reqs,
    COALESCE(t.price_tasks, 0) + COALESCE(p.price_bgt_reqs, 0) AS total_price,
    COALESCE(t.total_completed_tasks, 0) AS total_completed_tasks,
    COALESCE(p.total_granted_bgt_reqs, 0) AS total_granted_bgt_reqs
FROM "User" u
LEFT JOIN (
    SELECT 
        t."kablanId",
        t."prjId",
        COUNT(t.id) AS total_completed_tasks,
        COALESCE(SUM(mt.price), 0) AS price_tasks
    FROM "Task" t
    JOIN "MainTask" mt ON t."mainTaskId" = mt.id
    WHERE t.status = 'COMPLETED'
    GROUP BY t."kablanId", t."prjId"
) t ON u.id = t."kablanId"
LEFT JOIN (
    SELECT 
        p."kablanId",
        p."prjId",
        COUNT(p.id) AS total_granted_bgt_reqs,
        COALESCE(SUM(p.price), 0) AS price_bgt_reqs
    FROM "Prob" p
    WHERE p.status = 'GRANTED'
    GROUP BY p."kablanId", p."prjId"
) p ON u.id = p."kablanId" AND t."prjId" = p."prjId"
WHERE u.role = 'KABLAN';
