using System.Collections.Generic;
using System.Threading.Tasks;
using Operation_Scheduler.Dto;
using Operation_Scheduler.Models;

namespace Operation_Scheduler.Repositories
{
    public interface ICustomerRepository
    {
        Customer GetCustomer(int id);
        void Add(Customer customer);
        void Remove(Customer customer);

        IEnumerable<Customer> GetCustomers();
        void UpdateCustomer(int id, CustomerUpdateDto customer);

    }
}