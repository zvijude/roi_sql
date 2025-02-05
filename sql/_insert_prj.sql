CREATE OR REPLACE FUNCTION _insert_prj(prj_name TEXT, company_id INT, user_id INT) RETURNS JSON AS $$
DECLARE result JSON;
BEGIN
INSERT INTO "Project"(prj_name, company_id, user_id)
VALUES (prj_name, company_id, user_id)
RETURNING prj_id INTO result;
RETURN result;
END;
$$ LANGUAGE plpgsql;
