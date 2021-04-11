using System.Collections.Generic;
using System.Linq;
using Operation_Scheduler.Dto;
using Operation_Scheduler.Models;

namespace Operation_Scheduler.Repositories
{
    public class AppointmentTypeRepository : IAppointmentTypeRepository
    {

        private readonly OperationSchedulerContext context;

        public AppointmentTypeRepository(OperationSchedulerContext context)
        {
            this.context = context;
        }
        public IEnumerable<AppointmentType> GetAppointmentTypes()
        {
            return (IEnumerable<AppointmentType>)context.AppointmentTypes.AsEnumerable();

        }
    }
}