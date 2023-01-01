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
                return new JsonResult(BadRequest("you need to choose the dates"));
            var selectedvoitures = _db.Reservations.Where(e => (
            ((e.DateRemise < startDate) || (e.DatePriseEnCharge > startDate && e.DatePriseEnCharge > endDate))
            )).Select(e => e.Voiture).Where(v => (v.isAprouved && v.isDisponible)) 
               .ToList();

            

            if (selectedvoitures == null)
            {
                return new JsonResult(NotFound());
            }
            return new JsonResult(Ok(selectedvoitures));
        }

    }
}
