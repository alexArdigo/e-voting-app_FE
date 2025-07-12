import React from "react";
import {Navigate} from "react-router-dom";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, shouldRedirect: false };
        this.timer = null;
    }

    static getDerivedStateFromError(_error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Error caught by ErrorBoundary:", error);
        console.error("Additional information:", info.componentStack);

        this.timer = setTimeout(() => {
            this.setState({ shouldRedirect: true });
        }, 3000);
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
    render() {
        if (this.state.shouldRedirect) {
            return  window.location.href = "/";
        }

        if (this.state.hasError) {
            return this.props.fallback || <h2>Erro inesperado.</h2>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;