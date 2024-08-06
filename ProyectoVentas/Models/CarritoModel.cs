using MySql.Data.MySqlClient;
using System.Data;

namespace ProyectoVentas.Models
{
    public class CarritoModel
    {
        public int CarritoId { get; set; }
        public int UserId { get; set; }

        // TODO: create carrito
        public static void CreateCarrito(CarritoModel carrito)
        {
            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            using MySqlTransaction tran = con.BeginTransaction();

            try
            {
                using MySqlCommand cmd = new("ppInsertCarrito", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_user_id", carrito.UserId);

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
    }
}
