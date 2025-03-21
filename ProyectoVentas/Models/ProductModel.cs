﻿using MySql.Data.MySqlClient;
using System.Data;

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
        public int UserId { get; set; }

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
                cmd.Parameters.AddWithValue("pp_user_id", product.UserId);

                // Ejecutar el stored procedure
                int rowsAffected = cmd.ExecuteNonQuery();

                transaction.Commit();                
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw new Exception($"Se hizo rollback de la transacción. {ex.Message}");
            }
            finally
            {
                con.Close();
            }
        }

        public static List<ProductModel> GetAllProducts()
        {
            List<ProductModel> products = new();

            using MySqlConnection con = new(Program.connectionString);

            con.Open();

            try
            {
                string procedureName = "ppSelectProducts";

                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_product_id", null);
                cmd.Parameters.AddWithValue("pp_name", null);
                cmd.Parameters.AddWithValue("pp_carrito_id", null);
                cmd.Parameters.AddWithValue("pp_user_id", null);

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
                        DateCreated = Convert.ToDateTime(reader["date_created"].ToString()),
                        UserId = Convert.ToInt32(reader["user_id"])
                    };

                    products.Add(product);
                }
                
            }
            catch (Exception ex)
            {
                con.Close();
                throw new Exception($"No se pudo hacer el SELECT. {ex.Message}");
            }

            con.Close();
            return products;
        }

        public static ProductModel GetProduct(int productId)
        {
            ProductModel product = new() { ProductId = productId };

            using MySqlConnection con = new(Program.connectionString);

            con.Open();

            try
            {
                string procedureName = "ppSelectProducts";

                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_product_id", productId);
                cmd.Parameters.AddWithValue("pp_name", null);
                cmd.Parameters.AddWithValue("pp_carrito_id", null);
                cmd.Parameters.AddWithValue("pp_user_id", null);

                using MySqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    product.Name = reader["name"].ToString();
                    product.Description = reader["description"].ToString();
                    product.ImageUrl = reader["image_url"].ToString();
                    product.UnitPrice = Convert.ToDecimal(reader["unit_price"].ToString());
                    product.Stock = Convert.ToInt32(reader["stock"].ToString());
                    product.DateCreated = Convert.ToDateTime(reader["date_created"].ToString());
                    product.UserId = Convert.ToInt32(reader["user_id"]);
                }
            }
            catch (Exception ex)
            {
                con.Close();
                throw new Exception($"No se pudo encontrar el producto con id = {productId}. {ex.Message}");
            }

            con.Close();
            return product;
        }

        public static ProductModel GetProudctByName(string productName)
        {
            ProductModel product = new();

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            try
            {
                using MySqlCommand cmd = new("ppSelectProducts", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_product_id", null);
                cmd.Parameters.AddWithValue("pp_name", productName);
                cmd.Parameters.AddWithValue("pp_carrito_id", null);
                cmd.Parameters.AddWithValue("pp_user_id", null);

                MySqlDataReader reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    product.ProductId = Convert.ToInt32(reader["product_id"].ToString());
                    product.Name = reader["name"].ToString();
                    product.Description = reader["description"].ToString();
                    product.ImageUrl = reader["image_url"].ToString();
                    product.UnitPrice = Convert.ToDecimal(reader["unit_price"].ToString());
                    product.Stock = Convert.ToInt32(reader["stock"].ToString());
                    product.DateCreated = Convert.ToDateTime(reader["date_created"].ToString());
                    product.UserId = Convert.ToInt32(reader["user_id"]);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("No se pudo obtener el producto", ex);
            }

            return product;
        }

        public static List<ProductModel> GetProductsByUser(int userId)
        {
            List<ProductModel> products = new();

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            try
            {
                using MySqlCommand cmd = new("ppSelectProducts", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_product_id", null);
                cmd.Parameters.AddWithValue("pp_name", null);
                cmd.Parameters.AddWithValue("pp_carrito_id", null);
                cmd.Parameters.AddWithValue("pp_user_id", userId);

                MySqlDataReader reader = cmd.ExecuteReader();
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
                        DateCreated = Convert.ToDateTime(reader["date_created"].ToString()),
                        UserId = Convert.ToInt32(reader["user_id"])
                    };

                    products.Add(product);
                }
            }
            catch (Exception ex)
            {
                con.Close();
                throw new Exception("Error al seleccionar los productos.", ex);
            }

            con.Close();
            return products;
        }

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
                cmd.Parameters.AddWithValue("pp_user_id", product.UserId);

                // Ejecutar el stored procedure
                int rowsAffected = cmd.ExecuteNonQuery();

                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                con.Close();
                throw new Exception($"Se hizo rollback de la transacción. {ex.Message}");
            }

            con.Close();
        }

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
                cmd.Parameters.AddWithValue("pp_carrito_id", null);

                // Ejecutar el stored procedure
                int rowsAffected = cmd.ExecuteNonQuery();

                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                con.Close();
                throw new Exception($"No se pudo eliminar el producto con id={productId}. {ex.Message}");
            }

            con.Close();
        }
    }
}
