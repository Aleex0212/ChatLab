using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Mvc;
using ChatLab_Server.SignalR;
using System.Security.Claims;
using ChatLab_Server.models;

namespace ChatLab_Server.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatLabController(IHubContext<ChatHub> hubContext) : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hubContext = hubContext ?? throw new ArgumentNullException(nameof(hubContext));

        [Authorize]
        [HttpPost("message")]
        public async Task<ActionResult> PostMessage([FromBody] PostMessageRequestModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var senderUserId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "unknown";

            await _hubContext.Clients.User(model.TargetUserId).SendAsync("ReceiveMessage", new
            {
                Message = model.Message,
                SentAt = model.SentAt,
                FromUser = senderUserId
            });

            return Ok(new { status = "Message sent" });
        }
    }
}
