import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { curso } from './FetchCurso';


interface FetchSemestreExampleState {
    list: semestre[];
    loading: boolean;
}

export class FetchSemestre extends React.Component<RouteComponentProps<{}>, FetchSemestreExampleState> {

    constructor() {
        super();
        this.state = { list: [], loading: true };

        fetch('api/Semestres')
            .then(response => response.json() as Promise<semestre[]>)
            .then(data => {
                console.log(data);
                this.setState({ list: data, loading: false });
            });

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this); 
    }

    private handleDelete(id: number) {
        if (!confirm("Você realmente deseja excluir o semestre: " + id))
            return;
        else {
            fetch('api/Semestres/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        list: this.state.list.filter((item) => {
                            return (item.Id != id);
                        })
                    });
            });
        }
    }

    private handleEdit(id: number) {
        this.props.history.push("/Semestre/editar/" + id);
    } 

    private renderlistTable(list: semestre[]) {

        return <table className='table'>
            <thead>
                <tr>
                    <th>Semestre</th>
                    <th>Curso</th>
                </tr>
            </thead>
            <tbody>
                {list.map(semestre =>
                    <tr key={semestre.Id}>
                        <td>{semestre.Id}</td>
                        <td>{semestre.Curso.Nome}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(semestre.Id)}>Editar</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(semestre.Id)}> Remover   </a>  
                        </td>  
                    </tr>

                )}
            </tbody>
        </table>;

    }
                                                    
    public render() {

       let contents = this.state.loading
                ? <p><em>Carregando...</em></p>
            : this.renderlistTable(this.state.list);

        return <div>
            <h1>Semestres</h1>
            <p>Lista de semestres cadastrados. Todos os semestres estão vinculadas a um curso.</p>
            {contents}
            <button className="btn btn-primary" onClick={()=>this.props.history.push("/Semestre/adicionar/")}>Adicionar</button>
        </div>;

    }
                        
    
}

export class semestre {
    Id: number = 0;
    Curso: curso;
}