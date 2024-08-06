using MySql.Data.MySqlClient;
using System.Data;

namespace ProyectoVentas.Models
{
    public class ActionsModel
    {
        public int ActionId { get; set; }
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

        public static List<ActionsModel> GetActions()
        {
            List<ActionsModel> actions = new();

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            try
            {
                string procedureName = "ppSelectActions";
                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_action_id", null);
                cmd.Parameters.AddWithValue("pp_rol_id", null);

                using var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    ActionsModel action = new()
                    {
                        ActionId = Convert.ToInt32(reader["action_id"].ToString()),
                        ActionName = reader["action_name"].ToString()
                    };

                    actions.Add(action);
                }
            }
            catch (Exception)
            {
                con.Close();
                throw new Exception("No se pudo obtener las acciones.");
            }

            con.Close();
            return actions;
        }

        public static int GetActionId(string actionName)
        {
            int actionId = 0;

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            try
            {
                string funcName = "SELECT fnSelectActionId(@actionName)";
                using MySqlCommand cmd = new(funcName, con);
                cmd.Parameters.AddWithValue("@actionName", actionName);

                actionId = Convert.ToInt32(cmd.ExecuteScalar());
            }
            catch (Exception ex)
            {
                con.Close();
                throw new Exception("No se pudo obtener el id.", ex);
            }

            con.Close();
            return actionId;
        }

        public static ActionsModel GetActionById(int actionId)
        {
            ActionsModel action = new() { ActionId = actionId };

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            try
            {
                string procedureName = "ppSelectActions";
                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_action_id", actionId);
                cmd.Parameters.AddWithValue("pp_rol_id", null);

                using MySqlDataReader r = cmd.ExecuteReader();
                if (r.Read())
                {
                    action.ActionName = r["action_name"].ToString();
                }
            }
            catch (Exception ex)
            {
                con.Close();
                throw new Exception($"No se pudo obtener el action de id = {actionId}", ex);
            }

            con.Close();
            return action;
        }

        public static List<ActionsModel> GetActionsByRol(string rolName)
        {
            List<ActionsModel> actions = new();

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            try
            {
                int rolId = RolModel.GetRolId(rolName);

                using MySqlCommand cmd = new("ppSelectActions", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_action_id", null);
                cmd.Parameters.AddWithValue("pp_rol_id", rolId);

                using MySqlDataReader r = cmd.ExecuteReader();

                while (r.Read())
                {
                    actions.Add(new ActionsModel
                    {
                        ActionId = Convert.ToInt32(r["action_id"].ToString()),
                        ActionName = r["action_name"].ToString()
                    });
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

            return actions;
        }
    }
}
