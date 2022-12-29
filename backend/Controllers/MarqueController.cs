using backend.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MarqueController : ControllerBase
    {
        private readonly ApiContext _db;

        public MarqueController(ApiContext db)
        {
            _db = db;
        }
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "locataire")]

        public JsonResult GetMarques()
        {
            var marques = _db.Marques.ToList();
            if (marques == null)
            {
                return new JsonResult(NotFound());
            }
            return new JsonResult(Ok(marques));
        }
    }
}
