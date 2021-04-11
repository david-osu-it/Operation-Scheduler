using System;

namespace Operation_Scheduler.Dto
{
    public class AppointmentCreateDto
    {
        public int AppointmentId { get; set; }
        public int CustomerId { get; set; }
        public int TechnicianId { get; set; }
        public int AppointmentTypeId { get; set; }
        public string? Comments { get; set; }
        public DateTime Date { get; set; }
        public bool Confirmed { get; set; }
        public bool Showed { get; set; }
        public string AppointmentNumber { get; set; }
    }
}