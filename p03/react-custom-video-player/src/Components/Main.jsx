import React, { useEffect, useRef, useState } from 'react';
import "./Main.css";



function Main() {
    const [signUp, setSignUp] = useState(true);
    const [containerClasses, setContainerClasses] = useState('container right-panel-active');
    const containerRef = useRef(null);
    var signUpClass = '';
    
    
    useEffect(() => {
        if(signUp){
            setContainerClasses('container right-panel-active'); 
        }
        else{
            setContainerClasses('container'); 
        }
        // signUpClass = (signUp) ? 'right-panel-active' : '';
         console.log(containerClasses);
    }, [signUp])

    
    const handleSignUp = () => {
        setSignUp(!signUp);
    }

    const handleSignIn = () => {
        setSignUp(false);
    }


    return (
        <div className = {`${containerClasses}`} id="container">
        <div className={`form-container sign-in-container`} ref={containerRef}>
            <form className="form" id="form">
                <h1>Sign In Here</h1>
                <div className="social-container">
                    <a href="https://www.facebook.com/samiullah.hashmi.9480" target="_blank" className="social"></a>
                    <a href="#" className="social"></a>
                    <a href="#" className="social"></a>
                </div>

                <div className="formControl">
                    <input type="email" placeholder="Email" id="email" /> 
                    <input type="text" placeholder="Usename" id="username" />
                    <input type="password" placeholder="Password" id="password" />
                    <a className="sign-in">Sign In</a>
                </div>
            </form>
        </div>

        
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, et voluptas?</p>
                    <button className="ghost" id="sign-in" onClick={()=>handleSignIn()}>Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, et voluptas?</p>
                    <button className="ghost" id="sign-up" onClick={()=>handleSignUp()}>Sign Up</button>
                </div>
            </div>
        </div>
    </div>

    );
}

export default Main;