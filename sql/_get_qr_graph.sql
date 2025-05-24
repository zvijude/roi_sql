DROP FUNCTION IF EXISTS get_qrs_chart_data(INTEGER);

CREATE FUNCTION get_qrs_chart_data(
  prj_id INTEGER,
  OUT in_progress_count INTEGER,
  OUT waiting_task_count INTEGER,
  OUT finish_count INTEGER,
  OUT on_prob_count INTEGER,
  OUT on_bgt_req_count INTEGER,
  OUT total_count INTEGER
)
AS $$
BEGIN
  SELECT
    SUM(CASE WHEN "status" = 'IN_PROGRESS' THEN 1 ELSE 0 END),
    SUM(CASE WHEN "status" = 'WAITING_TASK' THEN 1 ELSE 0 END),
    SUM(CASE WHEN "status" = 'FINISH' THEN 1 ELSE 0 END),
    SUM(CASE WHEN "status" = 'ON_PROB' THEN 1 ELSE 0 END),
    SUM(CASE WHEN "status" = 'ON_BGT_REQ' THEN 1 ELSE 0 END),
    COUNT(*)
  INTO
    in_progress_count,
    waiting_task_count,
    finish_count,
    on_prob_count,
    on_bgt_req_count,
    total_count
  FROM "Qr"
  WHERE "prjId" = prj_id;
END;
$$ LANGUAGE plpgsql;

-- Test it
SELECT * FROM get_qrs_chart_data(12);
