import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { objetivo } from './FetchObjetivo';

interface AddObjetivoState {
    title: string;
    loading: boolean;
    cursoLista: Array<any>;  
    dados: objetivo;
}


export class AddObjetivo extends React.Component<RouteComponentProps<{}>, AddObjetivoState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, cursoLista: [], dados: new objetivo };

        fetch('api/Objetivos/Cursos')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ cursoLista: data });
            });  

        var objetivoid = this.props.match.params["id"];

        if (objetivoid > 0) {
            fetch('api/Objetivos/' + objetivoid)
                .then(response => response.json() as Promise<objetivo>)
                .then(data => {
                    this.setState({ title: "Editar", loading: false, dados: data });
                });
        }


        else {
            this.state = { title: "Adicionar", loading: false, cursoLista: [], dados: new objetivo };
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
            <h3>Objetivo</h3>
            <hr />
            {contents}
        </div>;
    }


    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        console.log(this.state.dados.Id);

        if (this.state.dados.Id) {
            fetch('api/Objetivos/' + this.state.dados.Id, {
                method: 'PUT',
                body: data


            }).then((response) => { this.props.history.push("/fetchobjetivo") });
        }


        else {
            fetch('api/Objetivos', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchobjetivo");
                })
        }
    }


    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchobjetivo");
    }

    private renderCreateForm(cursoLista: Array<any>) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="Id" value={this.state.dados.Id} />
                </div>

                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Descricao">Descrição</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Descricao" defaultValue={this.state.dados.Descricao.trim()} required />
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="CursoId">Curso</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="CursoId" defaultValue={(""+this.state.dados.Curso) || "0"} required>
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