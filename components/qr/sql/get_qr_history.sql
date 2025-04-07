CREATE OR REPLACE FUNCTION get_qr_history(prjId INTEGER, qrNum INTEGER)
RETURNS JSONB AS $$
BEGIN
  RETURN (
    SELECT jsonb_build_object(
      'history', jsonb_build_object(
        'qrData', to_jsonb(qr),
        'tasks', (
          SELECT jsonb_agg(
            jsonb_build_object(
              'task', to_jsonb(t),
              'mainTask', to_jsonb(mt)
            )
          )
          FROM "Task" t
          JOIN "MainTask" mt ON mt."id" = t."mainTaskId"
          WHERE t."qrId" = qr."id"
        ),
        'probs', (
          SELECT jsonb_agg(to_jsonb(p))
          FROM "Prob" p
          WHERE p."taskId" IN (
            SELECT t."id"
            FROM "Task" t
            WHERE t."qrId" = qr."id"
          )
        ),
        'medidot', (
          SELECT jsonb_agg(to_jsonb(m))
          FROM "medidot" m
          WHERE m."qrId" = qr."id"
        ),
        'missing', (
          SELECT jsonb_agg(to_jsonb(ms))
          FROM "missing" ms
          WHERE ms."qrId" = qr."id"
        ),
        'part', (
          SELECT to_jsonb(p)
          FROM "Part" p
          WHERE p."id" = qr."partId"
        )
      )
    )
    FROM "Qr" qr
    WHERE qr."prjId" = prjId AND qr."qrNum" = qrNum
  );
END;
$$ LANGUAGE plpgsql STABLE;
