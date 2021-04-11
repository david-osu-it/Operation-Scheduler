using System.ComponentModel;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Operation_Scheduler.Helpers;
using Operation_Scheduler.Models;
using BC = BCrypt.Net.BCrypt;

namespace Operation_Scheduler.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly AppSettings _appSettings;
        private readonly OperationSchedulerContext context;

        public AdminRepository(OperationSchedulerContext context, IOptions<AppSettings> appSettings)
        {
            this.context = context;
            _appSettings = appSettings.Value;
        }

        public void Add(Admin admin)
        {
            var newAdmin = new Admin
            {
                AdminId = admin.AdminId,
                FirstName = admin.FirstName,
                LastName = admin.LastName,
                Role = admin.Role,
                Username = admin.Username,
                Password = BC.HashPassword(admin.Password)
            };

            context.Admins.Add(newAdmin);
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var admin = context.Admins.SingleOrDefault(x => x.Username == model.Username);

            // return null if user not found
            if (admin == null || !BC.Verify(model.Password, admin.Password)) return null;

            // authentication successful so generate jwt token
            var token = generateJwtToken(admin);

            return new AuthenticateResponse(admin, token);
        }

        public void Delete(Admin admin)
        {
            context.Admins.Remove(admin);
            context.SaveChanges();
        }

        public IEnumerable<Admin> GetAll()
        {
            return context.Admins.ToList();
        }

        public Admin GetById(int id)
        {
            return context.Admins.FirstOrDefault(x => x.AdminId == id);
        }

        // helper methods

        private string generateJwtToken(Admin admin)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                new Claim ("adminId", admin.AdminId.ToString ()),
                new Claim ("name", admin.FirstName.ToString () + " " + admin.LastName.ToString ()),
                new Claim ("username", admin.Username.ToString ()),
                new Claim ("role", admin.Role.ToString ())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}