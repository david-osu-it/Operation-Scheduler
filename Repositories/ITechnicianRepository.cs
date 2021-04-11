using System.Collections.Generic;
using Operation_Scheduler.Models;

namespace Operation_Scheduler.Repositories
{
    public interface ITechnicianRepository
    {
        IEnumerable<Technician> GetTechnicians();

    }
}