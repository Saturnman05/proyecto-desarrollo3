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

        // TODO: Get factura by id

        // TODO: Get facturas

        // TODO: Get facturas by user

        // TODO: Create factura

        // TODO: Update factura

        // TODO: Delete factura
    }
}
