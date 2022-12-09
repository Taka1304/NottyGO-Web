import * as React from 'react';
import { Container, Stepper, Step, StepLabel, StepContent } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

const steps = [
  {
    label: 'このアプリの使い方',
    image: '',
    description: 'ボタンを押すと、次に進みます'
  },
  {
    label: 'ユーザー登録 & ログイン',
    image: '',
    description: `ボタンからユーザー登録ができます。
                既にユーザー登録をお済みの方はログインをしてください。`
  },
  {
    label: 'スタンプ獲得ページに移動する。',
    image: '',
    description: 'ヘッダー左上にあるメニューボタンの中にある「スタンプカード」から移動します'
  },
  {
    label: '位置情報の使用を許可する',
    image: '',
    description: `バスに乗っていることを確認するために位置情報を利用しています。
                皆様の位置情報はサーバーには送信されず、こちらが収集することはございません。`
  },
  {
    label: 'スタンプを獲得する',
    image: '',
    description: `バスに乗った状態でボタンを押します`
  },
  {
    label: 'クーポンを交換する',
    image: '',
    description: `スタンプを7個で1つのバス無料券と交換することができます。`
  },
  {
    label: 'クーポンを利用する',
    image: '',
    description: `現在は試作段階のため、無効化されています。
                  決してバスの運転手さんに見せて困らせないでください。`
  }
];

const VerticalStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Container maxWidth="sm">
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 6 && (
                  <Typography variant="caption">Last step</Typography>
                )
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              {/* <Image 
                src={step.image}
                alt={step.image}
              /> */}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>これで基本の使い方は完璧です!</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            もう一度見る
          </Button>
        </Paper>
      )}
    </Container>
  );
}

export default VerticalStepper