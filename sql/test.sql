SELECT 
    t.* AS "Task",
    mt.* AS "MainTask",
    q.* AS "Qr"
  FROM 
    "Task" t
  JOIN 
    "MainTask" mt ON t."mainTaskId" = mt."id"
  JOIN 
    "Qr" q ON t."qrId" = q."id"
  WHERE 
    q."id" = 23
    AND q."totalTasksCompleted" = mt."order";