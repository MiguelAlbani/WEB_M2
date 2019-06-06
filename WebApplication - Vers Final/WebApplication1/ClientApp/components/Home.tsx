import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {

    deslogar() {
        localStorage.setItem('user', '');
        this.props.history.push("/login");
    }

    public render() {
        return <div>
            <h1>Página inicial</h1>
            <p> Navegue pelos menus para realizar as operações desejadas. </p>
            <button className="btn btn-primary" onClick={this.deslogar.bind(this)}>Deslogar</button>
            
        </div>;
    }
}
