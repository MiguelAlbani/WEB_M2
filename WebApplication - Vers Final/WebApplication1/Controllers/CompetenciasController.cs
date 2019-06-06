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
    [Route("api/Competencias")]
    public class CompetenciasController : Controller
    {
        private readonly AppDbContext _context;

        public CompetenciasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Competencias
        [HttpGet]
        public IEnumerable<Competencia> GetCompetencias()
        {
            return _context.Competencia.Include(p => p.Curso);
        }

        // GET: api/Competencias/Cursos
        [HttpGet]
        [Route("Cursos")]
        public IEnumerable<Curso> GetCursos()
        {
            return _context.Cursos;
        }

        // GET: api/Competencias/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompetencia([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var competencia = await _context.Competencia.Include(p => p.Curso).SingleOrDefaultAsync(m => m.Id == id);

            if (competencia == null)
            {
                return NotFound();
            }

            return Ok(competencia);
        }

        // PUT: api/Competencias/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompetencia([FromRoute] int id, [FromForm] Competencia competencia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != competencia.Id)
            {
                return BadRequest();
            }

            _context.Entry(competencia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompetenciaExists(id))
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

        // POST: api/Competencias
        [HttpPost]
        public async Task<IActionResult> PostCompetencia([FromForm] Competencia competencia)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Competencia.Add(competencia);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompetencia", new { id = competencia.Id }, competencia);
        }

        // DELETE: api/Competencias/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompetencia([FromForm] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var competencia = await _context.Competencia.SingleOrDefaultAsync(m => m.Id == id);
            if (competencia == null)
            {
                return NotFound();
            }

            _context.Competencia.Remove(competencia);
            await _context.SaveChangesAsync();

            return Ok(competencia);
        }

        private bool CompetenciaExists(int id)
        {
            return _context.Competencia.Any(e => e.Id == id);
        }
    }
}