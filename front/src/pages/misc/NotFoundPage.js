import { Button } from "reactstrap"
import PageNotFoundImg from '../../assets/images/pageNotFound.png'
import { useNavigate } from "react-router-dom"

const NotFoundPage = () => {
    const navigate = useNavigate()

    const handleGoBack = () => {
        return navigate("/")
    }

    return (
        <div className="not-found-page">
            <div className="content">
                <h1>Oops! 😵</h1>
                <p>A página solicitada não foi encontrada em nosso servidor.</p>
                <p>
                    <Button onClick={handleGoBack}>
                        Voltar para o início
                    </Button>
                </p>
                <img src={PageNotFoundImg} alt="Página não encontrada" />
            </div>
        </div>
    )
}

export default NotFoundPage