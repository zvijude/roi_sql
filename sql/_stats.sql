DROP FUNCTION IF EXISTS _get_stats(INT);

CREATE OR REPLACE FUNCTION _get_stats(prj_id_input INT)
RETURNS TABLE (
    "prjId" INT,

    "משימות-שבוצעו" INT,
    "משימות-בהמתנה" INT,
    "משימות-שדולגו" INT,
    "סכום-משימות-שבוצעו" NUMERIC,

    "חריגים-שאושרו" INT,
    "חריגים-שנדחו" INT,
    "חריגים-שבוטלו" INT,
    "חריגים-בהמתנה" INT,
    "סכום-חריגים-שאושרו" NUMERIC,

    "בעיות-שנפתרו" INT,
    "בעיות-שבוטלו" INT,
    "בעיות-בהמתנה" INT 
) 
AS $$
BEGIN
    RETURN QUERY
    SELECT
        q."prjId"::INT,

        -- משימות
        COALESCE(COUNT(*) FILTER (WHERE t.status = 'COMPLETED'), 0)::INT AS "משימות-שבוצעו",
        COALESCE(COUNT(*) FILTER (WHERE t.status = 'WAITING'), 0)::INT AS "משימות-בהמתנה",
        COALESCE(COUNT(*) FILTER (WHERE t.status = 'SKIPPED'), 0)::INT AS "משימות-שדולגו",
        COALESCE(SUM(mt.price) FILTER (WHERE t.status = 'COMPLETED'), 0)::NUMERIC AS "סכום-משימות-שבוצעו",

        -- בקשות חריגים
        COALESCE(COUNT(*) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'GRANTED'), 0)::INT AS "חריגים-שאושרו",
        COALESCE(COUNT(*) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'DENIED'), 0)::INT AS "חריגים-שנדחו",
        COALESCE(COUNT(*) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'CANCELED'), 0)::INT AS "חריגים-שבוטלו",
        COALESCE(COUNT(*) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'WAITING'), 0)::INT AS "חריגים-בהמתנה",
        COALESCE(SUM(p.price) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'GRANTED'), 0)::NUMERIC AS "סכום-חריגים-שאושרו",

        -- בעיות ביצוע
        COALESCE(COUNT(*) FILTER (WHERE p.type = 'PROB' AND p.status = 'SOLVED'), 0)::INT AS "בעיות-שנפתרו",
        COALESCE(COUNT(*) FILTER (WHERE p.type = 'PROB' AND p.status = 'CANCELED'), 0)::INT AS "בעיות-שבוטלו",
        COALESCE(COUNT(*) FILTER (WHERE p.type = 'PROB' AND p.status = 'WAITING'), 0)::INT AS "בעיות-בהמתנה"

    FROM "Qr" q
    LEFT JOIN "Task" t ON q.id = t."qrId"
    LEFT JOIN "MainTask" mt ON t."mainTaskId" = mt.id
    LEFT JOIN "Prob" p ON t.id = p."taskId"
    WHERE q."prjId" = prj_id_input
    GROUP BY q."prjId";
END;
$$ LANGUAGE plpgsql;
