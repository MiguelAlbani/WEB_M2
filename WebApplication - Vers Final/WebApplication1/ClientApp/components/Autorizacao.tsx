import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Autorizacao extends React.Component<RouteComponentProps<{}>, {}> {

    deslogar() {
        localStorage.setItem('user', '');
        this.props.history.push("/login");
    }

    public render() {
        return <div>
            <h2>Você não tem autorização para ver esta página.</h2>
            <p> O seu usuário não tem privilégios para ver este conteúdo. </p>
            <button className="btn btn-primary" onClick={this.deslogar.bind(this)}>Deslogar</button>
            
        </div>;
    }
}
