using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Operation_Scheduler.Dto;
using Operation_Scheduler.Helpers;
using Operation_Scheduler.Models;
using Operation_Scheduler.Repositories;

namespace Operation_Scheduler.Controllers
{
    [ApiController]
    [Route("api/appointment")]
    public class AppointmentController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IAppointmentRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public AppointmentController(IMapper mapper, IAppointmentRepository repository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;
        }

        [Authorize]
        [HttpGet("{appointmentID}")]
        public IActionResult GetAppointment(int appointmentID)
        {
            var apptFromRepo = repository.GetAppointment(appointmentID);

            if (apptFromRepo == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<Appointment>(apptFromRepo));
        }

        [HttpGet()]
        [Route("/api/appointment/types")]
        public IActionResult GetAppointmentTypes()
        {
            return Ok(repository.GetAppointmentTypes());
        }

        [HttpGet]
        public ActionResult<IEnumerable<AppointmentViewDto>> GetAppointmentsByApptNum([FromQuery] string? apptNum)
        {
            if (String.IsNullOrWhiteSpace(apptNum))
            {
                var appts = repository.GetAppointments();
                return Ok(mapper.Map<IEnumerable<AppointmentViewDto>>(appts));
            }
            var apptsFromRepo = repository.GetAppointmentsByApptNum(apptNum);
            return Ok(mapper.Map<IEnumerable<AppointmentViewDto>>(apptsFromRepo));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAppointment([FromBody] AppointmentCreateDto apptDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var appointment = mapper.Map<AppointmentCreateDto, Appointment>(apptDto);

            repository.Add(appointment);
            await unitOfWork.CompleteAsync();
            return Ok(mapper.Map<AppointmentCreateDto>(appointment));
        }

        [Authorize]
        [HttpDelete("{appointmentID}")]
        public ActionResult DeleteAppointmentAsync(int appointmentID)
        {
            var apptFromRepo = repository.GetAppointment(appointmentID);

            if (apptFromRepo == null)
                return NotFound();

            repository.Remove(apptFromRepo);
            return NoContent();
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult UpdateAppointment(int id, [FromBody] AppointmentCreateDto apptDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var appointment = repository.GetAppointment(id);

            if (appointment == null)
                return NotFound();

            mapper.Map<AppointmentCreateDto, Appointment>(apptDto, appointment);

            unitOfWork.CompleteAsync();
            return Ok(appointment);
        }

        [HttpGet]
        [Route("/api/appointment/date")]
        public IActionResult GetApptDates()
        {
            return Ok(repository.GetDistinctApptDates());
        }
    }
}