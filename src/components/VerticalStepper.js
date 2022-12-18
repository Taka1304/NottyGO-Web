import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Stepper, Step, StepLabel, StepContent } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { styled } from '@mui/styles';


const steps = [
  {
    label: 'このアプリの詳しい使い方',
    image: '',  //のっティの画像
    description: 'ボタンを押して次に進みます'
  },
  {
    label: 'ユーザー登録 & ログイン',
    image: '/images/step1.png',
    description: `右上にあるボタンから、ユーザー登録ができます。
                既にユーザー登録がお済みの方はログインをしてください。`
  },
  {
    label: 'スタンプ獲得ページに移動する。',
    image: '/images/step2.png',
    description: '左上にあるメニューボタンの中にある「スタンプカード」から移動します'
  },
  {
    label: '位置情報の使用を許可する',
    image: '',  // 位置情報アラート画面
    description: `のっティに乗っていることを確認するために位置情報を利用しています。
                皆様の位置情報はサーバーに送信されず、こちらが収集することはございません。`
  },
  {
    label: 'スタンプを獲得する',
    image: '',  // スタンプゲットボタン
    description: `のっティに乗った状態でボタンを押します。
                ボタンを押すには「ログイン」「位置情報の許可」「本日のスタンプ未獲得」の条件があります。\n
                成功するとスタンプが1つ獲得できます。
                スタンプは1日1つまでとなっています。`
  },
  {
    label: 'クーポンを交換する',
    image: '',  // クーポン交換モーダルの画面
    description: `スタンプ7個で1つののっティ無料券と交換することができます。`
  },
  {
    label: 'クーポンを利用する',
    image: '',
    description: `現在は試作段階のため、無効化されています。
                  決してバスの運転手さんに見せて困らせないでください。`
  }
];

const StyledStepLabel = styled(StepLabel)({
  "& .MuiStepLabel-labelContainer": { color : "inherit" },
  "& .MuiStepLabel-label.Mui-completed": { color: "inherit" },
  "& .MuiStepLabel-label.Mui-active": { color: "inherit" },
  "& .MuiStepLabel-label.Mui-disabled": { color: "inherit", opacity: "0.7" }
});

const VerticalStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

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
    <Box width="90%">
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StyledStepLabel
              optional={
                index === 6 && (
                  <Typography variant="caption">Last step</Typography>
                  )
                }
                >
              {step.label}
            </StyledStepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              {step.image !== "" && <Image 
                objectFit='contain'
                height={200}
                width={200}
                src={step.image}
                alt={step.image}
              />}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? '完了' : '次へ'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    戻る
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Box square elevation={0} sx={{ p: 3  }}>
          <Typography>これで基本の使い方は完璧です!</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            もう一度みる
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default VerticalStepper