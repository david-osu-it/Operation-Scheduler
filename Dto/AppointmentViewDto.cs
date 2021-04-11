using System;
using System.Collections.Generic;

namespace Operation_Scheduler.Dto
{
    public class AppointmentViewDto
    {
        public CustomerUpdateDto customer { get; set; }
        public TechnicianViewDto technician { get; set; }
        public AppointmentTypeViewDto type { get; set; }
        public string? Comments { get; set; }
        public DateTime Date { get; set; }
        public bool Confirmed { get; set; }
        public bool Showed { get; set; }
        public string AppointmentNumber { get; set; }
        public int AppointmentId { get; set; }

    }
}