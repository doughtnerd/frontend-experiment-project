import { Provider, withInjector } from '@doughtnerd/wrangler-di'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FormPage } from './pages/form-page.component'
import { ThankYouPage } from './pages/thank-you-page.component'
import { API_INJECTION_TOKEN } from './services/api/intelage-api.interface'
import { IntelageApi } from './services/api/intelage-api.service'
import {
    DESERIALIZER_INJECTION_TOKEN,
    IFormConfigDeserializer,
} from './services/deserializer/form-config-deserializer.interface'
import { FormConfigDeserializer } from './services/deserializer/form-config-deserializer.service'
import { HTTP_CLIENT_INJECTION_TOKEN, IHttpClient } from './services/http/http-client.interface'
import { HttpClient } from './services/http/http-client.service'
import { SUBMISSION_STORE_INJECTION_TOKEN } from './services/submission-store/submission-store.interface'
import { SubmissionStore } from './services/submission-store/submission-store.service'

/**
 * If you're familiar with dependency injection...
 */
const appProviders: Provider[] = [
    {
        provide: HTTP_CLIENT_INJECTION_TOKEN,
        useClass: HttpClient,
    },
    {
        provide: DESERIALIZER_INJECTION_TOKEN,
        useClass: FormConfigDeserializer,
    },
    {
        provide: SUBMISSION_STORE_INJECTION_TOKEN,
        useClass: SubmissionStore,
    },
    {
        provide: API_INJECTION_TOKEN,
        useFactory: (httpClient: IHttpClient, deserializer: IFormConfigDeserializer) => {
            return new IntelageApi(httpClient, deserializer)
        },
        deps: [HTTP_CLIENT_INJECTION_TOKEN, DESERIALIZER_INJECTION_TOKEN],
    },
    /**
     * Might seem a little weird to use a hook as a provider, but it allows you to decouple routing concerns
     * from the component that uses it and testing is a lot less obnoxious when you don't ALSO have to use routing in your tests.
     *
     * Could take it a step further and create an entire 'routing service' but that's a bit overkill.
     */
    {
        provide: 'USE_NAVIGATE',
        useValue: useNavigate,
    },
]

const Header = styled.header`
    background-color: #282c34;
    height: 64px;
    width: 100%;
`

const ViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 8px;
`

function App() {
    return (
        <div className="App">
            <Header>
                <span>Intelage</span>
            </Header>
            <ViewContainer>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<FormPage onSubmitRedirectTo="/thank-you" />} />
                        <Route path="/thank-you" element={<ThankYouPage />} />
                    </Routes>
                </BrowserRouter>
            </ViewContainer>
        </div>
    )
}

// Here we wrap the app in an injector
export default withInjector(<App />, appProviders)
