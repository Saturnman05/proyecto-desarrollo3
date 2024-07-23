using Microsoft.AspNetCore.Mvc;
using ProyectoVentas.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProyectoVentas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // GET: api/<UsersController>
        [HttpGet]
        public List<UserModel> Get()
        {
            return UserModel.GetAllUsers();
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public UserModel Get(int id)
        {
            return UserModel.GetUser(id);
        }

        // POST api/<UsersController>
        [HttpPost]
        public IActionResult Post([FromBody] UserModel user)
        {
            try
            {
                UserModel.CreateUser(user);
            }
            catch (Exception ex)
            {
                return BadRequest($"No se pudo crear el usuario. {ex.Message}");
            }

            return Ok("Se creo el usuario exitosamente.");
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] UserModel user)
        {
            try
            {
                UserModel.UpdateUser(user);
            }
            catch (Exception)
            {
                return BadRequest("No se pudieron actualizar los datos del usuario.");
            }

            return Ok();
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                UserModel.DeleteUser(id);
            }
            catch (Exception)
            {
                return BadRequest("No se pudo eliminar el usuario");
            }

            return Ok("Se elimino el usuario correctamente.");
        }

        [HttpPost("login")]
        public ActionResult<UserModel> Login([FromBody] LoginRequest request)
        {
            var user = UserModel.LogIn(request.Username, request.Password);
            if (user == null)
            {
                return Unauthorized();
            }

            return Ok(user);
        }
    }
}
