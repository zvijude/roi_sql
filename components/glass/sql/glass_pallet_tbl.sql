CREATE TABLE glass_pallet (
    id SERIAL PRIMARY KEY,
    prj_id INT NOT NULL,
    floor INT,
    apt_num INT,
    front TEXT,
    media TEXT,
    free_loc TEXT,
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

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by_id INT
);

-- DROP TABLE IF EXISTS glass_pallet;

