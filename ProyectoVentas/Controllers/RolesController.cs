using Microsoft.AspNetCore.Mvc;
using ProyectoVentas.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProyectoVentas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        // GET: api/<RolesController>
        [HttpGet]
        public IEnumerable<RolModel> Get()
        {
            return RolModel.GetRoles();
        }

        // GET api/<RolesController>/5
        [HttpGet("byid/{id:int}")]
        public RolModel Get(int id)
        {
            return RolModel.GetRolById(id);
        }

        // GET api/<RolesController>/"administrador"
        [HttpGet("byname/{name}")]
        public ActionResult<int> GetByName(string name)
        {
            try
            {
                int rolId = RolModel.GetRolId(name);
                if (rolId == -1)
                {
                    return NotFound($"Role with name '{name}' not found.");
                }
                return Ok(rolId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error ocurred while processing your request. {ex.Message}");
            }
        }

        // POST api/<RolesController>
        [HttpPost]
        public IActionResult Post([FromBody] string value)
        {
            try
            {
                RolModel.CreateRol(value);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            return Ok($"Se creó el rol {value} exitosamente.");
        }

        // PUT api/<RolesController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<RolesController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
