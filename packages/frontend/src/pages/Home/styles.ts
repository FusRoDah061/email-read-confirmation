import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '../../styles/variables';

export const Container = styled.main`
  width: 100%;
`;

export const Jumbotron = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  height: 100vh;

  h1,
  h2,
  h3 {
    text-align: center;
  }

  h1 {
    max-width: 20rem;
    font: 900 2.6rem 'Maven Pro', sans-serif;
    margin-bottom: 10vh;
  }

  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.6rem;
    font-weight: 400;
    margin-bottom: 4rem;
  }

  & > img {
    margin-left: -8rem;
    width: 24rem;
    margin-bottom: 20vh;
  }
`;

export const StartButton = styled.button`
  display: flex;
  flex-direction: column;
  font: 700 1.8rem 'Maven Pro', sans-serif;
  color: ${colors.textLight};
  align-items: center;
  border: none;
  background: transparent;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  padding: 1rem 2rem;

  &:hover {
    background: ${transparentize(0.7, colors.primaryVariant)};
  }

  img {
    margin-top: 1rem;
  }
`;

export const StepContainer = styled.section``;

export const StepLabelColumn = styled.div``;

export const StepLabel = styled.p``;

export const StepFormColumn = styled.div``;

export const InputWrapper = styled.div``;

export const StepHint = styled.p``;

export const StepDescription = styled.p``;

export const Button = styled.button``;

export const FinalStepContainer = styled.div``;

export const FinalStepTitle = styled.p``;

export const FinalStepHint = styled.p``;

export const CodeSnippet = styled.div``;

export const CodeSnippetCopyButton = styled.button``;
