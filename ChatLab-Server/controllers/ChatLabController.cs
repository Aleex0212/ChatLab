using Microsoft.AspNetCore.Mvc;

namespace ChatLab_Server.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatLabController : ControllerBase
    {
        [HttpGet]
        public ActionResult<string> Get()
        {
            return "Hello from API";
        }
    }
}
