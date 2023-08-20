using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NG_JWT_PolicyBasedAuth.Models;
using NG_JWT_PolicyBasedAuth.Utilities;

namespace NG_JWT_PolicyBasedAuth.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly AuthService _authservice;

        public LoginController(AuthService authservice)
        {
            _authservice = authservice;
        }
        [HttpGet]
        public IActionResult Login()
        {
            return Ok("Hello");
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Login([FromBody] User login)
        {
            IActionResult response = Unauthorized();
            User user = _authservice.AuthenticateUser(login);
            if (user != null)
            {
                var tokenString = _authservice.GenerateJWT(user);
                response = Ok(new
                {
                    token = tokenString,
                    userDetails = user,
                });
            }
            return response;
        }
    }
}
