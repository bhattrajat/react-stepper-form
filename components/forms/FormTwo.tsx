import { useFormContext } from 'react-hook-form'

const FormTwo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  return (
    <>
      <div className="mt-10 text-center">
        <h1 className="text-3xl font-bold ">
          Let's setup a home for all your work
        </h1>
        <h3 className="mt-4 text-gray-600">
          You can always create another workspace later
        </h3>
      </div>
      <div className="mt-4">
        <label htmlFor="workspace-name">Workspace Name</label>
        <input
          className="w-full my-2 border-gray-400 rounded"
          placeholder="Eden"
          id="workspace-name"
          type="text"
          {...register('workspaceName', {
            required: 'Workspace name is required',
          })}
        />
        {errors.workspaceName && (
          <span className="text-red-500">{errors.workspaceName.message}</span>
        )}
      </div>
      <div className="mt-4">
        <label htmlFor="workspace-url">
          Workspace Url <span className="text-gray-600">(optional)</span>
        </label>
        <div className="flex">
          <input
            className="w-2/5 my-2 text-gray-600 bg-gray-100 rounded-l"
            type="text"
            disabled
            value="www.eden.com/"
          ></input>
          <input
            className="w-3/5 my-2 border-gray-400 rounded-r"
            placeholder="Example"
            id="workspace-url"
            type="text"
          />
        </div>
      </div>
    </>
  )
}
export default FormTwo
