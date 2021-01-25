import styled from 'styled-components';
import { darken, transparentize } from 'polished';
import { colors, mediaBreaks } from '../../styles/variables';

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

  @media screen and (min-width: ${mediaBreaks.mobile}) {
    h1 {
      max-width: 30rem;
      font-size: 3.2rem;
    }

    & > img {
      margin-left: -9.6rem;
      width: 29rem;
    }
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

export const NotificationForm = styled.form``;

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

  @media screen and (min-width: ${mediaBreaks.mobile}) {
    grid-area: step;
    align-items: center;

    &::after {
      height: 50%;
      width: 0.5rem;
      background: ${colors.primaryVariant};
      top: 50%;
      z-index: 0;
    }
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

  @media screen and (min-width: ${mediaBreaks.mobile}) {
    display: grid;
    grid-template-areas: 'step form';
    grid-template-columns: 50% 50%;
    padding: 0 15%;

    &:last-of-type ${StepLabelColumn}::after {
      content: '';
      top: 0;
    }
  }
`;

export const StepLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.8rem;
  height: 3.8rem;
  text-align: center;
  background: ${colors.primaryVariant};
  font: 700 1.5rem 'Maven Pro', sans-serif;
  border-radius: 50%;
  z-index: 1;

  span {
    display: none;
  }

  @media screen and (min-width: ${mediaBreaks.mobile}) {
    width: 13rem;
    height: 13rem;
    font-size: 2rem;

    span {
      display: inline;
    }

    span:nth-child(2) {
      display: block;
      font: 400 1.5rem 'Open sans', sans-serif;
    }
  }
`;

export const StepFormColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 0.9rem;
  flex: 1;

  label {
    width: 100%;
    font-size: 1.5rem;
    margin-bottom: 3rem;
  }

  @media screen and (min-width: ${mediaBreaks.mobile}) {
    grid-area: form;
    padding: 0.9rem 4rem;

    label {
      margin-bottom: 1rem;
    }
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

export const ErrorMessageBox = styled.p`
  width: 100%;
  text-align: left;
  margin-bottom: 1.5rem;
  background: ${colors.error};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${colors.textLight};
`;

export const StepHint = styled.p`
  width: 100%;
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 1.2rem;
  text-align: left;

  @media screen and (min-width: ${mediaBreaks.mobile}) {
    margin-top: 1rem;
  }
`;

export const StepDescription = styled.p`
  width: 100%;
  font-size: 1.4rem;
  margin-bottom: 3rem;
  text-align: left;

  @media screen and (min-width: ${mediaBreaks.mobile}) {
    margin-bottom: 5rem;
  }
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

  @media screen and (min-width: ${mediaBreaks.mobile}) {
    grid-template-areas: 'form step';

    ${StepLabelColumn} {
      &::after {
        height: 100%;
        top: 0;
      }
    }
  }
`;

export const FinalStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${colors.secondary};
  color: ${colors.textDark};
`;

export const FinalStepContent = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 1.5rem;

  & > p {
    font-size: 1.4rem;
    text-align: center;
    margin: 1.5rem 0;
  }

  @media screen and (min-width: ${mediaBreaks.mobile}) {
    width: 50%;
    max-width: 800px;
    min-width: 450px;
  }
`;

export const FinalStepContainerHead = styled.div`
  margin-bottom: 4rem;
`;

export const FinalStepErrorsContainer = styled.div`
  p {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 1.4rem;
    font-weight: 700;
    color: ${colors.error};
  }
`;

export const FinalStepTitle = styled.p`
  width: 100%;
  font: 900 2.5rem 'Maven Pro', sans-serif;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const FinalStepHint = styled.p`
  width: 100%;
  text-align: center;
  font-size: 1.6rem;
`;

export const CodeSnippet = styled.div`
  position: relative;
  background: ${colors.secondaryVariant};
  border-radius: 1rem;
  padding: 2rem 1.2rem;

  p {
    font: 400 1.1rem 'Roboto Mono', monospace;
    text-align: center;
  }
`;

export const CodeSnippetCopyButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  border-top-left-radius: 1rem;
  background: ${darken(0.2, colors.secondaryVariant)};
  text-transform: uppercase;
  font-size: 1rem;
  padding: 0.4rem 2rem;
  opacity: 0.7;
  transition: 0.2s;

  &:hover {
    opacity: 1;
  }
`;
