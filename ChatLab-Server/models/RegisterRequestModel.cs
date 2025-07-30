namespace ChatLab_Server.models
{
    public class RegisterRequestModel
    {
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}