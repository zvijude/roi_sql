-- SELECT *
-- FROM "Prob" p
-- JOIN "Task" t ON p."taskId" = t.id
-- JOIN "Qr" q ON t."qrId" = q.id
-- WHERE q."floor" = 25;

SELECT * from _stats
WHERE "Qr".floor = 25;