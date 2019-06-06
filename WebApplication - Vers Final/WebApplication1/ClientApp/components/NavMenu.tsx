import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>Projeto Lab</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/' } exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Página inicial
                            </NavLink>
                        </li>
                        
                        <li>
                            <NavLink to={ '/fetchusuario' } activeClassName='active'>
                                <span className='glyphicon glyphicon-user'></span> Usuários
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={'/fetchcurso'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Cursos
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={'/fetchdisciplina'} activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Disciplinas
                            </NavLink>
                        </li>

                        <li>
                            <p> _________________________ </p>
                        </li>

                        <li>
                            <NavLink to={'/fetchturma'} activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Turmas
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={'/fetchtopico'} activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Tópicos/Aulas
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={'/fetchlivro'} activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Livros
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={'/fetchcompetencia'} activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Competências
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={'/fetchobjetivo'} activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Objetivos
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={'/fetchhabilidade'} activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Habilidades
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={'/fetchsemestre'} activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Semestres
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
