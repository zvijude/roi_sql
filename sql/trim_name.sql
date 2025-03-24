-- the func
CREATE OR REPLACE FUNCTION f_trim_name()
RETURNS TRIGGER AS $$
BEGIN
    NEW.name = TRIM(NEW.name);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- the trigger
CREATE TRIGGER trim_name_trigger
BEFORE INSERT OR UPDATE ON "Part"
FOR EACH ROW EXECUTE FUNCTION f_trim_name();

