using System;
using System.Collections.Generic;

#nullable disable

namespace Operation_Scheduler.Models
{
    public partial class Appointment
    {
        public int AppointmentId { get; set; }
        public int CustomerId { get; set; }
        public int TechnicianId { get; set; }
        public int AppointmentTypeId { get; set; }
        public string Comments { get; set; }
        public DateTime Date { get; set; }
        public bool Confirmed { get; set; }
        public bool Showed { get; set; }
        public string AppointmentNumber { get; set; }

        public virtual AppointmentType AppointmentType { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual Technician Technician { get; set; }
    }
}
