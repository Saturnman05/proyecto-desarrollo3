USE core_db;

DELIMITER //
-- Actions
CREATE PROCEDURE ppUpsertAction (
	IN pp_action_id INT,
    IN pp_action_name VARCHAR(20)
)
BEGIN
	IF pp_action_id IS NULL THEN
		INSERT INTO actions (action_name) VALUES (pp_action_name);
	ELSE
		UPDATE actions SET action_name = pp_action_name WHERE pp_action_id = action_id;
	END IF;
END //

CREATE PROCEDURE ppSelectActions (
	IN pp_action_id INT
)
BEGIN
	IF pp_action_id IS NULL THEN
		SELECT * FROM actions;
	ELSE
		SELECT * FROM actions WHERE action_id = pp_action_id;
	END IF;
END//

CREATE FUNCTION fnSelectActionId (pp_action_name VARCHAR(20))
RETURNS INT
DETERMINISTIC
BEGIN
	DECLARE new_action_id INT;
	SET new_action_id = (SELECT action_id FROM actions WHERE action_name = pp_action_name COLLATE utf8mb4_unicode_ci);
    RETURN new_action_id;
END //

-- Roles
CREATE PROCEDURE ppUpsertRol (
	IN pp_rol_id INT,
    IN pp_rol_name VARCHAR(20)
)
BEGIN
	IF pp_rol_id IS NULL THEN
		INSERT INTO roles (rol_name) VALUES (pp_rol_name);
	ELSE
		UPDATE roles SET rol_name = pp_rol_name WHERE pp_rol_id = rol_id;
	END IF;
END//

CREATE FUNCTION fnSelectRolId (pp_rol_name VARCHAR(20))
RETURNS INT
DETERMINISTIC
BEGIN
	DECLARE new_rol_id INT;
    SET new_rol_id = (SELECT rol_id FROM roles WHERE rol_name = pp_rol_name COLLATE utf8mb4_unicode_ci);
    RETURN new_rol_id;
END//

-- Rol_Actions
CREATE PROCEDURE ppInsertRolAction (
	IN pp_rol_id INT,
    IN pp_action_id INT
)
BEGIN
	INSERT INTO rol_actions (rol_id, action_id) VALUES (pp_rol_id, pp_action_id);
END//

DELIMITER ;