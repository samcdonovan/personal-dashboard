
import widgetStyles from "../styles/widgets.module.css";
import React from "react";
import { Link } from "react-router-dom";

interface LinkProps {
    to?: string
}

interface WidgetProps extends LinkProps {
    title: string
}

/**
 * React router link that is applied to elements conditionally. The condition in this case
 * is whether or not the element has a 'to' prop
 * @param props The props for this component, uses React's PropsWithChildren to get the children elements
 * @returns React component
 */
function ConditionalLink(props: React.PropsWithChildren<LinkProps>) {
    return props.to == null ? <div className={widgetStyles.widget}>{props.children}</div>
        : <Link to={props.to} className={widgetStyles.link}><div className={widgetStyles.widget}>{props.children}</div> </Link>
}

/**
 * Widget component; used in the dashboard to display different widgets
 * @param props The props for this component, uses React's PropsWithChildren to get the children elements
 * @returns React component
 */
function Widget(props: React.PropsWithChildren<WidgetProps>) {

    return (
        <ConditionalLink to={props.to}>
            <h1 className={widgetStyles['widget-title']}>{props.title}</h1>
            {props.children}
        </ConditionalLink>
    );
}

export default Widget;