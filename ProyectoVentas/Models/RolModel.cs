using MySql.Data.MySqlClient;

namespace ProyectoVentas.Models
{
    public class RolModel
    {
        public int RolId { get; set; } = -1;
        public string RolName { get; set; }

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

        #region CreateRolAction
        //public static void CreateRolAction(RolModel rolAction)
        //{
        //    using MySqlConnection con = new(Program.connectionString);
        //    con.Open();

        //    if (rolAction.RolId == -1)
        //    {

        //        MySqlTransaction tran = con.BeginTransaction();

        //        try
        //        {
        //            string sql = "SELECT fnSelectRolId(pp_rolName)";
        //            using MySqlCommand cmdRol = new(sql, con);
        //            cmdRol.Parameters.AddWithValue("pp_rolName", rolAction.RolName);
        //            rolAction.RolId = Convert.ToInt32(cmdRol.ExecuteScalar());

        //            tran.Commit();
        //        }
        //        catch (Exception)
        //        {
        //            tran.Rollback();
        //            throw new Exception("No se pudo obtener el id del rol");
        //        }
        //    }

        //    if (rolAction.ActionId == -1)
        //    {
        //        MySqlTransaction tran = con.BeginTransaction();

        //        try
        //        {
        //            string sql = "SELECT fnSelectActionId(pp_actionName)";
        //            using MySqlCommand cmdAction = new(sql, con);
        //            cmdAction.Parameters.AddWithValue("pp_actionName", rolAction.ActionName);
        //            rolAction.ActionId = Convert.ToInt32(cmdAction.ExecuteScalar());

        //            tran.Commit();
        //        }
        //        catch (Exception)
        //        {
        //            tran.Rollback();
        //            throw new Exception("No se pudo obtener el id del rol");
        //        }
        //    }

        //    MySqlTransaction transaction = con.BeginTransaction();

        //    try
        //    {
        //        string procedureName = "ppInsertRolAction";
        //        using MySqlCommand cmd = new(procedureName, con);
        //        cmd.CommandType = System.Data.CommandType.StoredProcedure;
        //        cmd.Parameters.AddWithValue("pp_rol_id", rolAction.RolId);
        //        cmd.Parameters.AddWithValue("pp_action_id", rolAction.ActionId);

        //        cmd.ExecuteNonQuery();

        //        transaction.Commit();
        //    }
        //    catch (Exception)
        //    {
        //        con.Close();
        //        transaction.Rollback();
        //    }

        //    con.Close();
        //}
        #endregion

        public static List<RolModel> GetRoles()
        {
            List<RolModel> roles = new();

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
                    RolModel rol = new()
                    {
                        RolId = Convert.ToInt32(reader["rol_id"].ToString()),
                        RolName = reader["rol_name"].ToString()
                    };

                    roles.Add(rol);
                }
            }
            catch (Exception)
            {
                con.Close();
                throw new Exception("No se pudieron seleccionar los roles.");
            }

            con.Close();
            return roles;
        }

        public static int GetRolId(string rolName)
        {
            int rolId = -1;

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            try
            {
                string funcName = "SELECT fnSelectRolId(@rolName)";
                using MySqlCommand cmd = new(funcName, con);
                cmd.Parameters.AddWithValue("@rolName", rolName);

                var result = cmd.ExecuteScalar();
                if (result != null && result != DBNull.Value)
                {
                    rolId = Convert.ToInt32(result);
                }
            }
            catch (MySqlException ex)
            {
                con.Close();
                throw new Exception("Error en la base de datos al obtener el ID del rol.", ex);
            }
            catch (Exception ex)
            {
                con.Close();
                throw new Exception("No se pudo obtener el id.", ex);
            }

            con.Close();
            return rolId;
        }

        public static RolModel GetRolById(int rolId) {
            RolModel rol = new() { RolId = rolId };

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            try
            {
                string procedureName = "ppSelectRoles";
                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_rol_id", rolId);

                using MySqlDataReader reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    rol.RolName = reader["rol_name"].ToString();
                }
            }
            catch (Exception ex)
            {
                con.Close();
                throw new Exception($"No se pudo obtener el rol de id = {rolId}", ex);
            }

            con.Close();
            return rol;
        }

        // TODO: Set action to rol
        public static void SetActionToRol(int rolId, int actionId)
        {
            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            MySqlTransaction tran = con.BeginTransaction();

            try
            {
                string procedureName = "ppInsertRolAction";
                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_rol_id", rolId);
                cmd.Parameters.AddWithValue("pp_action_id", actionId);

                cmd.ExecuteNonQuery();

                tran.Commit();
            }
            catch (Exception ex)
            {
                tran.Rollback();
                con.Close();
                throw new Exception("No se pudo realizar la transacción.", ex);
            }

            con.Clone();
        }
    }
}
