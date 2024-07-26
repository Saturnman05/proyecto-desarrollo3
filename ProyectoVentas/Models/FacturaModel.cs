using MySql.Data.MySqlClient;
using System.Data;

namespace ProyectoVentas.Models
{
    public class FacturaModel
    {
        public int FacturaId { get; set; }
        public string Rnc { get; set; }
        public DateTime EmissionDate { get; set; }
        public decimal TotalPrice { get; set; }
        public int UserId { get; set; }
        public List<string> Productos { get; set; }

        public static FacturaModel GetFactura(int facturaId = 0, int userId = 0)
        {
            FacturaModel factura = new();

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            try
            {
                string procedureName = "ppSelectFacturas";
                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("pp_factura_id", facturaId == 0 ? null : facturaId);
                cmd.Parameters.AddWithValue("pp_user_id", userId == 0 ? null : userId);

                using MySqlDataReader reader = cmd.ExecuteReader();
                List<string> productos = new();

                while (reader.Read())
                {
                    factura.FacturaId = Convert.ToInt32(reader["factura_id"].ToString());
                    factura.Rnc = reader["rnc"].ToString();
                    factura.EmissionDate = Convert.ToDateTime(reader["emission_date"].ToString());
                    factura.TotalPrice = Convert.ToDecimal(reader["total_price"].ToString());
                    factura.UserId = Convert.ToInt32(reader["user_id"].ToString());
                    productos.Add(reader["product_name"].ToString());
                }

                factura.Productos = productos;
            }
            catch (Exception ex)
            {

                throw new Exception($"Error al obtener la factura con id = {facturaId}", ex);
            }

            return factura;
        }
        
        public static List<FacturaModel> GetFacturas()
        {

        }
        // TODO: Create factura
        public static int CreateFactura(FacturaModel factura)
        {
            int newFacturaId;

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            MySqlTransaction tran = con.BeginTransaction();

            try
            {
                using MySqlCommand cmd = new("ppInsertFactura", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("pp_rnc", factura.Rnc);
                cmd.Parameters.AddWithValue("pp_emission_date", factura.EmissionDate);
                cmd.Parameters.AddWithValue("pp_total_price", factura.TotalPrice);
                cmd.Parameters.AddWithValue("pp_user_id", factura.UserId);

                MySqlParameter outputIdParam = new MySqlParameter("new_factura_id", MySqlDbType.Int32)
                {
                    Direction = ParameterDirection.Output
                };
                cmd.Parameters.Add(outputIdParam);

                cmd.ExecuteNonQuery();
                newFacturaId = Convert.ToInt32(outputIdParam.Value);
            }
            catch (Exception)
            {
                tran.Rollback();
                throw;
            }

            return newFacturaId;
        }

        public static void AddProductosToFactura(int facturaId, List<string> productos)
        {
            List<ProductModel> products = new();
            foreach (var productName in productos)
            {
                products.Add(ProductModel.GetProudctByName(productName));
            }

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            using MySqlTransaction transaction = con.BeginTransaction();
            
            try
            {
                foreach (var producto in products)
                {
                    using MySqlCommand cmd = new("ppAddProductosToFactura", con, transaction);
                    cmd.CommandType = CommandType.StoredProcedure;
                    
                    cmd.Parameters.AddWithValue("pp_factura_id", facturaId);
                    cmd.Parameters.AddWithValue("pp_product_id", producto.ProductId);
                    cmd.Parameters.AddWithValue("pp_product_amount", producto.Stock);
                    cmd.Parameters.AddWithValue("pp_product_unit_price", producto.UnitPrice);

                    cmd.ExecuteNonQuery();
                }

                transaction.Commit();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw new Exception("No se pudo añadir productos a la factura.", ex);
            }
        }

        // TODO: Update factura

        // TODO: Delete factura
    }
}
