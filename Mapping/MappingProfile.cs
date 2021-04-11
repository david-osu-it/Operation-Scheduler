using AutoMapper;
using Operation_Scheduler.Dto;
using Operation_Scheduler.Models;

namespace Operation_Scheduler.Mapping
{
    public class MappingProfile : Profile
    {

        public MappingProfile()
        {

            CreateMap<Customer, CustomerCreateDto>();
            CreateMap<Appointment, AppointmentCreateDto>();
            CreateMap<AppointmentType, AppointmentTypeDto>();
            CreateMap<Technician, TechnicianViewDto>();
            CreateMap<AppointmentType, AppointmentTypeViewDto>();
            CreateMap<Customer, CustomerUpdateDto>()
            .ForMember(c => c.FirstName, opt => opt.MapFrom(a => a.FirstName + " " + a.LastName));
            CreateMap<Appointment, AppointmentViewDto>()
            .ForMember(av => av.customer, opt => opt.MapFrom(a => a.Customer))
            .ForMember(av => av.technician, opt => opt.MapFrom(a => a.Technician))
            .ForMember(av => av.type, opt => opt.MapFrom(a => a.AppointmentType));

            CreateMap<CustomerCreateDto, Customer>();
            CreateMap<CustomerUpdateDto, Customer>();
            CreateMap<AppointmentCreateDto, Appointment>();
            CreateMap<AppointmentTypeDto, AppointmentType>();
            CreateMap<TechnicianViewDto, Technician>();
            CreateMap<AppointmentViewDto, Appointment>();
            CreateMap<AppointmentViewDto, Appointment>();

        }
    }
}