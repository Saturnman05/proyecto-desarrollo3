using MySql.Data.MySqlClient;
using System.Data;

namespace ProyectoVentas.Models
{
    public class CarritoModel
    {
        public int CarritoId { get; set; }
        public int UserId { get; set; }

        public static void CreateCarrito(int userId)
        {
            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            using MySqlTransaction tran = con.BeginTransaction();

            try
            {
                using MySqlCommand cmd = new("ppInsertCarrito", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_user_id", userId);

                cmd.ExecuteNonQuery();

                tran.Commit();
            }
            catch (Exception ex)
            {
                tran.Rollback();
                throw new Exception(ex.Message);
            }
            finally
            {
                con.Close();
            }
        }

        public static void CreateCarrito(MySqlConnection con, MySqlTransaction transaction, int userId)
        {
            try
            {
                using MySqlCommand cmd = new("ppInsertCarrito", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_user_id", userId);

                // Asociar la transacción activa
                cmd.Transaction = transaction;

                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public static CarritoModel GetCarritoById(int carritoId)
        {
            CarritoModel carrito = new();

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            try
            {
                using MySqlCommand cmd = new("ppSelectCarrito", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_carrito_id", carritoId);
                cmd.Parameters.AddWithValue("pp_user_id", null);

                using MySqlDataReader r = cmd.ExecuteReader();
                if (r.Read())
                {
                    carrito.CarritoId = Convert.ToInt32(r["carrito_id"].ToString());
                    carrito.UserId = Convert.ToInt32(r["user_id"].ToString());
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally 
            { 
                con.Close(); 
            }

            return carrito;
        }

        public static CarritoModel GetCarritoByUser(int userId)
        {
            CarritoModel carrito = new();

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            try
            {
                using MySqlCommand cmd = new("ppSelectCarrito", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_carrito_id", null);
                cmd.Parameters.AddWithValue("pp_user_id", userId);

                using MySqlDataReader r = cmd.ExecuteReader();
                if (r.Read())
                {
                    carrito.CarritoId = Convert.ToInt32(r["carrito_id"].ToString());
                    carrito.UserId = Convert.ToInt32(r["user_id"].ToString());
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                con.Close();
            }

            return carrito;
        }

        public static void DeleteCarrito(int carritoId)
        {
            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            using MySqlTransaction tran = con.BeginTransaction();

            try
            {
                using MySqlCommand cmd = new("ppDeleteCarrito", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_carrito_id", carritoId);

                cmd.ExecuteNonQuery();
                tran.Commit();
            }
            catch (Exception ex)
            {
                tran.Rollback();
                throw new Exception(ex.Message);
            }
            finally
            {
                con.Close();
            }
        }

        public static void AddProductToCarrito(CarritoProductModel carritoProduct)
        {
            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            using MySqlTransaction tran = con.BeginTransaction();

            try
            {
                using MySqlCommand cmd = new("ppAddProductToCarrito", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_carrito_id", carritoProduct.CarritoId);
                cmd.Parameters.AddWithValue("pp_product_id", carritoProduct.ProductId);

                cmd.ExecuteNonQuery();

                tran.Commit();
            }
            catch (Exception)
            {
                tran.Rollback();
                throw;
            }
            finally
            {
                con.Close();
            }
        }

        public static List<ProductModel> GetProductsFromCarrito(int carritoId)
        {
            List<ProductModel> productos = new();

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            try
            {
                using MySqlCommand cmd = new("ppSelectProducts", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_product_id", null);
                cmd.Parameters.AddWithValue("pp_name", null);
                cmd.Parameters.AddWithValue("pp_carrito_id", carritoId);

                using MySqlDataReader r = cmd.ExecuteReader();
                while (r.Read())
                {
                    ProductModel producto = new() 
                    {
                        ProductId = Convert.ToInt32(r["product_id"].ToString()),
                        Name = r["name"].ToString(),
                        Description = r["description"].ToString(),
                        UnitPrice = Convert.ToDecimal(r["unit_price"].ToString()),
                        Stock = Convert.ToInt32(r["stock"].ToString()),
                        DateCreated = Convert.ToDateTime(r["date_created"].ToString()),
                        ImageUrl = r["image_url"].ToString()
                    };

                    productos.Add(producto);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return productos;
        }

        public static void DeleteProductFromCarrito(CarritoProductModel carritoProduct)
        {
            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            using MySqlTransaction tran = con.BeginTransaction();

            try
            {
                using MySqlCommand cmd = new("ppDeleteProduct", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_carrito_id", carritoProduct.CarritoId);
                cmd.Parameters.AddWithValue("pp_product_id", carritoProduct.ProductId);

                cmd.ExecuteNonQuery();

                tran.Commit();
            }
            catch (Exception ex)
            {
                tran.Rollback();
                throw new Exception(ex.Message);
            }
            finally
            {
                con.Close();
            }
        }
    }
}
