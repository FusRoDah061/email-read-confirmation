import React from 'react';
import {
  Container,
  Jumbotron,
  StartButton,
  StepContainer,
  StepLabelColumn,
  StepLabel,
  StepFormColumn,
  InputWrapper,
  StepHint,
  StepDescription,
  Button,
  FinalStepContainer,
  FinalStepTitle,
  FinalStepHint,
  CodeSnippet,
  CodeSnippetCopyButton,
} from './styles';

import mailIcon from '../../assets/mail-icon.svg';
import arrowsDown from '../../assets/arrows-down.svg';

const Home: React.FC = () => {
  return (
    <Container>
      <Jumbotron>
        <h1>E-mail Read Notification</h1>
        <h2>Be notified every time your e-mails are viewed!</h2>
        <h3>No sign up or browser plugins needed.</h3>

        <img src={mailIcon} alt="Mail icon" />

        <StartButton>
          START
          <img src={arrowsDown} alt="Arrows pointing down" />
        </StartButton>
      </Jumbotron>

      <StepContainer>
        <StepLabelColumn>
          <StepLabel>Step 1</StepLabel>
        </StepLabelColumn>

        <StepFormColumn>
          <label htmlFor="js-description-input">
            Give you notification a description:
          </label>
          <InputWrapper>
            <input id="js-description-input" type="text" />
          </InputWrapper>

          <StepHint>This is how we will identify this notification</StepHint>
          <StepDescription>
            Since we don’t hold any reference to the e-mail you’ll send, one
            notification can be used on multiple different e-mails, so this
            description will be sent on the read notification so you can
            identify it, too.
          </StepDescription>

          <Button>NEXT</Button>
        </StepFormColumn>
      </StepContainer>

      <StepContainer>
        <StepFormColumn>
          <label htmlFor="js-description-input">
            Tell us the e-mail address we will notify:
          </label>
          <InputWrapper>
            <input id="js-description-input" type="text" />
          </InputWrapper>

          <StepHint>
            This is the address the notifications will be sent to
          </StepHint>
          <StepDescription>
            So you won’t need an account. Cool, right?
          </StepDescription>

          <Button>NEXT</Button>
        </StepFormColumn>

        <StepLabelColumn>
          <StepLabel>Step 2</StepLabel>
        </StepLabelColumn>
      </StepContainer>

      <StepContainer>
        <StepLabelColumn>
          <StepLabel>
            Step 3 <span>Optional</span>
          </StepLabel>
        </StepLabelColumn>

        <StepFormColumn>
          <label htmlFor="js-description-input">
            Optionally, tell us who will read the e-mail:
          </label>
          <InputWrapper>
            <input id="js-description-input" type="text" />
          </InputWrapper>

          <StepHint>
            This will only be used to display in the notification
          </StepHint>
          <StepDescription>
            This is useful so you can better identify this e-mail from the
            notification. You can leave this empty if you think the description
            is enough.
          </StepDescription>

          <Button>NEXT</Button>
        </StepFormColumn>
      </StepContainer>

      <FinalStepContainer>
        <FinalStepTitle>All done here!</FinalStepTitle>
        <FinalStepHint>
          All you have to do now, is include this notification in your email.
        </FinalStepHint>

        <p>
          To do this, add the following URL as a image anywhere in your email:
        </p>

        <CodeSnippet>
          <CodeSnippetCopyButton>COPY</CodeSnippetCopyButton>
          <p>
            https://email-visualization-notifier.herokuapp.com/notify/e82=0232e-719c-4406-a6d4-399557fc9559
          </p>
        </CodeSnippet>

        <p>
          Or, you can paste the following HTML snippet, if the e-mail client you
          use supports this:
        </p>

        <CodeSnippet>
          <CodeSnippetCopyButton>COPY</CodeSnippetCopyButton>
          <p>
            {
              '<img href="https://email-visualization-notifier.herokuapp.com/notify/e82=0232e-719c-4406-a6d4-399557fc9559" />'
            }
          </p>
        </CodeSnippet>

        <p>
          After this, you’ll be notified at {'<email>'} everytime your email is
          viewed, for the next 7 days!
        </p>
      </FinalStepContainer>
    </Container>
  );
};

export default Home;
