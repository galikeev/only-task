import styledComponents from "styled-components";


const Button = styledComponents.button`
    width: 200px;
    height: 60px;
    background: #F5F5F5;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    color: #000000;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
`;

const HomePage = ({logout, email}) => {

    return (
        <div className="container">
            <div>Здравствуйте, <span style={{'fontWeight': '700'}}>{email}</span></div>
            <Button onClick={logout}>Выйти</Button>
        </div>
    );
};

export default HomePage;