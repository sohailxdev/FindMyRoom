import  {Component , ErrorInfo , ReactNode} from 'react';

interface Props{
    children : ReactNode
}


interface State{
    hasError : boolean,
    error: Error | null
}

class ErrorBoundary extends Component<Props , State>{
    constructor(props: Props){
        super(props);
        this.state = {
            hasError : false,
            error: null,
        }
    }

    static getDerivedStateFromError(error: Error): State{
        return {
            hasError: true,
            error
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Uncaught error : ' , error , errorInfo);
    }

    render() {
        if(this.state.hasError){
            return (
                <div className='min-h-screen h-full w-full flex items-center justify-center '>
                    <h3 className='text-3xl font-semibold text-black'>Something went wrong.....</h3>
                </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;