import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { topico } from './FetchTopico';
import { curso } from './FetchCurso';

interface AddTopicoState {
    title: string;
    loading: boolean;
    cursoLista: Array<any>;  
    dados: topico;
}


export class AddTopico extends React.Component<RouteComponentProps<{}>, AddTopicoState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, cursoLista: [], dados: new topico };

        fetch('api/Topicos/Cursos')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ cursoLista: data });
            });  

        var topicoid = this.props.match.params["id"];

        if (topicoid > 0) {
            fetch('api/Topicos/' + topicoid)
                .then(response => response.json() as Promise<topico>)
                .then(data => {
                    this.setState({ title: "Editar", loading: false, dados: data });
                });
        }


        else {
            this.state = { title: "Adicionar", loading: false, cursoLista: [], dados: new topico };
            this.state.dados.Curso = new curso;
            this.state.dados.Curso.Id = 0;
        } 


        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.cursoLista);

        return <div>
            <h1>{this.state.title}</h1>
            <h3>Tópico/Aula</h3>
            <hr />
            {contents}
        </div>;
    }


    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        console.log(this.state.dados.Id);

        if (this.state.dados.Id) {
            fetch('api/Topicos/' + this.state.dados.Id, {
                method: 'PUT',
                body: data


            }).then((response) => { this.props.history.push("/fetchtopico") });
        }


        else {
            fetch('api/Topicos', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchtopico");
                })
        }
    }


    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchtopico");
    }

    private renderCreateForm(cursoLista: Array<any>) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="Id" value={this.state.dados.Id} />
                </div>

                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Nome">Nome</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Nome" defaultValue={this.state.dados.Nome.trim()} required />
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="CursoId">Curso</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="CursoId" defaultValue={(""+this.state.dados.Curso.Id) || "0"} required>
                            <option value="">-- Selecionar Curso --</option>
                            {cursoLista.map(curso =>
                                <option key={curso.Id} value={curso.Id}>{curso.Nome}</option>
                            )}
                        </select>
                    </div>  
                </div >

                <div className="form-group">
                    <button type="submit" className="btn btn-default">Salvar</button>
                    <button className="btn" onClick={this.handleCancel}>Cancelar</button>
                </div >
            </form >
        )
    }
}  