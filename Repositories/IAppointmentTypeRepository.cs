using System.Collections.Generic;
using Operation_Scheduler.Dto;
using Operation_Scheduler.Models;

namespace Operation_Scheduler.Repositories
{
    public interface IAppointmentTypeRepository
    {
        IEnumerable<AppointmentType> GetAppointmentTypes();

    }
}