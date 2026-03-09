using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using TaskManager.API.DTOs;
using TaskManager.API.Models;
using TaskManager.API.Repositories.Interfaces;
using TaskManager.API.Services.Interfaces;

namespace TaskManager.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _repository;
        private readonly IConfiguration _config;

        public AuthService(IUserRepository repository, IConfiguration config)
        {
            _repository = repository;
            _config = config;
        }

        public async Task<string> Register(RegisterDto dto)
        {
            var existingUser = await _repository.GetByEmail(dto.Email);

            if (existingUser != null)
                throw new Exception("User already exists");

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = passwordHash
            };

            await _repository.CreateUser(user);
            await _repository.SaveChanges();

            return GenerateJwtToken(user);
        }

        public async Task<string?> Login(LoginDto dto)
        {
            var user = await _repository.GetByEmail(dto.Email);

            if (user == null)
                return null;

            bool validPassword = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);

            if (!validPassword)
                return null;

            return GenerateJwtToken(user);
        }

        public async Task<string?> ForgotPassword(string email)
        {
            var user = await _repository.GetByEmail(email);

            if (user == null)
                return null;

            var token = Guid.NewGuid().ToString();

            user.ResetToken = token;
            user.ResetTokenExpiry = DateTime.UtcNow.AddMinutes(30);

            await _repository.SaveChanges();

            return token;
        }

        public async Task<bool> ResetPassword(ResetPasswordDto dto)
        {
            var user = await _repository.GetByResetToken(dto.Token);

            if (user == null)
                return false;

            if (user.ResetTokenExpiry < DateTime.UtcNow)
                return false;

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            user.ResetToken = null;

            await _repository.SaveChanges();

            return true;
        }

        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(
                    Convert.ToDouble(_config["Jwt:ExpireMinutes"])),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}