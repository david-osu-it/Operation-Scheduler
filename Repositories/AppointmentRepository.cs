using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Operation_Scheduler.Dto;
using Operation_Scheduler.Models;

namespace Operation_Scheduler.Repositories
{
    public class AppointmentRepository : IAppointmentRepository
    {

        private readonly OperationSchedulerContext context;

        public AppointmentRepository(OperationSchedulerContext context)
        {
            this.context = context;
        }

        public void Add(Appointment appt)
        {
            context.Appointments.Add(appt);
        }

        public Appointment GetAppointment(int id)
        {
            return context.Appointments.FirstOrDefault(a => a.AppointmentId == id);
        }

        public IEnumerable<Appointment> GetAppointments()
        {
            return context.Appointments.Include(a => a.Customer).Include(a => a.Technician).Include(a => a.AppointmentType).ToList<Appointment>();
        }

        public IEnumerable<Appointment> GetAppointmentsByApptNum(string apptNum)
        {
            return context.Appointments.Include(a => a.Customer)
                                      .Include(a => a.Technician)
                                      .Include(a => a.AppointmentType)
                                      .Where(a => a.AppointmentNumber == apptNum)
                                      .ToList<Appointment>();
        }

        public IEnumerable<AppointmentType> GetAppointmentTypes()
        {
            return context.AppointmentTypes.ToList<AppointmentType>();

        }

        public IQueryable<DateTime> GetDistinctApptDates()
        {
            return context.Appointments.Select(a => a.Date).Distinct();
        }

        public void Remove(Appointment appt)
        {
            context.Appointments.Remove(appt);
            context.SaveChanges();
        }

        public void UpdateAppointment(int id, Appointment appt)
        {
            var appointment = GetAppointment(id);

            appointment.AppointmentNumber = appt.AppointmentNumber;
            appointment.TechnicianId = appt.TechnicianId;
            appointment.AppointmentTypeId = appt.AppointmentTypeId;
            appointment.Comments = appt.Comments;
            appointment.Date = appt.Date;
            appointment.Confirmed = appt.Confirmed;
            appointment.Showed = appt.Showed;

            context.SaveChanges();
        }
    }
}