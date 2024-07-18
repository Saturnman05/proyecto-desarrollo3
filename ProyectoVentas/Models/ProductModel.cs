using MySql.Data.MySqlClient;

namespace ProyectoVentas.Models
{
    public class ProductModel
    {
        public int ProductId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? ImagePath { get; set; }
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
                cmd.Parameters.AddWithValue("pp_product_image", product.ImagePath);
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
                        ImagePath = reader["image_url"].ToString(),
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

        // TODO: Put

        // TODO: Delete
    }
}
