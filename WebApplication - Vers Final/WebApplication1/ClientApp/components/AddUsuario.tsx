import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { usuario } from './FetchUsuario';

interface AddUsuarioState {
    title: string;
    loading: boolean;
    dados: usuario;
}


export class AddUsuario extends React.Component<RouteComponentProps<{}>, AddUsuarioState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, dados: new usuario };

        var usuarioid = this.props.match.params["id"];


        if (usuarioid > 0) {
            fetch('api/Usuarios/' + usuarioid)
                .then(response => response.json() as Promise<usuario>)
                .then(data => {
                    this.setState({ title: "Editar", loading: false, dados: data });
                });
        }


        else {
            this.state = { title: "Adicionar", loading: false, dados: new usuario };
        }


        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return <div>
            <h1>{this.state.title}</h1>
            <h3>Usuário</h3>
            <hr />
            {contents}
        </div>;
    }


    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        console.log(this.state.dados.Id);

        if (this.state.dados.Id) {
            fetch('api/Usuarios/' + this.state.dados.Id, {
                method: 'PUT',
                body: data


            }).then((response) => { this.props.history.push("/fetchusuario") });
        }


        else {
            fetch('api/Usuarios', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchusuario");
                })
        }
    }


    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchusuario");
    }

    private renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="Id" value={this.state.dados.Id} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Nome">Nome</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Nome" defaultValue={this.state.dados.Nome.trim()} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Login">Login (Usuário)</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Login" defaultValue={this.state.dados.Login.trim()} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Senha">Senha</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Senha" defaultValue={this.state.dados.Senha.trim()} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Admin">É administrador?</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="Admin" defaultValue={""+this.state.dados.Admin} required>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="NDE">É Coordenador (NDE)?</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="NDE" defaultValue={""+this.state.dados.NDE} required>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Salvar</button>
                    <button className="btn" onClick={this.handleCancel}>Cancelar</button>
                </div >
            </form >
        )
    }
}  