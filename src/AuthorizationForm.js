import React, {Component} from "react";
import "./AuthorizationForm.css";
import google from "./images/google.svg";
import apple from "./images/apple.svg"
import fb from "./images/fb.svg";
import vk from "./images/vk.svg"
class AuthorizationForm extends Component {
    state = {
        email: '',
        exists: '',
        emailClicked: '',
        name: '',
        phone: '',
        password: '',
        registered: '',
        error: '',
    }
    
    handleChange=(e)=>{
        this.setState({email: e.target.value})
        this.setState({name: e.target.value})
        this.setState({phone: e.target.value})
        this.setState({password: e.target.value})
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        if(!this.state.emailClicked){
            const adress = this.state.email;
            console.log(adress);
            const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if(reg.test(adress) == false) {
                   alert('Введите корректный e-mail');
                //    console.log(document.querySelector('.email'))

                //    adress.classList.toggle('error')
                   return false;
                }else{
                    console.log("adress is ok")
                
            this.setState({emailClicked: true})
            let url = "https://lumus.wistis.ru/api/v1/auth/check-email";
        
            const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            };
        
            let body = {
            "email": this.state.email,
            };
    
            fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            })
            .then(response => response.json())
            .then(data=>{
                console.log(data);
                this.setState({exists: data.exists})
            })
        }

        }
        else if (this.state.exists===0){
        let url = "https://lumus.wistis.ru/api/v1/auth/register";
        
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
        
        let body = {
            "name": this.state.name,
            "phone": this.state.phone,



            "email": this.state.email,



            "password": this.state.password
        };
    
        fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        })
        .then(response => {
            response.json()
        if (response.ok) { 

            this.setState({registered: true});
            this.setState({exists: 1})

              } else {
                console.log(response)
                alert("Ошибка: " + response.status + " Проверьте правильность заполнения полей Пароль должен состоять минимум из 8 символов");
              }
        })
        
        .catch((error) => {
            console.error('Error:', error);
            });

        }else if(this.state.exists===1){
            console.log('exists!');



            const url = new URL(
                "https://lumus.wistis.ru/api/v1/auth/login"
            );
            
            const headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer 11|Z58sRgglIckxyFziYxJOjjFp0tRsejQUv2yQQ4Xu",
            };
            
            let body = {
                "email": this.state.email,
                "password": this.state.password
            };
            
            fetch(url, {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            })
            .then(response => response.json())
            .then(data => console.log(data))
        }
    }
      



    render(){
        return(
            <div className="formContainer">
            <form onSubmit={this.handleSubmit}>
            {!this.state.emailClicked &&
            <div className="formContainer__header">Вход или регистрация
            <hr></hr>
            </div>
            }
            {this.state.exists===0 &&
            <div className="formContainer__header">Регистрация
            <hr></hr>
            </div>
            }
            {!this.state.exists===0 &&
            <div className="formContainer__header">Вход
            <hr></hr>
            </div>
            }
            
            
        <label>
          Email:
        </label>
          <input className="formContainer__input email" type="text" placeholder="Email" value={this.state.value} onChange={this.handleChange} />
          
        {!this.state.emailClicked &&
        <>
            <input className="formContainer__button" type="submit" value="Продолжить" />
            <center id="or">Или</center>


            
            <div className="formContainer__footer">
                <img className="logo" src={google} alt="google" />
                <img className="logo" src={apple} alt="apple" />
                <img className="logo" src={fb} alt="fb" />
                <img className="logo" src={vk} alt="vk" />
            </div>
        </>
        }
        



        {this.state.exists===0 &&
            <>
            <label>
              Пароль:
            </label>
            <input className="formContainer__input" type="password" placeholder="Пароль" value={this.state.value} onChange={this.handleChange} />

            <label>
              Имя Фамилия:
            </label>
            <input className="formContainer__input" type="text" placeholder="Имя Фамилия" value={this.state.value} onChange={this.handleChange} />

            <label>
              Телефон:
            </label>
            <input className="formContainer__input" type="text" placeholder="Телефон" value={this.state.value} onChange={this.handleChange} />
            
            <input className="formContainer__button" type="submit" value="Создать аккаунт" />

            <p>Нажимая на "Создать аккаунт", вы соглашаетесь с <span id="emphasize">Политикой обработки данных</span></p>
            </>
          
          }
          {this.state.exists>0 &&
          <>
          <label>
              Пароль:
            </label>
            <input className="formContainer__input" type="password" placeholder="Пароль" value={this.state.value} onChange={this.handleChange} />
            <input className="formContainer__button" type="submit" value="Войти" />
          </>
          }
      </form>
            </div>
        )
    }
}
export default AuthorizationForm;