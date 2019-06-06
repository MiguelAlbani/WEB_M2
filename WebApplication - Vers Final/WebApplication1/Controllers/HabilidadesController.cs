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
    [Route("api/Habilidades")]
    public class HabilidadesController : Controller
    {
        private readonly AppDbContext _context;

        public HabilidadesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Habilidades
        [HttpGet]
        public IEnumerable<Habilidade> GetHabilidades()
        {
            return _context.Habilidades.Include(p => p.Curso);
        }

        // GET: api/Habilidades/Cursos
        [HttpGet]
        [Route("Cursos")]
        public IEnumerable<Curso> GetCursos()
        {
            return _context.Cursos;
        }

        // GET: api/Habilidades/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHabilidade([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var habilidade = await _context.Habilidades.Include(p => p.Curso).SingleOrDefaultAsync(m => m.Id == id);

            if (habilidade == null)
            {
                return NotFound();
            }

            return Ok(habilidade);
        }

        // PUT: api/Habilidades/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHabilidade([FromRoute] int id, [FromForm] Habilidade habilidade)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != habilidade.Id)
            {
                return BadRequest();
            }

            _context.Entry(habilidade).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HabilidadeExists(id))
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

        // POST: api/Habilidades
        [HttpPost]
        public async Task<IActionResult> PostHabilidade([FromForm] Habilidade habilidade)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Habilidades.Add(habilidade);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHabilidade", new { id = habilidade.Id }, habilidade);
        }

        // DELETE: api/Habilidades/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHabilidade([FromForm] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var habilidade = await _context.Habilidades.SingleOrDefaultAsync(m => m.Id == id);
            if (habilidade == null)
            {
                return NotFound();
            }

            _context.Habilidades.Remove(habilidade);
            await _context.SaveChangesAsync();

            return Ok(habilidade);
        }

        private bool HabilidadeExists(int id)
        {
            return _context.Habilidades.Any(e => e.Id == id);
        }
    }
}