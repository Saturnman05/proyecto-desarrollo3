using MySql.Data.MySqlClient;
using Org.BouncyCastle.Asn1.Cms;
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

        // TODO: get carrito
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
    }
}
