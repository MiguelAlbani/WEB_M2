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
    [Route("api/Cursos")]
    public class CursosController : Controller
    {
        private readonly AppDbContext _context;

        public CursosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Cursos
        [HttpGet]
        public IEnumerable<Curso> GetCursos()
        {
            return _context.Cursos.Include(p => p.Coordenador);
        }

        // GET: api/Cursos/Coordenadores
        [HttpGet]
        [Route("Coordenadores")]
        public IEnumerable<Usuario> GetCoordenadores()
        {
            return _context.Usuarios.Where(m => m.NDE == true);
        }

        // GET: api/Cursos/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCurso([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var curso = await _context.Cursos.Include(p => p.Coordenador).SingleOrDefaultAsync(m => m.Id == id);

            if (curso == null)
            {
                return NotFound();
            }

            return Ok(curso);
        }

        // PUT: api/Cursos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCurso([FromRoute] int id, [FromForm] Curso curso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != curso.Id)
            {
                return BadRequest();
            }

            _context.Entry(curso).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CursoExists(id))
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

        // POST: api/Cursos
        [HttpPost]
        public async Task<IActionResult> PostCurso([FromForm] Curso curso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Cursos.Add(curso);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCurso", new { id = curso.Id }, curso);
        }

        // DELETE: api/Cursos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCurso([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var curso = await _context.Cursos.SingleOrDefaultAsync(m => m.Id == id);
            if (curso == null)
            {
                return NotFound();
            }

            _context.Cursos.Remove(curso);
            await _context.SaveChangesAsync();

            return Ok(curso);
        }

        private bool CursoExists(int id)
        {
            return _context.Cursos.Any(e => e.Id == id);
        }
    }
}