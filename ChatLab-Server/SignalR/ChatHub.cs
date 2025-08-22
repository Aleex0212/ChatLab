using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using ChatLab_Server.models;
using Microsoft.AspNetCore.Authorization;

namespace ChatLab_Server.SignalR
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly IDictionary<string, UserRoomConnection> _connection;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<ChatHub> _logger;

        public ChatHub(IDictionary<string, UserRoomConnection> connection, UserManager<ApplicationUser> userManager, ILogger<ChatHub> logger)
            => (_connection, _userManager, _logger) = (connection, userManager, logger);

        public async Task JoinRoom(string room)
        {
            var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return;

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return;

            await Groups.AddToGroupAsync(Context.ConnectionId, room);

            _connection[Context.ConnectionId] = new UserRoomConnection
            {
                Room = room
            };

            _logger.LogInformation($"ConnectionId {Context.ConnectionId} added to room {room}");

            await Clients.Group(room)
                .SendAsync("receiveMessage", "ChatLab", $"{user.UserName} has joined the group", DateTime.Now);

            await SendConnectedUser(room);
        }

        public async Task SendMessage(string message)
        {
            if (_connection.TryGetValue(Context.ConnectionId, out var userRoomConnection))
            {
                var user = Context.User?.Identity?.Name ?? "Unknown";
                await Clients.Group(userRoomConnection.Room!)
                    .SendAsync("receiveMessage", user, message, DateTime.Now);
                _logger.LogInformation($"User: {user}, Message: {message} Time: {DateTime.Now}");
            }
        }

        public Task SendConnectedUser(string room)
        {
            var users = _connection.Keys
                .Where(connId => _connection[connId].Room == room)
                .Select(connId =>
                {
                    var principal = Context.User;
                    return principal?.Identity?.Name ?? "Unknown";
                });
            return Clients.Group(room).SendAsync("connectedUser", users);
        }
    }
}
