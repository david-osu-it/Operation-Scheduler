using System.Collections.Generic;
using Operation_Scheduler.Models;

namespace Operation_Scheduler.Repositories
{
    public interface IAdminRepository
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        IEnumerable<Admin> GetAll();
        Admin GetById(int id);
        void Add(Admin admin);
        void Delete(Admin admin);
    }
}