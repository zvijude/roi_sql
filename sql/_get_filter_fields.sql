CREATE OR REPLACE FUNCTION _get_filter_fields(prj_id INT)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'floors',  (SELECT json_agg(DISTINCT floor ORDER BY floor) FROM "Qr" WHERE "prjId" = prj_id),
        'qrNums',  (SELECT json_agg("qrNum") FROM "Qr" WHERE "prjId" = prj_id),
        'aptNums', (SELECT json_agg(DISTINCT "aptNum" ORDER BY "aptNum") FROM "Qr" WHERE "prjId" = prj_id),
        'fronts',  (SELECT json_agg(DISTINCT front) FROM "Qr" WHERE "prjId" = prj_id AND front IS NOT NULL),
        'locInApt',(SELECT json_agg(DISTINCT "locInApt") FROM "Qr" WHERE "prjId" = prj_id),
        'parts',   (SELECT json_agg(DISTINCT p.name ORDER BY p.name) 
                    FROM "Qr" q 
                    JOIN "Part" p ON q."partId" = p."id" 
                    WHERE q."prjId" = prj_id),
        'users',   (SELECT json_agg(json_build_object(
                        'id', u.id,
                        'name', u.name
                    ))
                    FROM "User" u
                    JOIN "_prj_user" pu ON u.id = pu."userId"
                    WHERE pu."prjId" = prj_id)
    ) INTO result;

    RETURN result;
END;
$$ LANGUAGE plpgsql;