namespace ProyectoVentas.Models
{
    public class FacturaProductoModel
    {
        public int FacturaId { get; set; }
        public int ProductId { get; set; }
        public int ProductAmount { get; set; }
        public decimal ProductUnitPrice { get; set; }
    }
}
