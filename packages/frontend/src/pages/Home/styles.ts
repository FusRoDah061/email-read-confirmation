import styled from 'styled-components';
import { darken, transparentize } from 'polished';
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
  transition: background-color 0.3s;
  padding: 1rem 2rem;

  &:hover {
    background: ${transparentize(0.7, colors.primaryVariant)};
  }

  img {
    margin-top: 1rem;
  }
`;

export const StepLabelColumn = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    height: calc(100% + 3rem + 6rem);
    width: 0.3rem;
    background: ${colors.primaryVariant};
    top: 0;
    z-index: 0;
  }
`;

export const PrimaryStepContainer = styled.section`
  display: flex;
  height: 100vh;
  flex-direction: row;
  padding: 3rem 2rem 6rem 1.5rem;

  /* Hide the step line of the last numbered step */
  &:last-of-type ${StepLabelColumn}::after {
    content: none;
  }
`;

export const StepLabel = styled.div`
  width: 3.8rem;
  height: 3.8rem;
  text-align: center;
  background: ${colors.primaryVariant};
  font: 700 1.5rem 'Maven Pro', sans-serif;
  border-radius: 50%;
  z-index: 1;

  p {
    line-height: 3.8rem;
  }

  span {
    display: none;
  }
`;

export const StepFormColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 0.9rem;

  label {
    width: 100%;
    font-size: 1.5rem;
    margin-bottom: 3rem;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
  border-radius: 1rem;
  padding: 1rem 1.2rem;
  background: ${colors.secondary};

  input {
    width: 100%;
    padding: 0.5rem 0;
    border: none;
    outline: none;
    border-bottom: 0.3rem solid ${colors.accent};
    font-size: 1.6rem;
  }
`;

export const StepHint = styled.p`
  width: 100%;
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 1.2rem;
  text-align: left;
`;

export const StepDescription = styled.p`
  width: 100%;
  font-size: 1.4rem;
  margin-bottom: 2rem;
  text-align: left;
`;

export const Button = styled.button`
  width: 13rem;
  height: 4rem;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.3rem;
  border: none;
  background: ${colors.accent};
  border-radius: 0.5rem;
  transition: background-color 0.3s;

  &:hover {
    background: ${darken(0.15, colors.accent)};
  }
`;

export const SecondaryStepContainer = styled(PrimaryStepContainer)`
  background: ${colors.secondary};
  color: ${colors.textDark};

  input,
  ${StepLabel}, ${InputWrapper}, ${StepLabelColumn}::after {
    background: ${colors.secondaryVariant};
  }
`;

export const FinalStepContainer = styled.div``;

export const FinalStepTitle = styled.p``;

export const FinalStepHint = styled.p``;

export const CodeSnippet = styled.div``;

export const CodeSnippetCopyButton = styled.button``;
