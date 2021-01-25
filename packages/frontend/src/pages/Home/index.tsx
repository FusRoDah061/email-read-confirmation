import React, { useCallback, useRef, useState } from 'react';
import { differenceInDays, parseISO } from 'date-fns';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Jumbotron,
  StartButton,
  NotificationForm,
  PrimaryStepContainer,
  SecondaryStepContainer,
  StepLabelColumn,
  StepLabel,
  StepFormColumn,
  InputWrapper,
  ErrorMessageBox,
  StepHint,
  StepDescription,
  Button,
  FinalStepContainer,
  FinalStepContent,
  FinalStepContainerHead,
  FinalStepErrorsContainer,
  FinalStepTitle,
  FinalStepHint,
  CodeSnippet,
  CodeSnippetCopyButton,
} from './styles';

import mailIcon from '../../assets/mail-icon.svg';
import arrowsDown from '../../assets/arrows-down.svg';
import api from '../../services/api';

interface Notification {
  id: string;
  sender: string;
  expiration: Date;
}

interface FormValues {
  description: string;
  email: string;
  recipient: string;
}

const FORM_SCHEMA = Yup.object().shape({
  description: Yup.string()
    .max(100, 'The description field should be longer than 100 characters!')
    .required('A description is required'),
  email: Yup.string()
    .email('Invalid email')
    .max(256, 'Email should not be longer than 256 characters!')
    .required('An email is required to send this notification'),
  recipient: Yup.string()
    .optional()
    .max(100, 'The recipient filed should be longer than 100 characters!'),
});

