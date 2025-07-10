import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Erro apanhado pelo ErrorBoundary:", error);
        console.error("Informações adicionais:", info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || <h2>Erro inesperado.</h2>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;