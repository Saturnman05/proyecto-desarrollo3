using MySql.Data.MySqlClient;
using System.Data;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using System.Security.Policy;

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
                con.Close();
                throw new Exception($"Error al obtener la factura con id = {facturaId}", ex);
            }

            con.Close();
            return factura;
        }

        public static List<FacturaModel> GetFacturas()
        {
            List<FacturaModel> facturas = new();

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            try
            {
                string procedureName = "ppSelectFacturas";
                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("pp_factura_id", null);
                cmd.Parameters.AddWithValue("pp_user_id", null);

                using MySqlDataReader reader = cmd.ExecuteReader();
                FacturaModel currentFactura = null;
                int currentFacturaId = -1;

                while (reader.Read())
                {
                    int facturaIdFromDb = Convert.ToInt32(reader["factura_id"]);

                    // Si cambiamos de factura o estamos en la primera lectura
                    if (currentFactura == null || currentFacturaId != facturaIdFromDb)
                    {
                        // Añadimos la factura anterior a la lista (si no es la primera lectura)
                        if (currentFactura != null)
                        {
                            facturas.Add(currentFactura);
                        }

                        // Creamos una nueva factura y actualizamos el ID actual
                        currentFactura = new FacturaModel
                        {
                            FacturaId = facturaIdFromDb,
                            Rnc = reader["rnc"].ToString(),
                            EmissionDate = Convert.ToDateTime(reader["emission_date"]),
                            TotalPrice = Convert.ToDecimal(reader["total_price"]),
                            UserId = Convert.ToInt32(reader["user_id"]),
                            Productos = new List<string>()
                        };
                        currentFacturaId = facturaIdFromDb;
                    }

                    // Añadimos el producto a la factura actual
                    currentFactura.Productos.Add(reader["product_name"].ToString());
                }

                // Añadimos la última factura leída a la lista
                if (currentFactura != null)
                {
                    facturas.Add(currentFactura);
                }
            }
            catch (Exception ex)
            {
                con.Close();
                throw new Exception($"Error al obtener las facturas", ex);
            }

            con.Close();
            return facturas;
        }

        public static List<FacturaModel> GetFacturasByUser(int userId)
        {
            List<FacturaModel> facturas = new();

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            try
            {
                string procedureName = "ppSelectFacturas";
                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("pp_factura_id", null);
                cmd.Parameters.AddWithValue("pp_user_id", userId);

                using MySqlDataReader reader = cmd.ExecuteReader();
                FacturaModel currentFactura = null;
                int currentFacturaId = -1;

                while (reader.Read())
                {
                    int facturaIdFromDb = Convert.ToInt32(reader["factura_id"]);

                    // Si cambiamos de factura o estamos en la primera lectura
                    if (currentFactura == null || currentFacturaId != facturaIdFromDb)
                    {
                        // Añadimos la factura anterior a la lista (si no es la primera lectura)
                        if (currentFactura != null)
                        {
                            facturas.Add(currentFactura);
                        }

                        // Creamos una nueva factura y actualizamos el ID actual
                        currentFactura = new FacturaModel
                        {
                            FacturaId = facturaIdFromDb,
                            Rnc = reader["rnc"].ToString(),
                            EmissionDate = Convert.ToDateTime(reader["emission_date"]),
                            TotalPrice = Convert.ToDecimal(reader["total_price"]),
                            UserId = Convert.ToInt32(reader["user_id"]),
                            Productos = new List<string>()
                        };
                        currentFacturaId = facturaIdFromDb;
                    }

                    // Añadimos el producto a la factura actual
                    currentFactura.Productos.Add(reader["product_name"].ToString());
                }

                // Añadimos la última factura leída a la lista
                if (currentFactura != null)
                {
                    facturas.Add(currentFactura);
                }
            }
            catch (Exception ex)
            {
                con.Close();
                throw new Exception($"Error al obtener las facturas", ex);
            }

            con.Close();
            return facturas;
        }

        public static int CreateFactura(FacturaModel factura)
        {
            int newFacturaId = 0;

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            MySqlTransaction tran = con.BeginTransaction();

            try
            {
                using MySqlCommand cmd = new("ppInsertFactura", con, tran)
                {
                    CommandType = CommandType.StoredProcedure
                };

                cmd.Parameters.AddWithValue("pp_rnc", factura.Rnc);
                cmd.Parameters.AddWithValue("pp_total_price", PrecioTotalFactura(factura.Productos));
                cmd.Parameters.AddWithValue("pp_user_id", factura.UserId);

                MySqlParameter outputIdParam = new MySqlParameter("new_factura_id", MySqlDbType.Int32)
                {
                    Direction = ParameterDirection.Output
                };
                cmd.Parameters.Add(outputIdParam);

                cmd.ExecuteNonQuery();
                newFacturaId = Convert.ToInt32(outputIdParam.Value);

                List<ProductModel> products = AddProductosToFactura(con, tran, newFacturaId, factura.Productos);

                tran.Commit();
            }
            catch (Exception ex)
            {
                tran.Rollback();
                con.Close();
                throw new Exception("No se pudo crear la factura.", ex);
            }

            con.Close();
            return newFacturaId;
        }

        // TODO: GET PRODUCTS FROM FACTURA
        public static List<FacturaProductoModel> GetProductsFromFactura(int id)
        {
            List<FacturaProductoModel> facturaProductos = new();

            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            using MySqlCommand cmd = new("ppSelectProductsFromFactura", con)
            {
                CommandType = CommandType.StoredProcedure,
            };
            cmd.Parameters.AddWithValue("pp_factura_id", id);

            using MySqlDataReader reader = cmd.ExecuteReader();
            while (reader.Read()) {
                FacturaProductoModel fp = new()
                {
                    FacturaId = id,
                    ProductId = Convert.ToInt32(reader["product_id"]),
                    ProductAmount = Convert.ToInt32(reader["product_amount"]),
                    ProductUnitPrice = Convert.ToDecimal(reader["product_unit_price"])
                };

                facturaProductos.Add(fp);
            }

            return facturaProductos;
        }

        public static List<ProductModel> AddProductosToFactura(MySqlConnection con, MySqlTransaction tran, int facturaId, List<string> productos)
        {
            List<ProductModel> products = new();
            foreach (var productName in productos)
            {
                products.Add(ProductModel.GetProudctByName(productName));
            }

            try
            {
                foreach (var producto in products)
                {
                    using MySqlCommand cmd = new("ppAddProductosToFactura", con, tran)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    cmd.Parameters.AddWithValue("pp_factura_id", facturaId);
                    cmd.Parameters.AddWithValue("pp_product_id", producto.ProductId);
                    cmd.Parameters.AddWithValue("pp_product_amount", producto.Stock);
                    cmd.Parameters.AddWithValue("pp_product_unit_price", producto.UnitPrice);

                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("No se pudo añadir productos a la factura.", ex);
            }

            return products;
        }

        public static void UpdateFactura(FacturaModel factura)
        {
            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            MySqlTransaction tran = con.BeginTransaction();

            try
            {
                using MySqlCommand cmd = new("ppUpdateFactura", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("pp_factura_id", factura.FacturaId);
                cmd.Parameters.AddWithValue("pp_rnc", factura.Rnc);
                cmd.Parameters.AddWithValue("pp_total_price", PrecioTotalFactura(factura.Productos));
                cmd.Parameters.AddWithValue("pp_user_id", factura.UserId);

                List<ProductForInvoice> productosConId = new();
                foreach (var nombreProducto in factura.Productos)
                {
                    ProductModel producto = ProductModel.GetProudctByName(nombreProducto);
                    if (producto == null)
                    {
                        continue;
                    }

                    ProductForInvoice newProduct = new()
                    {
                        Name = producto.Name,
                        Amount = 1,
                        UnitPrice = producto.UnitPrice
                    };

                    foreach (var pproducto in productosConId)
                    {
                        if (pproducto.Name == newProduct.Name)
                        {
                            pproducto.Amount += 1;
                            newProduct.Amount += 1;
                            break;
                        }
                    }

                    if (newProduct.Amount == 1) productosConId.Add(newProduct);
                }

                string productosJson = JsonConvert.SerializeObject(productosConId);
                cmd.Parameters.AddWithValue("pp_productos", productosJson);

                cmd.ExecuteNonQuery();
                tran.Commit();
            }
            catch (Exception ex)
            {
                tran.Rollback();
                throw new Exception("Error al actualizar la factura", ex);
            }
            finally
            {
                con.Close();
            }
        }

        public static void DeleteFactura(int facturaId)
        {
            using MySqlConnection con = new(Program.connectionString);
            con.Open();

            try
            {
                string procedureName = "ppDeleteFactura";
                using MySqlCommand cmd = new(procedureName, con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pp_factura_id", facturaId);

                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                con.Close();
                throw new Exception($"No se pudo borrar la factura de id = {facturaId}", ex);
            }

            con.Close();
        }

        public static decimal PrecioTotalFactura(List<string> productos)
        {
            decimal precio = 0;
            foreach (string producto in productos)
            {
                ProductModel productoObjeto = ProductModel.GetProudctByName(producto);
                precio += productoObjeto.UnitPrice * productoObjeto.Stock;
            }
            return precio;
        }
    }
}
