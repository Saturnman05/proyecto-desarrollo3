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

        // TODO: get carrito

        // TODO: delete carrito
        public static void DeleteCarrito(int carritoId)
        {
            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            using MySqlTransaction tran = con.BeginTransaction();

            try
            {

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
