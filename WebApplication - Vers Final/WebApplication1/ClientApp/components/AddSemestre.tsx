import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { semestre } from './FetchSemestre';
import { curso } from './FetchCurso';

interface AddSemestreState {
    title: string;
    loading: boolean;
    cursoLista: Array<any>;  
    dados: semestre;
}


export class AddSemestre extends React.Component<RouteComponentProps<{}>, AddSemestreState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, cursoLista: [], dados: new semestre };

        fetch('api/Semestres/Cursos')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ cursoLista: data });
            });  

        var semestreid = this.props.match.params["id"];

        if (semestreid > 0) {
            fetch('api/Semestres/' + semestreid)
                .then(response => response.json() as Promise<semestre>)
                .then(data => {
                    this.setState({ title: "Editar", loading: false, dados: data });
                });
        }


        else {
            this.state = { title: "Adicionar", loading: false, cursoLista: [], dados: new semestre };
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
            <h3>Semestre</h3>
            <hr />
            {contents}
        </div>;
    }


    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        console.log(this.state.dados.Id);

        if (this.state.dados.Id) {
            fetch('api/Semestres/' + this.state.dados.Id, {
                method: 'PUT',
                body: data


            }).then((response) => { this.props.history.push("/fetchsemestre") });
        }


        else {
            fetch('api/Semestres', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchsemestre");
                })
        }
    }


    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchsemestre");
    }

    private renderCreateForm(cursoLista: Array<any>) {
        return (
            <form onSubmit={this.handleSave} >

                <div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Id">Semestre</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Id" defaultValue={("" + this.state.dados.Id) || "0"} required />
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