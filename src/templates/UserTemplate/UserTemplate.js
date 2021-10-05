import { Fragment } from "react";
import { Route } from "react-router";

export const UserTemplate = (props) => { //path, exat, Component
    const { Component, ...restProps } = props;

    return <Route {...restProps} render={(propsRoute) => { //props.location, props.history, props.match
        return <Fragment>
            <div className="lg:flex">
                <Component {...propsRoute} />
                <div className="hidden lg:flex items-center justify-center bg-white flex-1 h-screen" style={{backgroundImage:'url("./img/cinema-img.jpg")', backgroundPosition:'center', backgroundRepeat:'no-repeat', backgroundSize:'cover'}}></div>
            </div>
        </Fragment>
    }} />
}
