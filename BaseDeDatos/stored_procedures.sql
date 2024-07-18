DELIMITER //

CREATE  PROCEDURE ppInsertAction(
	IN pp_action_name VARCHAR(20)
)
BEGIN
    INSERT INTO actions (action_name) VALUES (pp_action_name);
END//

CREATE PROCEDURE ppInsertUsuario(
	IN pp_username VARCHAR(50),
    IN pp_password VARCHAR(50),
    IN pp_email VARCHAR(200),
    IN pp_rol_id INT,
    IN pp_full_name VARCHAR(140)
)
BEGIN
	INSERT INTO usuarios (username, password, email, rol_id, full_name)
    VALUES (pp_username, pp_password, pp_email, pp_rol_id, pp_full_name);
END//

DELIMITER ;
