using MySql.Data.MySqlClient;

namespace ProyectoVentas.Models
{
    public class ProductModel
    {
        public int ProductId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public decimal UnitPrice { get; set; }
        public int Stock { get; set; }
        public DateTime DateCreated { get; set; }

        public static void CreateProduct(ProductModel product)
        {
            using MySqlConnection con = new(Program.connectionString);
            
            con.Open();
            MySqlTransaction transaction = con.BeginTransaction();

            try
            {
                string procedureName = "ppInsertProduct";

                using MySqlCommand cmd = new(procedureName, con);
                
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                // Parámetros del stored procedure
                cmd.Parameters.AddWithValue("pp_name", product.Name);
                cmd.Parameters.AddWithValue("pp_description", product.Description);
                cmd.Parameters.AddWithValue("pp_product_image", product.ImageUrl);
                cmd.Parameters.AddWithValue("pp_unit_price", product.UnitPrice);
                cmd.Parameters.AddWithValue("pp_stock", product.Stock);
                cmd.Parameters.AddWithValue("pp_date_created", product.DateCreated);

                // Ejecutar el stored procedure
                int rowsAffected = cmd.ExecuteNonQuery();

                transaction.Commit();                
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw new Exception($"Se hizo rollback de la transacción. {ex.Message}");
            }
        }

        // TODO: Get All
        public static List<ProductModel> GetAllProducts()
        {
            List<ProductModel> products = new();

            using MySqlConnection con = new(Program.connectionString);

            con.Open();

            try
            {
                string procedureName = "ppSelectProducts";

                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                using MySqlDataReader reader = cmd.ExecuteReader();
                
                while (reader.Read())
                {
                    ProductModel product = new()
                    {
                        ProductId = Convert.ToInt32(reader["product_id"].ToString()),
                        Name = reader["name"].ToString(),
                        Description = reader["description"].ToString(),
                        ImageUrl = reader["image_url"].ToString(),
                        UnitPrice = Convert.ToDecimal(reader["unit_price"].ToString()),
                        Stock = Convert.ToInt32(reader["stock"].ToString()),
                        DateCreated = Convert.ToDateTime(reader["date_created"].ToString())
                    };

                    products.Add(product);
                }
                
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo hacer el SELECT. {ex.Message}");
            }

            return products;
        }

        // TODO: Get by id
        public static ProductModel GetProduct(int productId)
        {
            ProductModel product = new() { ProductId = productId };

            using MySqlConnection con = new(Program.connectionString);

            con.Open();

            try
            {
                string procedureName = "ppSelectProduct";

                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_product_id", productId);

                using MySqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    product.Name = reader["name"].ToString();
                    product.Description = reader["description"].ToString();
                    product.ImageUrl = reader["image_url"].ToString();
                    product.UnitPrice = Convert.ToDecimal(reader["unit_price"].ToString());
                    product.Stock = Convert.ToInt32(reader["stock"].ToString());
                    product.DateCreated = Convert.ToDateTime(reader["date_created"].ToString());
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"No se pudo encontrar el producto con id = {productId} . {ex.Message}");
            }

            return product;
        }

        // TODO: Put
        public static void UpdateProduct(ProductModel product)
        {
            using MySqlConnection con = new(Program.connectionString);

            con.Open();
            MySqlTransaction transaction = con.BeginTransaction();

            try
            {
                string procedureName = "ppUpdateProduct";

                using MySqlCommand cmd = new(procedureName, con);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                // Parámetros del stored procedure
                cmd.Parameters.AddWithValue("pp_product_id", product.ProductId);
                cmd.Parameters.AddWithValue("pp_name", product.Name);
                cmd.Parameters.AddWithValue("pp_description", product.Description);
                cmd.Parameters.AddWithValue("pp_product_image", product.ImageUrl);
                cmd.Parameters.AddWithValue("pp_unit_price", product.UnitPrice);
                cmd.Parameters.AddWithValue("pp_stock", product.Stock);
                cmd.Parameters.AddWithValue("pp_date_created", product.DateCreated);

                // Ejecutar el stored procedure
                int rowsAffected = cmd.ExecuteNonQuery();

                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw new Exception($"Se hizo rollback de la transacción. {ex.Message}");
            }
        }

        // TODO: Delete
        public static void DeleteProduct(int productId)
        {
            using MySqlConnection con = new(Program.connectionString);

            con.Open();
            MySqlTransaction transaction = con.BeginTransaction();

            try
            {
                string procedureName = "ppDeleteProduct";

                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_product_id", productId);

                // Ejecutar el stored procedure
                int rowsAffected = cmd.ExecuteNonQuery();

                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw new Exception($"No se pudo eliminar el producto con id={productId}. {ex.Message}");
            }
        }
    }
}
