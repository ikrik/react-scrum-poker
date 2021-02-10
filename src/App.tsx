import * as React from 'react'
import styled from 'styled-components'
import BootstrapProvider from '@bootstrap-styled/provider'
import { Header } from '@bootstrap-styled/v4'

// Components
import Buttons from './components/Buttons/Buttons'
import Cards from './components/Cards/Cards'
import Logo from './components/Logo/Logo'
import Story from './components/Story/Story'
import UserName from './components/UserName/UserName'
import Users from './components/Users/Users'

export const MainGridContainer = styled.div`
  padding: 2em 0;
  min-width: 100%;
  height: 100%;
  display: inline-grid;
  grid-template-columns: 1fr minmax(960px, 1200px) 1fr;
  grid-template-rows: 100%;
  font-family: 'Roboto', sans-serif;
  background: rgb(233, 234, 237);
`

const ContentWrapper = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  width: 100%;
  height: 100%;
  justify-content: center;
`
const HeaderWrapper = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr minmax(960px, 1200px) 1fr;
  grid-template-rows: 100%;
  width: 100%;
  min-height: 80px;
  border-bottom: 2px solid #ccc;
`
const HeaderContainer = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  width: 100%;
  height: 100%;
`

const CardUsersWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(65%, 800px) minmax(35%, 400px);
  grid-template-rows: 100%;
`

const App: React.FunctionComponent = () => (
  <BootstrapProvider>
    <HeaderWrapper>
      <HeaderContainer>
        <Logo />
      </HeaderContainer>
    </HeaderWrapper>
    <MainGridContainer>
      <ContentWrapper>
        <UserName />
        <Story />
        <CardUsersWrapper>
          <Cards />
          <Users />
        </CardUsersWrapper>
        <Buttons />
      </ContentWrapper>
    </MainGridContainer>
  </BootstrapProvider>
)

export default App
