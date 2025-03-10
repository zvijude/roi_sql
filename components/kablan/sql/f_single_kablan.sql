CREATE OR REPLACE FUNCTION f_single_kablan(prjId INTEGER, kablanId INTEGER) RETURNS TABLE (
        price NUMERIC,
        event_type TEXT,
        created_by TEXT,
        created_at TIMESTAMP,
        res_by TEXT,
        res_at TIMESTAMP,
        updated_at TIMESTAMP
    ) AS $$ BEGIN RETURN QUERY
SELECT mt.price::NUMERIC AS price,
    'task'::TEXT AS event_type,
    cu.name::TEXT AS created_by,
    t."createdAt"::TIMESTAMP AS created_at,
    ru.name::TEXT AS res_by,
    t."resAt"::TIMESTAMP AS res_at,
    t."updatedAt"::TIMESTAMP AS updated_at
FROM "Task" t
    JOIN "MainTask" mt ON t."mainTaskId" = mt.id
    LEFT JOIN "User" cu ON t."createdById" = cu.id
    LEFT JOIN "User" ru ON t."resById" = ru.id
WHERE t."kablanId" = kablanId
    AND t.status = 'COMPLETED'
    AND t."prjId" = prjId
UNION ALL
SELECT p.price::NUMERIC AS price,
    'bgt_req'::TEXT AS event_type,
    cu.name::TEXT AS created_by,
    p."createdAt"::TIMESTAMP AS created_at,
    ru.name::TEXT AS res_by,
    p."resAt"::TIMESTAMP AS res_at,
    p."updatedAt"::TIMESTAMP AS updated_at
FROM "Prob" p
    LEFT JOIN "User" cu ON p."createdById" = cu.id
    LEFT JOIN "User" ru ON p."resById" = ru.id
WHERE p."kablanId" = kablanId
    AND p.status = 'GRANTED'
    AND p.type = 'BGT_REQ'
    AND p."prjId" = prjId
ORDER BY updated_at DESC;
END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM f_single_kablan(1, 2);

DROP FUNCTION IF EXISTS f_single_kablan(prjId INTEGER, kablanId INTEGER);