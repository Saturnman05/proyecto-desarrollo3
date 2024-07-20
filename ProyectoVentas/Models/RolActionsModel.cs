using MySql.Data.MySqlClient;

namespace ProyectoVentas.Models
{
    public class RolActionsModel
    {
        public int RolId { get; set; } = -1;
        public string RolName { get; set; }

        public int ActionId {  get; set; } = -1;
        public string ActionName { get; set; }

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

        // TODO: Get roles
        public static List<RolActionsModel> GetRoles()
        {
            List<RolActionsModel> roles = new();

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            try
            {
                string procedureName = "ppSelectRoles";
                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_rol_id", null);

                using var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    RolActionsModel rol = new()
                    {
                        RolId = Convert.ToInt32(reader["rol_id"].ToString()),
                        RolName = reader["rol_name"].ToString()
                    };
                }
            }
            catch (Exception)
            {
                throw new Exception("No se pudieron seleccionar los roles.");
            }

            return roles;
        }

        // TODO: Get actions
        public static List<RolActionsModel> GetActions()
        {
            List<RolActionsModel> actions = new();

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            try
            {
                string procedureName = "ppSelectActions";
                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_action_id", null);

                using var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    RolActionsModel action = new()
                    {
                        ActionId = Convert.ToInt32(reader["action_id"].ToString()),
                        ActionName = reader["action_name"].ToString()
                    };

                    actions.Add(action);
                }
            }
            catch (Exception)
            {
                throw new Exception("No se pudo obtener las acciones.");
            }

            return actions;
        }
    }
}
