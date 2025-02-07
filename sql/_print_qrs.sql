CREATE VIEW "_print_qrs" AS
SELECT qr.*, part.name, part.desc, part.qntt FROM "Qr" qr
JOIN "Part" part ON qr."partId" = part.id
ORDER BY qr."qrNum";
