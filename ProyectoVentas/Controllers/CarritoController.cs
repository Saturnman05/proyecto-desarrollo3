using Microsoft.AspNetCore.Mvc;
using ProyectoVentas.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProyectoVentas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarritoController : ControllerBase
    {
        // GET: api/<CarritoController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/<CarritoController>/5
        [HttpGet("{id}")]
        public CarritoModel Get(int id)
        {
            return CarritoModel.GetCarritoById(id);
        }

        [HttpGet("carritobyuser/{id}")]
        public CarritoModel GetByUser(int id)
        {
            return CarritoModel.GetCarritoByUser(id);
        }

        // POST api/<CarritoController>
        [HttpPost]
        public IActionResult Post([FromBody] int id)
        {
            try
            {
                CarritoModel.CreateCarrito(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpPost("AddProduct")]
        public IActionResult PostProduct([FromBody] CarritoProductModel carritoProduct)
        {
            try
            {
                CarritoModel.AddProductToCarrito(carritoProduct);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        // PUT api/<CarritoController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<CarritoController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                CarritoModel.DeleteCarrito(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            return Ok();
        }
    }
}
