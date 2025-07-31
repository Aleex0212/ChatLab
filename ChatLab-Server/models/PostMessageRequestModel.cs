namespace ChatLab_Server.models
{
    public class PostMessageRequestModel
    {
        public required string Message { get; set; }
        public required DateTime SentAt { get; set; }
        public required string TargetUserId { get; set; }
    }
}