using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1;

namespace WebApplication1
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Disciplina> Disciplinas { get; set; }
        public DbSet<Curso> Cursos { get; set; }
        public DbSet<Turma> Turmas { get; set; }

        public DbSet<Competencia> Competencias { get; set; }
        public DbSet<Habilidade> Habilidades { get; set; }
        public DbSet<Objetivo> Objetivos { get; set; }
        public DbSet<Livro> Livros { get; set; }
        public DbSet<Topico> Topicos { get; set; }
        public DbSet<Semestre> Semestres { get; set; }

        public DbSet<CompetenciaPlano> CompetenciasPlano { get; set; }
        public DbSet<HabilidadePlano> HabilidadesPlano { get; set; }
        public DbSet<ObjetivoPlano> ObjetivosPlano { get; set; }
        public DbSet<TopicoPlano> TopicosPlano { get; set; }
        public DbSet<LivroPlano> LivrosPlano { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                modelBuilder.Entity(entityType.ClrType).ToTable(entityType.ClrType.Name);
            }
        }

        public DbSet<WebApplication1.Competencia> Competencia { get; set; }

    }

}    
