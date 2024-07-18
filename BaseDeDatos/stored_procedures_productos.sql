USE core_db;

DELIMITER //

CREATE PROCEDURE ppInsertProduct(
	IN pp_name VARCHAR(100),
    IN pp_description VARCHAR(500),
    IN pp_product_image VARCHAR(200),
    IN pp_unit_price DECIMAL(18,2),
    IN pp_stock INT
)
BEGIN
	INSERT INTO productos (name, description, image_url, unit_price, stock)
    VALUES (pp_name, pp_description, pp_product_image, pp_unit_price, pp_stock);
END//

CREATE PROCEDURE ppSelectProducts(
	IN pp_product_id INT
)
BEGIN
	IF pp_product_id IS NULL THEN
		SELECT * FROM productos;
	ELSE
		SELECT * FROM productos WHERE product_id = pp_product_id;
	END IF;
END//

-- CREATE PROCEDURE ppSelectProducts()
-- BEGIN
--	 SELECT * FROM productos;
-- END//

CREATE PROCEDURE ppUpdateProduct (
	IN pp_product_id INT,
	IN pp_name VARCHAR(100),
    IN pp_description VARCHAR(500),
    IN pp_product_image VARCHAR(200),
    IN pp_unit_price DECIMAL(18,2),
    IN pp_stock INT
)
BEGIN
	UPDATE productos
    SET name = pp_name, 
        description = pp_description, 
        image_url = pp_product_image, 
        unit_price = pp_unit_price,
        stock = pp_stock
    WHERE product_id = pp_product_id;
END //

CREATE PROCEDURE ppDeleteProduct (
	IN pp_product_id INT
)
BEGIN
	DELETE FROM productos WHERE product_id = pp_product_id;
END //

DELIMITER ;