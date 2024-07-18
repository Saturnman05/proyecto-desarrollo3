DELIMITER //

CREATE  PROCEDURE ppInsertAction(
	IN pp_action_name VARCHAR(20)
)
BEGIN
    INSERT INTO actions (action_name) VALUES (pp_action_name);
END//

CREATE PROCEDURE ppInsertProduct(
	IN pp_name VARCHAR(100),
    IN pp_description VARCHAR(500),
    IN pp_product_image VARCHAR(200),
    IN pp_unit_price DECIMAL(18,2),
    IN pp_stock INT
)
BEGIN
	INSERT INTO productos (name, description, product_image, unit_price, stock)
    VALUES (pp_name, pp_description, pp_product_image, pp_unit_price, pp_stock);
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

CREATE PROCEDURE ppSelectProduct(
	IN pp_product_id INT
)
BEGIN
	SELECT * FROM productos WHERE product_id = pp_product_id;
END//

CREATE PROCEDURE ppSelectProducts()
BEGIN
	SELECT * FROM productos;
END//

DELIMITER ;
