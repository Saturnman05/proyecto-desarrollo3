namespace ProyectoVentas.Models
{
    public class FacturaModel
    {
        public int FacturaId { get; set; }
        public string Rnc { get; set; }
        public DateTime EmissionDate { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
