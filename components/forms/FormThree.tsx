import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { UserGroupIcon, UserIcon } from '@heroicons/react/solid'
import { useFormContext, Controller } from 'react-hook-form'

const FormThree = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext()
  const [plan, setPlan] = useState('personal')
  return (
    <>
      <div className="mt-10 text-center">
        <h1 className="text-3xl font-bold ">
          How are you planning to use Eden?
        </h1>
        <h3 className="mt-4 text-gray-600">
          We'll streamline your setup experiance accordingly
        </h3>
      </div>
      <div className="mt-8">
        <Controller
          name="plan"
          control={control}
          render={({ field: { onChange } }) => {
            return (
              <RadioGroup
                value={plan}
                onChange={(e) => {
                  console.log(e)
                  onChange(e)
                  setPlan(e)
                }}
              >
                <RadioGroup.Label className="sr-only">Plan</RadioGroup.Label>
                <div className="flex justify-around">
                  <RadioGroup.Option value="personal">
                    {({ checked }) => (
                      <div
                        className={`${
                          checked ? 'border-indigo-600' : 'border-gray-400'
                        } w-40 rounded border-2 p-4`}
                      >
                        <UserIcon
                          className={`my-2 h-6 w-6 ${
                            checked ? 'text-indigo-600' : ''
                          }`}
                        />
                        <h3 className="my-2 font-bold">For myself</h3>
                        <p className="my-2 text-sm text-gray-600">
                          Write better. Think more clearly. Stay organized
                        </p>
                      </div>
                    )}
                  </RadioGroup.Option>
                  <RadioGroup.Option value="team">
                    {({ checked }) => (
                      <div
                        className={`${
                          checked ? 'border-indigo-600' : 'border-gray-400'
                        } w-40 rounded border-2 p-4`}
                      >
                        <UserGroupIcon
                          className={`my-2 h-6 w-6 ${
                            checked ? 'text-indigo-600' : ''
                          }`}
                        />
                        <h3 className="my-2 font-bold">With my team</h3>
                        <p className="my-2 text-sm text-gray-600">
                          Wikis, docs, tasks & projects, all in one place.
                        </p>
                      </div>
                    )}
                  </RadioGroup.Option>
                </div>
              </RadioGroup>
            )
          }}
        ></Controller>
      </div>
    </>
  )
}

export default FormThree
