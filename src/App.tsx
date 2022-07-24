import { Provider, withInjector } from '@doughtnerd/wrangler-di'
import styled from 'styled-components'
import { FormPage } from './pages/FormPage'
import { API_INJECTION_TOKEN } from './services/api/intelage-api.interface'
import { IntelageApi } from './services/api/intelage-api.service'
import {
    DESERIALIZER_INJECTION_TOKEN,
    IFormConfigDeserializer,
} from './services/deserializer/form-config-deserializer.interface'
import { FormConfigDeserializer } from './services/deserializer/form-config-deserializer.service'
import { HTTP_CLIENT_INJECTION_TOKEN, IHttpClient } from './services/http/http-client.interface'
import { HttpClient } from './services/http/http-client.service'

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
        provide: API_INJECTION_TOKEN,
        useFactory: (httpClient: IHttpClient, deserializer: IFormConfigDeserializer) => {
            return new IntelageApi(httpClient, deserializer)
        },
        deps: [HTTP_CLIENT_INJECTION_TOKEN, DESERIALIZER_INJECTION_TOKEN],
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
                <FormPage></FormPage>
            </ViewContainer>
        </div>
    )
}

// Here we wrap the app in an injector
export default withInjector(<App />, appProviders)
