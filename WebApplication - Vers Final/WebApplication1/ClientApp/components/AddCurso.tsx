import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { curso } from './FetchCurso';

interface AddCursoState {
    title: string;
    loading: boolean;
    coordenadorLista: Array<any>;  
    dados: curso;
}


export class AddCurso extends React.Component<RouteComponentProps<{}>, AddCursoState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, coordenadorLista: [], dados: new curso };

        fetch('api/Cursos/Coordenadores')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ coordenadorLista: data });
            });  

        var cursoid = this.props.match.params["id"];

        if (cursoid > 0) {
            fetch('api/Cursos/' + cursoid)
                .then(response => response.json() as Promise<curso>)
                .then(data => {
                    this.setState({ title: "Editar", loading: false, dados: data });
                });
        }


        else {
            this.state = { title: "Adicionar", loading: false, coordenadorLista: [], dados: new curso };
        } 


        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.coordenadorLista);

        return <div>
            <h1>{this.state.title}</h1>
            <h3>Curso</h3>
            <hr />
            {contents}
        </div>;
    }


    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        console.log(this.state.dados.Id);

        if (this.state.dados.Id) {
            fetch('api/Cursos/' + this.state.dados.Id, {
                method: 'PUT',
                body: data


            }).then((response) => { this.props.history.push("/fetchcurso") });
        }


        else {
            fetch('api/Cursos', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchcurso");
                })
        }
    }


    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchcurso");
    }

    private renderCreateForm(coordenadorLista: Array<any>) {
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
                    <label className="control-label col-md-12" htmlFor="CoordenadorId">Coordenador</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="CoordenadorId" defaultValue={(""+this.state.dados.Coordenador) || "0"} required>
                            <option value="">-- Selecionar Coordenador --</option>
                            {coordenadorLista.map(coordenador =>
                                <option key={coordenador.Id} value={coordenador.Id}>{coordenador.Nome}</option>
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