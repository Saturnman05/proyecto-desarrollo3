using MySql.Data.MySqlClient;
using Org.BouncyCastle.Bcpg;

namespace ProyectoVentas.Models
{
    public class UserModel
    {
        public int UserId { get; set; }
        public string? FullName { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public int RolId { get; set; }
        public string? RolName { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime LastLogin { get; set; }

        public static List<UserModel> GetAllUsers()
        {
            List<UserModel> users = new();

            using MySqlConnection con = new(Program.connectionString);

            con.Open();

            try
            {
                string procedureName = "ppSelectUsers";

                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_user_id", null);

                using MySqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    UserModel user = new()
                    {
                        UserId = Convert.ToInt32(reader["user_id"].ToString()),
                        FullName = reader["full_name"].ToString(),
                        UserName = reader["username"].ToString(),
                        Password = reader["password"].ToString(),
                        Email = reader["email"].ToString(),
                        RolId = Convert.ToInt32(reader["rol_id"].ToString()),
                        RolName = reader["rol_name"].ToString(),
                        DateCreated = Convert.ToDateTime(reader["date_created"].ToString()),
                        LastLogin = Convert.ToDateTime(reader["last_login"].ToString())
                    };

                    users.Add(user);
                }
            }
            catch (Exception ex)
            {
                con.Close();
                throw new Exception($"No se pudo hacer el SELECT de los usuario. {ex.Message}");
            }

            con.Close();
            return users;
        }

        public static UserModel GetUser(int userId)
        {
            UserModel user = new() { UserId = userId };

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            try
            {
                string procedureName = "ppSelectUsers";

                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_user_id", userId);

                using MySqlDataReader reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    user.UserName = reader["username"].ToString();
                    user.FullName = reader["full_name"].ToString();
                    user.Password = reader["password"].ToString();
                    user.Email = reader["email"].ToString();
                    user.RolId = Convert.ToInt32(reader["rol_id"].ToString());
                    user.RolName = reader["rol_name"].ToString();
                    user.DateCreated = Convert.ToDateTime(reader["date_created"].ToString());
                    user.LastLogin = Convert.ToDateTime(reader["last_login"].ToString());
                }
            }
            catch (Exception ex)
            {
                con.Close();
                throw new Exception($"No se pudo encontrar el usuario con id={userId}. {ex.Message}");
            }

            con.Close();
            return user;
        }

        public static void CreateUser(UserModel user)
        {
            using MySqlConnection con = new(Program.connectionString);

            con.Open();
            MySqlTransaction transaction = con.BeginTransaction();

            int userId = 0;

            try
            {
                string procedureName = "ppUpsertUsuario";

                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                // Parámetros del stored procedure
                cmd.Parameters.AddWithValue("pp_user_id", null);
                cmd.Parameters.AddWithValue("pp_username", user.UserName);
                cmd.Parameters.AddWithValue("pp_password", user.Password);
                cmd.Parameters.AddWithValue("pp_email", user.Email);
                cmd.Parameters.AddWithValue("pp_rol_id", user.RolId);
                cmd.Parameters.AddWithValue("pp_full_name", user.FullName);

                // TODO: obtener le id del usuario
                using MySqlDataReader r = cmd.ExecuteReader();
                if (r.Read())
                {
                    userId = Convert.ToInt32(r["user_id"]);
                }
                r.Close();

                // TODO: crear el carrito del usuario
                if (userId != 0) CarritoModel.CreateCarrito(con, transaction, userId);
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

        public static void UpdateUser(UserModel user)
        {
            using MySqlConnection con = new(Program.connectionString);

            con.Open();
            MySqlTransaction transaction = con.BeginTransaction();

            try
            {
                string procedureName = "ppUpsertUsuario";

                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                // Parámetros del stored procedure
                cmd.Parameters.AddWithValue("pp_user_id", user.UserId);
                cmd.Parameters.AddWithValue("pp_username", user.UserName);
                cmd.Parameters.AddWithValue("pp_password", user.Password);
                cmd.Parameters.AddWithValue("pp_email", user.Email);
                cmd.Parameters.AddWithValue("pp_rol_id", user.RolId);
                cmd.Parameters.AddWithValue("pp_full_name", user.FullName);

                // TODO: obtener le id del usuario
                cmd.ExecuteNonQuery();
                
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

        public static void DeleteUser(int userId)
        {
            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            MySqlTransaction transaction = con.BeginTransaction();

            try
            {
                string procedureName = "ppDeleteUsuario";

                MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_user_id", userId);

                cmd.ExecuteNonQuery();

                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                con.Close();
                throw new Exception($"No se pudo eliminar el usuario con id={userId}. {ex.Message}");
            }

            con.Close();
        }

        public static UserModel LogIn(string username, string password)
        {
            UserModel user = new();

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            try
            {
                string procedureName = "ppLogInUser";
                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_username", username);
                cmd.Parameters.AddWithValue("pp_password", password);

                var reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    user.UserId = Convert.ToInt32(reader["user_id"].ToString());
                    user.UserName = reader["username"].ToString();
                    user.Password = reader["password"].ToString();
                    user.Email = reader["email"].ToString();
                    user.RolId = Convert.ToInt32(reader["rol_id"].ToString());
                    user.RolName = reader["rol_name"].ToString();
                    user.DateCreated = Convert.ToDateTime(reader["date_created"].ToString());
                    user.LastLogin = DateTime.Now;
                    user.FullName = reader["full_name"].ToString();
                }
            }
            catch (Exception ex)
            {
                con.Close();
                throw new Exception("No se pudo hacer inicio de sesión.", ex);
            }

            con.Close();

            UpdateUser(user);

            return user;
        }
    }
}
