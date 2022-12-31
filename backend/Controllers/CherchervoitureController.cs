using backend.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CherchervoitureController : ControllerBase
    {
        private readonly ApiContext _db;

        public CherchervoitureController(ApiContext db)
        {
            _db = db;

        }
        [HttpGet]
        public JsonResult GetVoitures(DateTime? startDate,DateTime? endDate)
        {
            if (startDate == null || endDate == null)
                return new JsonResult(Ok());
            var selectedvoitures = _db.Reservations.Where(e => ((e.DatePriseEnCharge >= startDate && e.DateRemise >= endDate ) || (e.DatePriseEnCharge <= startDate && e.DateRemise <= endDate)))
                .Select(e => e.Voiture).Where(v=>(v.isDisponible && v.isAprouved))
                .ToList();

            if (selectedvoitures == null)
            {
                return new JsonResult(NotFound());
            }
            return new JsonResult(Ok(selectedvoitures));
        }

    }
}
