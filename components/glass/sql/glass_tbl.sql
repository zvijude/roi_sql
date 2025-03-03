CREATE TABLE glass (
    id SERIAL PRIMARY KEY,
    glass_pallet_id INT REFERENCES glass_pallet(id) ON DELETE CASCADE,
    qntt INT NOT NULL,
    height INT,
    width INT,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by_id INT
);

-- DROP TABLE IF EXISTS glass;