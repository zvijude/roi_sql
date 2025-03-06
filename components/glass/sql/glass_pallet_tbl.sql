CREATE TABLE glass_pallet (
    id SERIAL PRIMARY KEY,
    "prjId" INT NOT NULL,
    name TEXT NOT NULL,
    floor INT,
    "aptNum" INT,
    front TEXT,
    media TEXT,
    "freeLoc" TEXT,
    loc TEXT GENERATED ALWAYS AS (
        TRIM(
            COALESCE(NULLIF('קומה ' || floor::TEXT, 'קומה '), '') ||
            CASE WHEN floor IS NOT NULL AND apt_num IS NOT NULL THEN ', ' ELSE '' END ||
            COALESCE(NULLIF('דירה ' || apt_num::TEXT, 'דירה '), '') ||
            CASE WHEN (floor IS NOT NULL OR apt_num IS NOT NULL) AND front IS NOT NULL THEN ', ' ELSE '' END ||
            COALESCE(NULLIF('חזית ' || front, 'חזית '), '') ||
            CASE WHEN (floor IS NOT NULL OR apt_num IS NOT NULL OR front IS NOT NULL) AND free_loc IS NOT NULL THEN ', ' ELSE '' END ||
            COALESCE(NULLIF(free_loc, ''), '')
        )
    ) STORED,

    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "createdById" INT
);

-- DROP TABLE IF EXISTS glass_pallet;

-- ALTER TABLE glass_pallet RENAME COLUMN created_by_id TO "createdById";

-- ALTER TABLE glass_pallet DROP COLUMN loc;

-- ALTER TABLE glass_pallet ADD COLUMN loc TEXT GENERATED ALWAYS AS (
--     TRIM(
--         COALESCE(NULLIF('קומה ' || floor::TEXT, 'קומה '), '') ||
--         CASE WHEN floor IS NOT NULL AND "aptNum" IS NOT NULL THEN ', ' ELSE '' END ||
--         COALESCE(NULLIF('דירה ' || "aptNum"::TEXT, 'דירה '), '') ||
--         CASE WHEN (floor IS NOT NULL OR "aptNum" IS NOT NULL) AND front IS NOT NULL THEN ', ' ELSE '' END ||
--         COALESCE(NULLIF('חזית ' || front, 'חזית '), '') ||
--         CASE WHEN (floor IS NOT NULL OR "aptNum" IS NOT NULL OR front IS NOT NULL) AND "freeLoc" IS NOT NULL THEN ', ' ELSE '' END ||
--         COALESCE(NULLIF("freeLoc", ''), '')
--     )
-- ) STORED;
