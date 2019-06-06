using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1;

namespace WebApplication1.Controllers
{
    [Produces("application/json")]
    [Route("api/Usuarios")]
    public class UsuariosController : Controller
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Usuarios
        [HttpGet]
        public IEnumerable<Usuario> GetUsuarios()
        {
            return _context.Usuarios;
        }

        // GET: api/Usuarios/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsuario([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var usuario = await _context.Usuarios.SingleOrDefaultAsync(m => m.Id == id);

            if (usuario == null)
            {
                return NotFound();
            }

            return Ok(usuario);
        }

        // PUT: api/Usuarios/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario([FromRoute] int id, [FromForm] Usuario usuario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != usuario.Id)
            {
                return BadRequest();
            }

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsuarioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Usuarios
        [HttpPost]
        public async Task<IActionResult> PostUsuario([FromForm] Usuario usuario)
        {
            ModelState.Remove("Id");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsuario", new { id = usuario.Id }, usuario);
        }

        // DELETE: api/Usuarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var usuario = await _context.Usuarios.SingleOrDefaultAsync(m => m.Id == id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return Ok(usuario);
        }

        // POST: api/Login
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> PostLogin([FromForm] Usuario usuario)
        {
            if(usuario.Login == "admin" && usuario.Senha == "admin") return new OkObjectResult(new Item { tipo = "admin", id = 1});

            if (LoginExists(usuario.Login, usuario.Senha))
            {
                var u = await _context.Usuarios.SingleOrDefaultAsync(e => (e.Login.Trim() == usuario.Login.Trim()) && (e.Senha.Trim() == usuario.Senha.Trim()));
                if(u.Admin == true) return new OkObjectResult(new Item { tipo = "admin", id = u.Id});
                if (u.NDE == true) return new OkObjectResult(new Item { tipo = "nde", id = u.Id });
                return new OkObjectResult(new Item { tipo = "professor", id = u.Id });

            }
            else return NotFound();
        }

        private bool UsuarioExists(int id)
        {
            return _context.Usuarios.Any(e => e.Id == id);
        }

        private bool LoginExists(string login, string senha)
        {
            return _context.Usuarios.Any(e => (e.Login.Trim() == login.Trim()) && (e.Senha.Trim() == senha.Trim()));
        }
    }

    public class Item
    {
        public string tipo { get; set; }
        public int id { get; set; }
    }
}