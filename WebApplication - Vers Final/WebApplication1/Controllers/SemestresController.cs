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
    [Route("api/Semestres")]
    public class SemestresController : Controller
    {
        private readonly AppDbContext _context;

        public SemestresController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Semestres
        [HttpGet]
        public IEnumerable<Semestre> GetSemestres()
        {
            return _context.Semestres.Include(p => p.Curso);
        }

        // GET: api/Semestres/Cursos
        [HttpGet]
        [Route("Cursos")]
        public IEnumerable<Curso> GetCursos()
        {
            return _context.Cursos;
        }

        // GET: api/Semestres/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSemestre([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var semestre = await _context.Semestres.Include(p => p.Curso).SingleOrDefaultAsync(m => m.Id == id);

            if (semestre == null)
            {
                return NotFound();
            }

            return Ok(semestre);
        }

        // PUT: api/Semestres/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSemestre([FromRoute] int id, [FromForm] Semestre semestre)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != semestre.Id)
            {
                return BadRequest();
            }

            _context.Entry(semestre).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SemestreExists(id))
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

        // POST: api/Semestres
        [HttpPost]
        public async Task<IActionResult> PostSemestre([FromForm] Semestre semestre)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Semestres.Add(semestre);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSemestre", new { id = semestre.Id }, semestre);
        }

        // DELETE: api/Semestres/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSemestre([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var semestre = await _context.Semestres.SingleOrDefaultAsync(m => m.Id == id);
            if (semestre == null)
            {
                return NotFound();
            }

            _context.Semestres.Remove(semestre);
            await _context.SaveChangesAsync();

            return Ok(semestre);
        }

        private bool SemestreExists(int id)
        {
            return _context.Semestres.Any(e => e.Id == id);
        }
    }
}