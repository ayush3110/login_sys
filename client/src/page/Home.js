import { NavLink } from "react-router-dom";
import img from "../img/home 3.png";
import UserStore from "../stores/UserStore";

const Home = (props) => {
    if (UserStore.isLoggedIn) {
        return (
            <>
                {
                    props.history.push('/user/dashbord')
                }
            </>
        )
    }
    else {
        return (
            <>
                <div className="_home">
                    <div className="_h1">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit nostrum, architecto asperiores porro, fuga voluptates quas explicabo ipsam minus, praesentium rem quam deserunt quaerat aperiam similique repudiandae minima repellendus nam.</p>
                        <p id='p2'>If you new to our site <NavLink className='hlink' to='/user/signin'>Sign Up</NavLink> here</p>
                        <p>Other wise <NavLink className='hlink' to='/user/login'>Login</NavLink> here</p>
                    </div>
                    <div className="_h2">
                        <div className="h2img">
                            <img src={img} alt='homepage img' />
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default Home;