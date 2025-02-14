

-- DROP FUNCTION IF EXISTS _get_stats_grpd(INT);


CREATE OR REPLACE FUNCTION _get_stats_grpd(prj_id_input INT)
RETURNS TABLE (
    "tasks" JSON,
    "bgtReqs" JSON,
    "probs" JSON
) 
AS $$
BEGIN
    RETURN QUERY
    SELECT

        -- משימות
        json_build_array(
            json_build_object('name', 'משימות שבוצעו', 'value', COALESCE(COUNT(*) FILTER (WHERE t.status = 'COMPLETED'), 0)),
            json_build_object('name', 'משימות בהמתנה', 'value', COALESCE(COUNT(*) FILTER (WHERE t.status = 'WAITING'), 0), 'sum', COALESCE(SUM(mt.price) FILTER (WHERE t.status = 'WAITING'), 0)),
            json_build_object('name', 'משימות שדולגו', 'value', COALESCE(COUNT(*) FILTER (WHERE t.status = 'SKIPPED'), 0), 'sum', COALESCE(SUM(mt.price) FILTER (WHERE t.status = 'SKIPPED'), 0)),
            json_build_object('name', 'סכום משימות שבוצעו', 'value', COALESCE(SUM(mt.price) FILTER (WHERE t.status = 'COMPLETED'), 0))
        ) AS "tasks",

        -- חריגים
        json_build_array(
            json_build_object('name', 'חריגים שאושרו', 'value', COALESCE(COUNT(*) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'GRANTED'), 0)),
            json_build_object('name', 'חריגים בהמתנה', 'value', COALESCE(COUNT(*) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'WAITING'), 0), 'sum', COALESCE(SUM(p.price) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'WAITING'), 0)),
            json_build_object('name', 'חריגים שנדחו', 'value', COALESCE(COUNT(*) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'DENIED'), 0), 'sum', COALESCE(SUM(p.price) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'DENIED'), 0)),
            json_build_object('name', 'חריגים שבוטלו', 'value', COALESCE(COUNT(*) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'CANCELED'), 0), 'sum', COALESCE(SUM(p.price) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'CANCELED'), 0)),
            json_build_object('name', 'סכום חריגים שאושרו', 'value', COALESCE(SUM(p.price) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'GRANTED'), 0))
        ) AS "bgtReqs",

        -- בעיות
        json_build_array(
            json_build_object('name', 'בעיות בהמתנה', 'value', COALESCE(COUNT(*) FILTER (WHERE p.type = 'PROB' AND p.status = 'WAITING'), 0)),
            json_build_object('name', 'בעיות שנפתרו', 'value', COALESCE(COUNT(*) FILTER (WHERE p.type = 'PROB' AND p.status = 'SOLVED'), 0)),
            json_build_object('name', 'בעיות שבוטלו', 'value', COALESCE(COUNT(*) FILTER (WHERE p.type = 'PROB' AND p.status = 'CANCELED'), 0))
        ) AS "probs"

    FROM "Qr" q
    LEFT JOIN "Task" t ON q.id = t."qrId"
    LEFT JOIN "MainTask" mt ON t."mainTaskId" = mt.id
    LEFT JOIN "Prob" p ON t.id = p."taskId"
    WHERE q."prjId" = prj_id_input
    GROUP BY q."prjId";
END;
$$ LANGUAGE plpgsql;
