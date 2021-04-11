using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Operation_Scheduler.Dto;
using Operation_Scheduler.Models;

namespace Operation_Scheduler.Repositories
{
    public interface IAppointmentRepository
    {
        void Add(Appointment appt);
        void Remove(Appointment appt);
        Appointment GetAppointment(int id);
        IEnumerable<AppointmentType> GetAppointmentTypes();
        IEnumerable<Appointment> GetAppointments();
        IQueryable<DateTime> GetDistinctApptDates();
        IEnumerable<Appointment> GetAppointmentsByApptNum(string apptNum);
        void UpdateAppointment(int id, Appointment appt);


    }
}