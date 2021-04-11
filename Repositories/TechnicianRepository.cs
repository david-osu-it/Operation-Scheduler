using System.Collections.Generic;
using System.Linq;
using Operation_Scheduler.Models;

namespace Operation_Scheduler.Repositories
{
    public class TechnicianRepository : ITechnicianRepository
    {
        private readonly OperationSchedulerContext context;

        public TechnicianRepository(OperationSchedulerContext context)
        {
            this.context = context;
        }

        public IEnumerable<Technician> GetTechnicians()
        {
            return context.Technicians.ToList<Technician>();

        }
    }
}