import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import { StepButton } from '@mui/material'
import { CheckCircleIcon } from '@heroicons/react/solid'

import FormTwo from './forms/FormTwo'
import FormOne from './forms/FormOne'
import FormThree from './forms/FormThree'

const steps = ['step 1', 'step 2', 'step 3']

const getStepContent = (step: number) => {
  switch (step) {
    case 0:
      return <FormOne />
    case 1:
      return <FormTwo />
    case 2:
      return <FormThree />
    default:
      return
  }
}

export default function StepperForm() {
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())
  const [completed, setCompleted] = useState<{
    [k: number]: boolean
  }>({})
  const [name, setName] = useState('')
  // console.log(activeStep)
  const methods = useForm()
  // console.log('active step ', activeStep)
  // console.log('completed', completed)
  const onSubmit = (data) => {
    setName(data.displayName)
    handleComplete(activeStep)
    // console.log('data', data)
  }

  const totalSteps = () => {
    return steps.length
  }

  const handleComplete = async (step: number) => {
    let isValid = false
    switch (step) {
      case 0:
        isValid = await methods.trigger(['fullName', 'displayName'], {
          shouldFocus: true,
        })
        break
      case 1:
        isValid = await methods.trigger(['workspaceName'], {
          shouldFocus: true,
        })
        break
      case 2:
        isValid = await methods.trigger(['plan'], {
          shouldFocus: true,
        })
      default:
        isValid = true
    }
    if (isValid) {
      const newCompleted = { ...completed }
      newCompleted[activeStep] = true
      setCompleted(newCompleted)
      handleNext()
    }
  }

  const completedSteps = () => {
    return Object.keys(completed).length
  }

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const isLastStep = () => {
    return activeStep === totalSteps() - 1
  }

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps()
  }

  const handleNext = () => {
    // const newActiveStep =
    //   isLastStep() && !allStepsCompleted()
    //     ? // It's the last step, but not all steps have been completed,
    //       // find the first step that has been completed
    //       steps.findIndex((step, i) => !(i in completed))
    //     : activeStep + 1
    const newActiveStep = activeStep + 1
    setActiveStep(newActiveStep)
  }

  const handleStep = (step: number) => () => {
    setActiveStep(step)
  }

  return (
    <div className="p-4 lg:w-1/3">
      <Stepper
        nonLinear
        activeStep={activeStep}
        sx={{
          '& .MuiStepConnector-line.Mui-active': {
            borderColor: 'rgb(79 70 229)',
          },
        }}
      >
        {steps.map((label, index) => {
          // const stepProps: { completed?: boolean } = {}
          // if (isStepSkipped(index)) {
          //   stepProps.completed = false
          // }
          return (
            <Step key={label} completed={completed[index]}>
              <StepButton
                sx={{
                  '& .MuiStepIcon-root.Mui-active': {
                    color: 'rgb(79 70 229)',
                  },
                  '& .MuiStepIcon-root.Mui-completed': {
                    color: 'rgb(79 70 229)',
                  },
                }}
                color="inherit"
                onClick={handleStep(index)}
              ></StepButton>
            </Step>
          )
        })}
      </Stepper>
      {allStepsCompleted() ? (
        <>
          <div className="flex flex-col items-center mt-10 text-center">
            <CheckCircleIcon className="w-12 h-12 text-indigo-600" />
            <h1 className="text-3xl font-bold ">Congratiulations, {name}!</h1>
            <h3 className="mt-4 text-gray-600">
              You have completed the onboarding, you can start using eden
            </h3>
            <button className="w-full px-4 py-2 my-4 bg-indigo-600 rounded text-indigo-50 hover:bg-indigo-800">
              Launch Eden
            </button>
          </div>
        </>
      ) : (
        <>
          {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {getStepContent(activeStep)}
              {/* {activeStep === steps.length - 2 ? (
                <button
                  className="w-full px-4 py-2 my-4 bg-indigo-600 rounded text-indigo-50 hover:bg-indigo-800"
                  type="submit"
                >
                  Create workspace Submit
                </button>
              ) : (
                <button
                  className="w-full px-4 py-2 my-4 bg-indigo-600 rounded text-indigo-50 hover:bg-indigo-800"
                  // onClick={handleNext}
                  type="button"
                  onClick={async () => {
                    console.log('type button')
                    await handleComplete(activeStep)
                  }}
                >
                  Create workspace
                </button> */}
              <button
                className="w-full px-4 py-2 my-4 bg-indigo-600 rounded text-indigo-50 hover:bg-indigo-800"
                // onClick={handleNext}
                key={`${activeStep === steps.length - 1 ? 'submit' : 'button'}`}
                type={`${
                  activeStep === steps.length - 1 ? 'submit' : 'button'
                }`}
                onClick={async () => {
                  if (activeStep !== steps.length - 1) {
                    await handleComplete(activeStep)
                  }
                }}
              >
                Create workspace
              </button>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  )
}
