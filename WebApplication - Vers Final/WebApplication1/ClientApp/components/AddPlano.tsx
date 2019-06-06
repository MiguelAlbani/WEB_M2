import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

import { competencia } from './FetchCompetencia';
import { habilidade } from './FetchHabilidade';
import { objetivo } from './FetchObjetivo';
import { topico } from './FetchTopico';
import { livro } from './FetchLivro';

interface AddPlanoState {
    title: string;
    loading: boolean;
    competenciaLista: Array<any>;  
    habilidadeLista: Array<any>;  
    objetivoLista: Array<any>;  
    topicoLista: Array<any>;
    livroLista: Array<any>;  
}


export class AddPlano extends React.Component<RouteComponentProps<{}>, AddPlanoState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, competenciaLista: [], habilidadeLista: [], objetivoLista: [], topicoLista: [], livroLista: [] };

        fetch('api/Competencias')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ competenciaLista: data });
            });  

        fetch('api/Habilidades')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                console.log(data);
                this.setState({ habilidadeLista: data });
            }); 

        fetch('api/Objetivos')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ objetivoLista: data });
            }); 

        fetch('api/Topicos')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ topicoLista: data });
            }); 

        fetch('api/Livros')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ livroLista: data, loading: false});
            }); 

        var turmaid = this.props.match.params["id"];
        var tipo = this.props.match.params["tipo"];
        console.log(tipo);



        /*else {
            this.state = { title: "Adicionar", loading: false, objetivoLista: [], semestreLista: [], professorLista: [], disciplinaLista: [], dados: new plano };
            this.state.dados.Curso = new objetivo;
            this.state.dados.Curso.Id = 0;
            this.state.dados.Semestre = new semestre;
            this.state.dados.Semestre.Id = 0;
            this.state.dados.Professor = new usuario;
            this.state.dados.Professor.Id = 0;
            this.state.dados.Disciplina = new disciplina;
            this.state.dados.Disciplina.Id = 0;
        } */


        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p>
            : this.renderCreateForm(this.props.match.params["tipo"], this.props.match.params["id"], this.state.competenciaLista, this.state.habilidadeLista, this.state.objetivoLista, this.state.topicoLista, this.state.livroLista);

        return <div>
            <h1>{this.state.title}</h1>
            <h3>Adicionar ao plano de aula</h3>
            <hr />
            {contents}
        </div>;
    }


    private handleSave(event) {

        event.preventDefault();
        const data = new FormData(event.target);

        var tipo = "";

        if (this.props.match.params["tipo"] == "competencia") tipo = "Competencias";
        if (this.props.match.params["tipo"] == "habilidade") tipo = "Habilidades";
        if (this.props.match.params["tipo"] == "objetivo") tipo = "Objetivos";
        if (this.props.match.params["tipo"] == "topico") tipo = "Topicos";
        if (this.props.match.params["tipo"] == "livro") tipo = "Livros";

        fetch('api/Plano/'+tipo, {
            method: 'POST',
            body: data,

        }).then((response) => response.json())
            .then((responseJson) => {
                this.props.history.push("/Turma/plano/" + this.props.match.params["id"]);
        });

    }


    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/Turma/plano/" + this.props.match.params["id"]);
    }

    private renderCreateForm(tipo: string, turma: string, competenciaLista: Array<any>, habilidadeLista: Array<any>, objetivoLista: Array<any>, topicoLista: Array<any>, livroLista: Array<any>) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="Id" value="0" />
                </div>

                {tipo == "competencia" ? 

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="CompetenciaId">Competência</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="CompetenciaId" defaultValue="" required>
                            <option value="">-- Selecionar Competência --</option>
                            {competenciaLista.map(competencia =>
                                <option key={competencia.Id} value={competencia.Id}>{competencia.Descricao}</option>
                            )}
                        </select>
                    </div>
                </div >

                : tipo == "habilidade" ? 

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="HabilidadeId">Habilidade</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="HabilidadeId" defaultValue="" required>
                            <option value="">-- Selecionar Habilidade --</option>
                            {habilidadeLista.map(habilidade =>
                                <option key={habilidade.Id} value={habilidade.Id}>{habilidade.Descricao}</option>
                            )}
                        </select>
                    </div>
                </div >

               : tipo == "objetivo" ? 

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="ObjetivoId">Objetivo</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="ObjetivoId" defaultValue="" required>
                            <option value="">-- Selecionar Objetivo --</option>
                            {objetivoLista.map(objetivo =>
                                <option key={objetivo.Id} value={objetivo.Id}>{objetivo.Descricao}</option>
                            )}
                        </select>
                    </div>  
                </div >

                : tipo == "topico" ?

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="TopicoId">Tópico</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="TopicoId" defaultValue="" required>
                            <option value="">-- Selecionar Tópico --</option>
                            {topicoLista.map(topico =>
                                <option key={topico.Id} value={topico.Id}>{topico.Nome}</option>
                            )}
                        </select>
                    </div>
                </div >

                : tipo == "livro" ?

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="LivroId">Livro</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="LivroId" defaultValue="" required>
                            <option value="">-- Selecionar Livro --</option>
                            {livroLista.map(livro =>
                                <option key={livro.Id} value={livro.Id}>{livro.Nome}</option>
                            )}
                        </select>
                    </div>
                </div >

                : <p></p> }

                <div className="form-group row" >
                    <input type="hidden" name="TurmaId" value={turma} />
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-default">Salvar</button>
                    <button className="btn" onClick={this.handleCancel}>Cancelar</button>
                </div >
            </form >
        )
    }
}  