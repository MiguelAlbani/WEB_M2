import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { disciplina } from './FetchDisciplina';

interface AddDisciplinaState {
    title: string;
    loading: boolean;
    responsavelLista: Array<any>;  
    dados: disciplina;
}


export class AddDisciplina extends React.Component<RouteComponentProps<{}>, AddDisciplinaState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, responsavelLista: [], dados: new disciplina };

        fetch('api/Disciplinas/Professores')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ responsavelLista: data });
            });  

        var disciplinaid = this.props.match.params["id"];

        if (disciplinaid > 0) {
            fetch('api/Disciplinas/' + disciplinaid)
                .then(response => response.json() as Promise<disciplina>)
                .then(data => {
                    this.setState({ title: "Editar", loading: false, dados: data });
                });
        }


        else {
            this.state = { title: "Adicionar", loading: false, responsavelLista: [], dados: new disciplina };
        } 


        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.responsavelLista);

        return <div>
            <h1>{this.state.title}</h1>
            <h3>Disciplina</h3>
            <hr />
            {contents}
        </div>;
    }


    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        console.log(this.state.dados.Id);

        if (this.state.dados.Id) {
            fetch('api/Disciplinas/' + this.state.dados.Id, {
                method: 'PUT',
                body: data


            }).then((response) => { this.props.history.push("/fetchdisciplina") });
        }


        else {
            fetch('api/Disciplinas', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchdisciplina");
                })
        }
    }


    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchdisciplina");
    }

    private renderCreateForm(responsavelLista: Array<any>) {
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

                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Codigo">Código</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Codigo" defaultValue={this.state.dados.Codigo.trim()} required />
                    </div>
                </div >

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="ResponsavelId">Prof. Responsável</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="ResponsavelId" defaultValue={(""+this.state.dados.Responsavel) || "0"} required>
                            <option value="">-- Selecionar Professor --</option>
                            {responsavelLista.map(responsavel =>
                                <option key={responsavel.Id} value={responsavel.Id}>{responsavel.Nome}</option>
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