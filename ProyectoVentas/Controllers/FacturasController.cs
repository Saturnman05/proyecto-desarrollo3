using Microsoft.AspNetCore.Mvc;
using ProyectoVentas.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProyectoVentas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacturasController : ControllerBase
    {
        // GET: api/<FacturasController>
        [HttpGet]
        public List<FacturaModel> Get()
        {
            return FacturaModel.GetFacturas();
        }

        // GET api/<FacturasController>/5
        [HttpGet("{id}")]
        public FacturaModel Get(int id)
        {
            return FacturaModel.GetFactura(id);
        }

        // GET api/<FacturasController>/user/3
        [HttpGet("user/{id}")]
        public List<FacturaModel> GetByUser(int id)
        {
            return FacturaModel.GetFacturasByUser(id);
        }

        // POST api/<FacturasController>
        [HttpPost]
        public IActionResult Post([FromBody] FacturaModel factura)
        {
            try
            {
                int facturaId = FacturaModel.CreateFactura(factura);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            return Ok();
        }

        // PUT api/<FacturasController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] FacturaModel factura)
        {
            try
            {
                FacturaModel.UpdateFactura(factura);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            return Ok();
        }

        // DELETE api/<FacturasController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                FacturaModel.DeleteFactura(id);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }

            return Ok();
        }
    }
}
