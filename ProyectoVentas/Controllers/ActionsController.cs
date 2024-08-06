using Microsoft.AspNetCore.Mvc;
using ProyectoVentas.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProyectoVentas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActionsController : ControllerBase
    {
        // GET: api/<ActionsController>
        [HttpGet]
        public List<ActionsModel> Get()
        {
            return ActionsModel.GetActions();
        }

        // GET api/<ActionsController>/5
        [HttpGet("{id}")]
        public ActionsModel Get(int id)
        {
            return ActionsModel.GetActionById(id);
        }

        [HttpGet("/actionbyrol/{rolName}")]
        public List<ActionsModel> Get(string rolName)
        {
            return ActionsModel.GetActionsByRol(rolName);
        }

        // POST api/<ActionsController>
        [HttpPost]
        public IActionResult Post([FromBody] ActionsModel actions)
        {
            try
            {
                ActionsModel.CreateAction(actions.ActionName);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

            return Ok();
        }

        // PUT api/<ActionsController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<ActionsController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
