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
    [Route("api/Topicos")]
    public class TopicosController : Controller
    {
        private readonly AppDbContext _context;

        public TopicosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Topicos
        [HttpGet]
        public IEnumerable<Topico> GetTopicos()
        {
            return _context.Topicos.Include(p => p.Curso);
        }

        // GET: api/Topicos/Cursos
        [HttpGet]
        [Route("Cursos")]
        public IEnumerable<Curso> GetCursos()
        {
            return _context.Cursos;
        }

        // GET: api/Topicos/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTopico([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var topico = await _context.Topicos.Include(p => p.Curso).SingleOrDefaultAsync(m => m.Id == id);

            if (topico == null)
            {
                return NotFound();
            }

            return Ok(topico);
        }

        // PUT: api/Topicos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTopico([FromRoute] int id, [FromForm] Topico topico)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != topico.Id)
            {
                return BadRequest();
            }

            _context.Entry(topico).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TopicoExists(id))
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

        // POST: api/Topicos
        [HttpPost]
        public async Task<IActionResult> PostTopico([FromForm] Topico topico)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Topicos.Add(topico);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTopico", new { id = topico.Id }, topico);
        }

        // DELETE: api/Topicos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTopico([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var topico = await _context.Topicos.SingleOrDefaultAsync(m => m.Id == id);
            if (topico == null)
            {
                return NotFound();
            }

            _context.Topicos.Remove(topico);
            await _context.SaveChangesAsync();

            return Ok(topico);
        }

        private bool TopicoExists(int id)
        {
            return _context.Topicos.Any(e => e.Id == id);
        }
    }
}