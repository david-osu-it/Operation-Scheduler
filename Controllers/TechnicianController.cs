using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Operation_Scheduler.Repositories;

namespace Operation_Scheduler.Controllers
{
    [ApiController]
    [Route("api/technician")]
    public class TechnicianController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ITechnicianRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public TechnicianController(IMapper mapper, ITechnicianRepository repository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetTechnicians()
        {
            return Ok(repository.GetTechnicians());
        }
    }
}