using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        /*
         * getuserbyid(int id)
         * deleteuser(int id)
         * updateUserById(int id,UserInput id)
         * getAllUser()
         * getAllLocataires()
         * getAllProprietaires()
         * updateUserProfile()
         * 
         * 
         */

        [HttpGet]
      
        public IActionResult GetUserById()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
           
            
        }
    }
}
