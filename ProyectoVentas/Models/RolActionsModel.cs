using MySql.Data.MySqlClient;

namespace ProyectoVentas.Models
{
    public class RolActionsModel
    {
        public int RolId { get; set; } = -1;
        public string RolName { get; set; }

        public int ActionId {  get; set; } = -1;
        public string ActionName { get; set; }

        // TODO: create action
        public static void CreateAction(string actionName)
        {
            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            MySqlTransaction tran = con.BeginTransaction();

            try
            {
                string procedureName = "ppUpsertAction";
                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_action_id", null);
                cmd.Parameters.AddWithValue("pp_action_name", actionName);

                cmd.ExecuteNonQuery();

                tran.Commit();
            }
            catch (Exception)
            {
                tran.Rollback();
                con.Close();
                throw new Exception("No se pudo crear la acción.");
            }

            con.Close();
        }

        // TODO: create rol
        public static void CreateRol(string rolName)
        {
            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            MySqlTransaction tran = con.BeginTransaction();

            try
            {
                string procedureName = "ppUpsertRol";
                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_rol_id", null);
                cmd.Parameters.AddWithValue("pp_rol_name", rolName);

                cmd.ExecuteNonQuery();

                tran.Commit();
            }
            catch (Exception)
            {
                tran.Rollback();
                con.Close();
                throw new Exception("No se pudo crear el rol.");
            }

            con.Close();
        }

        // TODO: añadirle acciones a un rol
        public static void CreateRolAction(RolActionsModel rolAction)
        {
            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            if (rolAction.RolId == -1)
            {

                MySqlTransaction tran = con.BeginTransaction();

                try
                {
                    string sql = "SELECT fnSelectRolId(pp_rolName)";
                    using MySqlCommand cmdRol = new(sql, con);
                    cmdRol.Parameters.AddWithValue("pp_rolName", rolAction.RolName);
                    rolAction.RolId = Convert.ToInt32(cmdRol.ExecuteScalar());

                    tran.Commit();
                }
                catch (Exception)
                {
                    tran.Rollback();
                    throw new Exception("No se pudo obtener el id del rol");
                }
            }

            if (rolAction.ActionId == -1)
            {
                MySqlTransaction tran = con.BeginTransaction();

                try
                {
                    string sql = "SELECT fnSelectActionId(pp_actionName)";
                    using MySqlCommand cmdAction = new(sql, con);
                    cmdAction.Parameters.AddWithValue("pp_actionName", rolAction.ActionName);
                    rolAction.ActionId = Convert.ToInt32(cmdAction.ExecuteScalar());

                    tran.Commit();
                }
                catch (Exception)
                {
                    tran.Rollback();
                    throw new Exception("No se pudo obtener el id del rol");
                }
            }

            MySqlTransaction transaction = con.BeginTransaction();
            
            try
            {
                string procedureName = "ppInsertRolAction";
                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_rol_id", rolAction.RolId);
                cmd.Parameters.AddWithValue("pp_action_id", rolAction.ActionId);

                cmd.ExecuteNonQuery();

                transaction.Commit();
            }
            catch (Exception)
            {
                transaction.Rollback();
            }

            con.Close();
        }
    }
}
