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
    [Route("api/customer")]
    public class CustomerController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ICustomerRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public CustomerController(IMapper mapper, ICustomerRepository repository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCustomer([FromBody] CustomerCreateDto customerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var customer = mapper.Map<CustomerCreateDto, Customer>(customerDto);

            repository.Add(customer);
            await unitOfWork.CompleteAsync();
            return Ok(customer);

        }

        [Authorize]
        [HttpGet]
        public IActionResult GetCustomers()
        {
            return Ok(repository.GetCustomers());
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult UpdateCustomer(int id, [FromBody] CustomerUpdateDto cusDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var customer = repository.GetCustomer(id);

            if (customer == null)
                return NotFound();

            repository.UpdateCustomer(id, cusDto);
            mapper.Map<CustomerUpdateDto, Customer>(cusDto, customer);

            unitOfWork.CompleteAsync();
            return Ok(customer);
        }
    }
}