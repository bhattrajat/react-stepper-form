import { useFormContext } from 'react-hook-form'

const FormOne = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  // console.log(errors)
  return (
    <>
      <div className="mt-10 text-center">
        <h1 className="text-3xl font-bold ">Welcome! First things first...</h1>
        <h3 className="mt-4 text-gray-600">You can always change them later</h3>
      </div>
      <div className="mt-4">
        <label htmlFor="full-name">Full Name</label>
        <input
          className="w-full my-2 border-gray-400 rounded"
          placeholder="Steve Jobs"
          id="full-name"
          type="text"
          {...register('fullName', { required: 'Full Name is required' })}
        />
        {errors.fullName && (
          <span className="text-red-500">{errors.fullName.message}</span>
        )}
      </div>
      <div className="mt-4">
        <label htmlFor="display-name">Display Name</label>
        <input
          className="w-full my-2 border-gray-400 rounded "
          placeholder="Steve"
          id="display-name"
          type="text"
          {...register('displayName', { required: 'Display name is required' })}
        />
        {errors.displayName && (
          <span className="text-red-500">{errors.displayName.message}</span>
        )}
      </div>
      {/* <button className="w-full px-4 py-2 my-4 bg-indigo-600 rounded text-indigo-50">
          Create Workspace
        </button> */}
    </>
  )
}

export default FormOne