const Home: React.FC = () => {
  const initialValues: FormValues = {
    description: '',
    email: '',
    recipient: '',
  };
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<Notification | undefined>();
  const [requestErrors, setRequestErrors] = useState<string[]>([]);

  const firstStepRef = useRef<HTMLElement>(null);

  const secondStepRef = useRef<HTMLElement>(null);

  const thirdStepRef = useRef<HTMLElement>(null);

  const finalStepRef = useRef<HTMLDivElement>(null);

  const scrollToFirstStep = useCallback(() => {
    firstStepRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToSecondStep = useCallback(() => {
    secondStepRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToThirdStep = useCallback(() => {
    thirdStepRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const onSubmit = useCallback(
    async (
      { description, email, recipient }: FormValues,
      { setSubmitting }: FormikHelpers<FormValues>,
    ) => {
      setNotification(undefined);
      setRequestErrors([]);
      setLoading(true);
      setSubmitting(true);

      finalStepRef.current?.scrollIntoView({ behavior: 'smooth' });

      try {
        const response = await api.createNotification({
          description,
          sender: email,
          recipient,
        });

        if (response.status === 200) {
          const { id, sender, expiration } = response.data;

          setNotification({
            id,
            sender,
            expiration: parseISO(expiration),
          });
        }
      } catch (err) {
        const response = err.response.data;

        if ('validation' in response) {
          const { validation } = response;
          const messages: string[] = [];

          Object.keys(validation).forEach((key: string) => {
            messages.push(validation[key].message);
          });

          setRequestErrors(messages);
        } else {
          setRequestErrors([response.message]);
        }
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
    [],
  );

  const handleSecondStep = useCallback(() => {
    scrollToSecondStep();
  }, [scrollToSecondStep]);

  const handleThirdStep = useCallback(() => {
    scrollToThirdStep();
  }, [scrollToThirdStep]);

  const handleCopy = useCallback(async (text: string) => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(text);
    }
  }, []);

  return (
    <Container>
      <Jumbotron>
        <h1>Email Read Notification</h1>
        <h2>Be notified every time your emails are viewed!</h2>
        <h3>No sign up or browser plugins needed.</h3>

        <img src={mailIcon} alt="Mail icon" />

        <StartButton onClick={scrollToFirstStep}>
          START
          <img src={arrowsDown} alt="Arrows pointing down" />
        </StartButton>
      </Jumbotron>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={FORM_SCHEMA}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <NotificationForm onSubmit={handleSubmit}>
            <PrimaryStepContainer ref={firstStepRef}>
              <StepLabelColumn>
                <StepLabel>
                  <p>
                    <span>Step</span> 1
                  </p>
                </StepLabel>
              </StepLabelColumn>

              <StepFormColumn>
                <label htmlFor="js-description-input">
                  Give your notification a description:
                </label>
                <InputWrapper>
                  <input
                    id="js-description-input"
                    type="text"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    maxLength={100}
                  />
                </InputWrapper>
                {touched.description &&
                  errors.description &&
                  (() => {
                    scrollToFirstStep();
                    return (
                      <ErrorMessageBox>{errors.description}</ErrorMessageBox>
                    );
                  })()}

                <StepHint>
                  This is how we will identify this notification
                </StepHint>
                <StepDescription>
                  Since we don&apos;t hold any references to the email
                  you&apos;ll send, a single notification can be used on
                  multiple different emails, so this description will be sent on
                  the notification so you can identify it, too.
                </StepDescription>

                <Button type="button" onClick={handleSecondStep}>
                  NEXT
                </Button>
              </StepFormColumn>
            </PrimaryStepContainer>

            <SecondaryStepContainer ref={secondStepRef}>
              <StepLabelColumn>
                <StepLabel>
                  <p>
                    <span>Step</span> 2
                  </p>
                </StepLabel>
              </StepLabelColumn>

              <StepFormColumn>
                <label htmlFor="js-email-input">
                  Tell us the email address we will notify:
                </label>
                <InputWrapper>
                  <input
                    id="js-email-input"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    maxLength={256}
                  />
                </InputWrapper>
                {touched.email &&
                  errors.email &&
                  (() => {
                    if (!errors.description) scrollToSecondStep();
                    return <ErrorMessageBox>{errors.email}</ErrorMessageBox>;
                  })()}

                <StepHint>
                  This is the address the notifications will be sent to
                </StepHint>
                <StepDescription>
                  So you won&apos;t need an account. Cool, right?
                </StepDescription>

                <Button type="button" onClick={handleThirdStep}>
                  NEXT
                </Button>
              </StepFormColumn>
            </SecondaryStepContainer>

            <PrimaryStepContainer ref={thirdStepRef}>
              <StepLabelColumn>
                <StepLabel>
                  <p>
                    <span>Step</span> 3 <span>Optional</span>
                  </p>
                </StepLabel>
              </StepLabelColumn>

              <StepFormColumn>
                <label htmlFor="js-recipient-input">
                  Optionally, tell us who will read the email:
                </label>
                <InputWrapper>
                  <input
                    id="js-recipient-input"
                    type="text"
                    name="recipient"
                    value={values.recipient}
                    onChange={handleChange}
                    maxLength={100}
                  />
                </InputWrapper>
                {touched.recipient &&
                  errors.recipient &&
                  (() => {
                    if (!errors.description && !errors.email)
                      scrollToThirdStep();
                    return (
                      <ErrorMessageBox>{errors.recipient}</ErrorMessageBox>
                    );
                  })()}

                <StepHint>This will only be used in the notification</StepHint>
                <StepDescription>
                  This is useful so you can better identify this email from the
                  notification. You can leave this empty if you think the
                  description is enough.
                </StepDescription>

                <Button type="submit" disabled={isSubmitting}>
                  {values.recipient ? 'FINISH' : 'SKIP & FINISH'}
                </Button>
              </StepFormColumn>
            </PrimaryStepContainer>
          </NotificationForm>
        )}
      </Formik>

      <FinalStepContainer ref={finalStepRef}>
        {requestErrors.length <= 0 && !notification && !loading && (
          <FinalStepContent>
            <FinalStepContainerHead>
              <FinalStepTitle>Waiting for you</FinalStepTitle>
              <FinalStepHint>
                Fill up the fields above to create a notification!
              </FinalStepHint>
            </FinalStepContainerHead>
          </FinalStepContent>
        )}

        {requestErrors.length <= 0 && !notification && loading && (
          <FinalStepContent>
            <FinalStepContainerHead>
              <FinalStepTitle>Almost there...</FinalStepTitle>
              <FinalStepHint>
                Hold up a little while we setup your notification!
              </FinalStepHint>
            </FinalStepContainerHead>
          </FinalStepContent>
        )}

        {requestErrors.length > 0 && (
          <FinalStepContent>
            <FinalStepContainerHead>
              <FinalStepTitle>Uh oh!</FinalStepTitle>
              <FinalStepHint>
                We found some problems while creating your notification:
              </FinalStepHint>

              <FinalStepErrorsContainer>
                {requestErrors.map((error: string) => {
                  return <p key={error}>{error}</p>;
                })}
              </FinalStepErrorsContainer>
            </FinalStepContainerHead>
          </FinalStepContent>
        )}

        {requestErrors.length <= 0 && notification && !loading && (
          <FinalStepContent>
            <FinalStepContainerHead>
              <FinalStepTitle>All done here!</FinalStepTitle>
              <FinalStepHint>
                All you have to do now, is include this notification in your
                email.
              </FinalStepHint>
            </FinalStepContainerHead>

            <p>
              To do this, add the following URL as an image anywhere in your
              email:
            </p>

            <CodeSnippet>
              <CodeSnippetCopyButton
                onClick={() =>
                  handleCopy(
                    `${process.env.REACT_APP_API_URL}/notify/${notification.id}`,
                  )
                }
              >
                COPY
              </CodeSnippetCopyButton>
              <p>
                {`${process.env.REACT_APP_API_URL}/notify/${notification.id}`}
              </p>
            </CodeSnippet>

            <p>
              Or, you can paste the following HTML snippet in your email body,
              if the email client you&apos;re using supports this:
            </p>

            <CodeSnippet>
              <CodeSnippetCopyButton
                onClick={() =>
                  handleCopy(
                    `<img href="${process.env.REACT_APP_API_URL}/notify/${notification.id}"/>`,
                  )
                }
              >
                COPY
              </CodeSnippetCopyButton>
              <p>
                {`<img href="${process.env.REACT_APP_API_URL}/notify/${notification.id}"/>`}
              </p>
            </CodeSnippet>

            <p>
              After this, you&apos;ll be notified at {notification.sender}{' '}
              everytime your email is viewed, for the next{' '}
              {differenceInDays(notification.expiration, new Date())} days!
            </p>
          </FinalStepContent>
        )}
      </FinalStepContainer>
    </Container>
  );
};

export default Home;
