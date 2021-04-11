using System;
using System.Collections.Generic;

#nullable disable

namespace Operation_Scheduler.Models
{
    public partial class AppointmentType
    {
        public AppointmentType()
        {
            Appointments = new HashSet<Appointment>();
        }

        public int AppointmentTypeId { get; set; }
        public string Type { get; set; }

        public virtual ICollection<Appointment> Appointments { get; set; }
    }
}
