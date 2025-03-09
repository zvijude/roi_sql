CREATE OR REPLACE FUNCTION f_all_kablan(prjId INTEGER, kablanId INTEGER DEFAULT NULL)
RETURNS TABLE (
    kablan_id INTEGER,
    kablan_name TEXT,
    price_tasks NUMERIC,
    price_bgt_reqs NUMERIC,
    total_completed_tasks INTEGER,
    total_granted_bgt_reqs INTEGER,
    total_price NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.id::INTEGER AS kablan_id,
        u.name::TEXT AS kablan_name,
        COALESCE(SUM(mt.price), 0)::NUMERIC AS price_tasks,
        COALESCE(p.price_bgt_reqs, 0)::NUMERIC AS price_bgt_reqs,
        COALESCE(NULLIF(COUNT(DISTINCT t.id), 0), 0)::INTEGER AS total_completed_tasks,
        COALESCE(NULLIF(p.total_granted_bgt_reqs, 0), 0)::INTEGER AS total_granted_bgt_reqs,
        (
            COALESCE(SUM(mt.price), 0) + COALESCE(p.price_bgt_reqs, 0)
        )::NUMERIC AS total_price
    FROM "User" u
    LEFT JOIN "Task" t ON u.id = t."kablanId"
                        AND t.status = 'COMPLETED'
                        AND t."prjId" = prjId
    LEFT JOIN "MainTask" mt ON t."mainTaskId" = mt.id
    LEFT JOIN (
        SELECT 
            p."kablanId",
            COALESCE(SUM(p.price), 0)::NUMERIC AS price_bgt_reqs,
            COALESCE(COUNT(p.id), 0)::INTEGER AS total_granted_bgt_reqs
        FROM "Prob" p
        WHERE p.status = 'GRANTED'
              AND p.type = 'BGT_REQ'
        GROUP BY p."kablanId"
    ) p ON u.id = p."kablanId"
    WHERE u.role = 'KABLAN'
      AND (kablanId IS NULL OR u.id = kablanId) -- Apply filtering if kablanId is provided
    GROUP BY u.id, u.name, p.price_bgt_reqs, p.total_granted_bgt_reqs;
END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM f_all_kablan(1,21);