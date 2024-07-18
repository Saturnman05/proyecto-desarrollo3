USE core_db;

DELIMITER //

CREATE PROCEDURE ppSelectUsers (
	IN pp_user_id INT
)
BEGIN
	IF pp_user_id IS NULL THEN
		SELECT 
			u.*,
            r.rol_name
		FROM usuarios u
        JOIN roles r ON usuarios.rol_id = roles.rol_id;
	ELSE
		SELECT 
			u.*,
            r.rol_name
		FROM usuarios u
        JOIN roles r ON usuarios.rol_id = roles.rol_id
        WHERE u.user_id = pp_user_id;
	END IF;
END//

CREATE PROCEDURE ppUpsertUsuario (
	IN pp_user_id INT,
    IN pp_username VARCHAR(50),
    IN pp_password VARCHAR(50),
    IN pp_email VARCHAR(200),
    IN pp_rol_id INT,
    IN pp_full_name VARCHAR(140)
)
BEGIN
	IF pp_user_id IS NULL THEN
		INSERT INTO usuarios (username, password, email, rol_id, full_name)
        VALUES (pp_username, pp_password, pp_email, pp_rol_id, pp_full_name);
	ELSE
		UPDATE usuarios
        SET 
			username = pp_username, password = pp_password, email = pp_email, 
            rol_id = pp_rol_id, full_name = pp_full_name
		WHERE user_id = pp_user_id;
	END IF;
END //

CREATE PROCEDURE ppDeleteUsuario (
	IN pp_user_id INT
)
BEGIN
	DELETE FROM usuarios WHERE user_id = pp_user_id;
END //

DELIMITER ;