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
    [Route("api/Turmas")]
    public class TurmasController : Controller
    {
        private readonly AppDbContext _context;

        public TurmasController(AppDbContext context)
        {
            _context = context;
        }


        // GET: api/Turmas
        [HttpGet]
        public IEnumerable<Turma> GetTurmas()
        {
            return _context.Turmas
                .Include(p => p.Semestre)
                .Include(p => p.Professor)
                .Include(p => p.Disciplina)
                .Include(p => p.Curso);
        }

        // GET: api/Turmas/Professor/5
        [HttpGet("Professor/{id}")]
        public IEnumerable<Turma> GetTurmasProfessor([FromRoute] int id)
        {
            return _context.Turmas
                .Include(p => p.Semestre)
                .Include(p => p.Professor)
                .Include(p => p.Disciplina)
                .Include(p => p.Curso)
                .Where(m => m.ProfessorId == id);
        }

        // GET: api/Turmas/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTurma([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var turma = await _context.Turmas
                .Include(p => p.Semestre)
                .Include(p => p.Professor)
                .Include(p => p.Disciplina)
                .Include(p => p.Curso)
                .SingleOrDefaultAsync(m => m.Id == id);

            if (turma == null)
            {
                return NotFound();
            }

            return Ok(turma);
        }

        // PUT: api/Turmas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTurma([FromRoute] int id, [FromForm] Turma turma)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != turma.Id)
            {
                return BadRequest();
            }

            _context.Entry(turma).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TurmaExists(id))
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

        // POST: api/Turmas
        [HttpPost]
        public async Task<IActionResult> PostTurma([FromForm] Turma turma)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Turmas.Add(turma);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTurma", new { id = turma.Id }, turma);
        }

        // DELETE: api/Turmas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTurma([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var turma = await _context.Turmas.SingleOrDefaultAsync(m => m.Id == id);
            if (turma == null)
            {
                return NotFound();
            }

            _context.Turmas.Remove(turma);
            await _context.SaveChangesAsync();

            return Ok(turma);
        }

        private bool TurmaExists(int id)
        {
            return _context.Turmas.Any(e => e.Id == id);
        }


        // GET: api/Turmas/Professores
        [HttpGet]
        [Route("Professores")]
        public IEnumerable<Usuario> GetProfessores()
        {
            return _context.Usuarios.Where(m => m.Admin == false);
        }

        // GET: api/Turmas/Semestres
        [HttpGet]
        [Route("Semestres")]
        public IEnumerable<Semestre> GetSemestres()
        {
            return _context.Semestres;
        }

        // GET: api/Turmas/Disciplinas
        [HttpGet]
        [Route("Disciplinas")]
        public IEnumerable<Disciplina> GetDisciplinas()
        {
            return _context.Disciplinas;
        }

        // GET: api/Turmas/Cursos
        [HttpGet]
        [Route("Cursos")]
        public IEnumerable<Curso> GetCursos()
        {
            return _context.Cursos;
        }

    }
}