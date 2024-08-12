INSERT INTO customers(id, status, name, address, organization, email, phone)
SELECT
	gen_random_uuid(),
	'semester_1',
	'Jojon ' || i,
	'Jl. Kedungsari ' || i,
	'd9e40437-2c27-4333-8e3d-f4d2c5ee2ebf',
	'jojon' || i || '@gmail.com',
	'081111111'
FROM generate_series(1, 100) as i;
