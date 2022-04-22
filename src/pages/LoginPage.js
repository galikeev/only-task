
import { useForm } from "react-hook-form";

import styledComponents from "styled-components";

const Input = styledComponents.input`
    width: 640px;
    height: 60px;
    background: #F5F5F5;
    border-radius: 8px;
    border: none;
    padding: 20px;
    outline: none;
`;

const Form = styledComponents.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
`;

const Label = styledComponents.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Button = styledComponents(Input)`
    background: #4A67FF;
    color: #ffffff;
    cursor: pointer;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
`;

const Error = styledComponents.span`
    font-size: 14px;
    line-height: 17px;
    color: #E26F6F;
`;

const NotFound = styledComponents.div`
    width: 640px;
    height: 60px;
    background: #F5E9E9;
    border: 1px solid #E26F6F;
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 20px;
`;

const Warning = styledComponents.div`
    width: 20px;
    height: 20px;
    background: #FFC8C8;
    border-radius: 50%;
    color: #EE6565;
    text-align: center;
    padding-top: 3px;
`;


const LoginPage = ({onSubmit, error, disabledBtn}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const disibledColor = disabledBtn ? {'background': '#99A9FF'} : null;

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {error ? <NotFound><Warning>!</Warning>{error}</NotFound> : ''}
            <Label>
                <label htmlFor="email">Логин</label>
                <Input 
                    placeholder="enter email" 
                    name="email"
                    {...register('email', {required: true})}
                    style={{border: errors.email && '1px solid #E26F6F'}}/>
                {errors.email && <Error>Обязательное поле</Error>}
            </Label>
            <Label>
                <label htmlFor="email">Пароль</label>
                <Input 
                    placeholder="enter password" 
                    name="password"
                    {...register('password', {required: true})}
                    style={{border: errors.password && '1px solid #E26F6F'}}/>
                {errors.password && <Error>Обязательное поле</Error>}
            </Label>
            <Button type="submit" value="Войти" disabled={disabledBtn} style={disibledColor}/>
        </Form>
    );
};

export default LoginPage;