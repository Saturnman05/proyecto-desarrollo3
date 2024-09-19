using Microsoft.AspNetCore.Mvc;
using ProyectoVentas.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProyectoVentas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        // GET: api/<ProductsController>
        [HttpGet]
        public List<ProductModel> Get()
        {
            return ProductModel.GetAllProducts();
        }

        // GET api/<ProductsController>/5
        [HttpGet("{id}")]
        public ProductModel Get(int id)
        {
            return ProductModel.GetProduct(id);
        }

        [HttpGet("productbyuser/{id}")]
        public List<ProductModel> GetByUser(int id)
        {
            List<ProductModel> products = new();

            try
            {
                products = ProductModel.GetProductsByUser(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return products;
        }

        // POST api/<ProductsController>
        [HttpPost]
        public IActionResult Post([FromBody] ProductModel product)
        {
            try
            {
                ProductModel.CreateProduct(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        // PUT api/<ProductsController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ProductModel product)
        {
            try
            {
                ProductModel.UpdateProduct(product);
            }
            catch (Exception)
            {
                return BadRequest("No se pudo actualizar el producto.");
            }

            return Ok("Se hizo la actualización exitosamente.");
        }

        // DELETE api/<ProductsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                ProductModel.DeleteProduct(id);
            }
            catch (Exception)
            {
                return BadRequest($"No se pudo eliminar el producto con el id={id}.");
            }

            return Ok("Se eliminó el producto correctamente.");
        }
    }
}
