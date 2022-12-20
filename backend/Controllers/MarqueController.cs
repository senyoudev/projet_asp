using backend.Data;
using Microsoft.AspNetCore.Mvc;

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
