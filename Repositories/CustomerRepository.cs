using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Operation_Scheduler.Dto;
using Operation_Scheduler.Models;

namespace Operation_Scheduler.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly OperationSchedulerContext context;

        public CustomerRepository(OperationSchedulerContext context)
        {
            this.context = context;
        }

        public void Add(Customer customer)
        {
            context.Customers.Add(customer);
        }

        public Customer GetCustomer(int id)
        {
            return context.Customers.Find(id);

        }

        public IEnumerable<Customer> GetCustomers()
        {
            return context.Customers.Include(c => c.Appointments).AsQueryable();
        }

        public void Remove(Customer customer)
        {
            context.Customers.Remove(customer);
        }

        public void UpdateCustomer(int id, CustomerUpdateDto customer)
        {
            var cus = GetCustomer(id);

            cus.FirstName = customer.FirstName;
            cus.LastName = customer.LastName;
            cus.Email = customer.Email;
            cus.Phone = customer.Phone;

            context.SaveChanges();
        }
    }
}