namespace Operation_Scheduler.Models
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }


        public AuthenticateResponse(Admin admin, string token)
        {
            Id = admin.AdminId;
            Name = admin.FirstName + " " + admin.LastName;
            Username = admin.Username;
            Role = admin.Role;
            Token = token;
        }
    }
}