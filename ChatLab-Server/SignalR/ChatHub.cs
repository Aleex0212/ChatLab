using Microsoft.AspNetCore.SignalR;

namespace ChatLab_Server.SignalR
{
    public class ChatHub : Hub
    {
        public async Task SendMessageToUser(string targetUserId, string message)
        {
            var senderUserName = Context.User?.Identity?.Name ?? "unknown";
            await Clients.User(targetUserId).SendAsync("ReceiveMessage", new
            {
                Message = message,
                From = senderUserName,
                SentAt = DateTime.UtcNow
            });
        }
    }

}