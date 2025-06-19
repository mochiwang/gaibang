import React, { useState } from 'react';
import Step1_ServiceType from './Step1_ServiceType';
import Step2_SetPrice from './Step2_SetPrice';
import Step3_Experience from './Step3_Experience';
import Step4_Address from './Step4_Address';
import Step5_ConfirmAndSubmit from './Step5_ConfirmAndSubmit';
import { withAuth } from '../components/withAuth';
import { useNavigation } from '@react-navigation/native';

function TaskerRegisterFlow() {
  const navigation = useNavigation<any>();

  const [step, setStep] = useState(1);

  const [taskerInfo, setTaskerInfo] = useState({
    service_type: '',
    hourly_rate: 0,
    bio: '',
    address: '',
  });

  const goToNextStep = () => setStep((prev) => prev + 1);

  return (
    <>
      {step === 1 && (
        <Step1_ServiceType
          onNext={(serviceType) => {
            setTaskerInfo((prev) => ({ ...prev, service_type: serviceType }));
            goToNextStep();
          }}
        />
      )}
      {step === 2 && (
        <Step2_SetPrice
          onNext={(price) => {
            setTaskerInfo((prev) => ({ ...prev, hourly_rate: price }));
            goToNextStep();
          }}
        />
      )}
      {step === 3 && (
        <Step3_Experience
          onNext={(bio) => {
            setTaskerInfo((prev) => ({ ...prev, bio }));
            goToNextStep();
          }}
        />
      )}
      {step === 4 && (
        <Step4_Address
          defaultAddress={taskerInfo.address}
          onNext={(address) => {
            setTaskerInfo((prev) => ({ ...prev, address }));
            goToNextStep();
          }}
        />
      )}
      {step === 5 && (
        <Step5_ConfirmAndSubmit
          taskerInfo={taskerInfo}
          onSubmitSuccess={() => {
            navigation.navigate('TabMarket', {
              serviceId: taskerInfo.service_type,
            });
          }}
        />
      )}
    </>
  );
}

export default withAuth(TaskerRegisterFlow);
