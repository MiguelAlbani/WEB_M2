import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Login } from './components/Login';

import { Autorizacao } from './components/Autorizacao';

//Usuario
import { FetchUsuario } from './components/FetchUsuario';
import { AddUsuario } from './components/AddUsuario';
//Curso
import { FetchCurso } from './components/FetchCurso';
import { AddCurso } from './components/AddCurso';
//Disciplina
import { FetchDisciplina } from './components/FetchDisciplina';
import { AddDisciplina } from './components/AddDisciplina';
//Turma
import { FetchTurma } from './components/FetchTurma';
import { AddTurma } from './components/AddTurma';
//Topico
import { FetchTopico } from './components/FetchTopico';
import { AddTopico } from './components/AddTopico';
//Livro
import { FetchLivro } from './components/FetchLivro';
import { AddLivro } from './components/AddLivro';
//Competencia
import { FetchCompetencia } from './components/FetchCompetencia';
import { AddCompetencia } from './components/AddCompetencia';
//Habilidade
import { FetchHabilidade } from './components/FetchHabilidade';
import { AddHabilidade } from './components/AddHabilidade';
//Objetivo
import { FetchObjetivo } from './components/FetchObjetivo';
import { AddObjetivo } from './components/AddObjetivo';
//Semestre
import { FetchSemestre } from './components/FetchSemestre';
import { AddSemestre } from './components/AddSemestre';

//Plano
import { FetchPlano } from './components/FetchPlano';
import { AddPlano } from './components/AddPlano';


export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user') == "admin" || localStorage.getItem('user') == "professor" || localStorage.getItem('user') == "nde"
            ?
            <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

export const CoordenadorRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user') == "admin" || localStorage.getItem('user') == "nde"
            ?
            <Component {...props} />
            : localStorage.getItem('user') == "professor" ?
                <Redirect to={{ pathname: '/autorizacao', state: { from: props.location } }} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />

    )} />
)

export const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user') == "admin"
            ?
            <Component {...props} />
            : localStorage.getItem('user') == "professor" || localStorage.getItem('user') == "nde" ? 
                <Redirect to={{ pathname: '/autorizacao', state: { from: props.location } }} /> 
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            
    )} />
)

export const routes = <Layout>

    <Route path='/login' component={Login} />

    <PrivateRoute exact path='/' component={Home} />
    <PrivateRoute path='/home' component={Home} />
    <PrivateRoute path='/autorizacao' component={Autorizacao} />

    <AdminRoute path='/fetchusuario' component={FetchUsuario} />
    <AdminRoute path='/usuario/adicionar' component={AddUsuario} />
    <AdminRoute path='/usuario/editar/:id' component={AddUsuario} />

    <AdminRoute path='/fetchcurso' component={FetchCurso} />
    <AdminRoute path='/curso/adicionar' component={AddCurso} />
    <AdminRoute path='/curso/editar/:id' component={AddCurso} />

    <CoordenadorRoute path='/fetchdisciplina' component={FetchDisciplina} />
    <CoordenadorRoute path='/disciplina/adicionar' component={AddDisciplina} />
    <CoordenadorRoute path='/disciplina/editar/:id' component={AddDisciplina} />

    {/* *********************************************************** */}

    <PrivateRoute path='/fetchturma' component={FetchTurma} />
    <CoordenadorRoute path='/turma/adicionar' component={AddTurma} />
    <CoordenadorRoute path='/turma/editar/:id' component={AddTurma} />
    <PrivateRoute path='/turma/plano/:id' component={FetchPlano} />
    <PrivateRoute path='/turma/adicionarplano/:id/:tipo/' component={AddPlano} />

    {/* *********************************************************** */}

    <PrivateRoute path='/fetchtopico' component={FetchTopico} />
    <PrivateRoute path='/topico/adicionar' component={AddTopico} />
    <PrivateRoute path='/topico/editar/:id' component={AddTopico} />

    <CoordenadorRoute path='/fetchlivro' component={FetchLivro} />
    <CoordenadorRoute path='/livro/adicionar' component={AddLivro} />
    <CoordenadorRoute path='/livro/editar/:id' component={AddLivro} />

    <CoordenadorRoute path='/fetchcompetencia' component={FetchCompetencia} />
    <CoordenadorRoute path='/competencia/adicionar' component={AddCompetencia} />
    <CoordenadorRoute path='/competencia/editar/:id' component={AddCompetencia} />

    <CoordenadorRoute path='/fetchhabilidade' component={FetchHabilidade} />
    <CoordenadorRoute path='/habilidade/adicionar' component={AddHabilidade} />
    <CoordenadorRoute path='/habilidade/editar/:id' component={AddHabilidade} />

    <CoordenadorRoute path='/fetchobjetivo' component={FetchObjetivo} />
    <CoordenadorRoute path='/objetivo/adicionar' component={AddObjetivo} />
    <CoordenadorRoute path='/objetivo/editar/:id' component={AddObjetivo} />

    <CoordenadorRoute path='/fetchsemestre' component={FetchSemestre} />
    <CoordenadorRoute path='/semestre/adicionar' component={AddSemestre} />
    <CoordenadorRoute path='/semestre/editar/:id' component={AddSemestre} />

</Layout>;


