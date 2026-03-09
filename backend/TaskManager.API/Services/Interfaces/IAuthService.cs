using TaskManager.API.DTOs;

namespace TaskManager.API.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string> Register(RegisterDto dto);
        Task<string?> Login(LoginDto dto);
        Task<string?> ForgotPassword(string email);
        Task<bool> ResetPassword(ResetPasswordDto dto);
    }
}