using System;
using System.Collections.Generic;

#nullable disable

namespace Operation_Scheduler.Models
{
    public partial class Technician
    {
        public Technician()
        {
            Appointments = new HashSet<Appointment>();
        }

        public int TechnicianId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public virtual ICollection<Appointment> Appointments { get; set; }
    }
}
