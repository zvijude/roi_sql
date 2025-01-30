-- CREATE VIEW _stats AS 
SELECT
    -- בקשות חריגים
    COUNT(*) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'GRANTED') AS "חריגים-אושר",
    COALESCE(SUM(p.price) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'GRANTED'), 0) AS "חריגים-בוצע-סכום",
    COUNT(*) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'DENIED') AS "חריגים-נדחה",
    COUNT(*) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'CANCELED') AS "חריגים-בוטל",
    COUNT(*) FILTER (WHERE p.type = 'BGT_REQ' AND p.status = 'WAITING') AS "חריגים-ממתין",

    -- בעיות ביצוע
    COUNT(*) FILTER (WHERE p.type = 'PROB' AND p.status = 'SOLVED') AS "בעיות-פתור",
    COUNT(*) FILTER (WHERE p.type = 'PROB' AND p.status = 'CANCELED') AS "בעיות-בוטל",
    COUNT(*) FILTER (WHERE p.type = 'PROB' AND p.status = 'WAITING') AS "בעיות-ממתין",

    -- משימות
    COUNT(*) FILTER (WHERE t.status = 'COMPLETED') AS "משימות-בוצע",
    COALESCE(SUM(mt.price) FILTER (WHERE t.status = 'COMPLETED'), 0) AS "משימות-בוצע-סכום",
    COUNT(*) FILTER (WHERE t.status = 'WAITING') AS "משימות-ממתין",
    COUNT(*) FILTER (WHERE t.status = 'SKIPPED') AS "משימות-נדחה"

FROM "Prob" p
JOIN "Task" t ON t.id = p."taskId"
JOIN "MainTask" mt ON t."mainTaskId" = mt.id
JOIN "Qr" q ON q.id = t."qrId"
WHERE qr.prjId = 1;
