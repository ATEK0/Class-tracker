import { Label, TextInput } from "flowbite-react";

const AdminSettings = () => {

  return (
    <div className='pt-[64px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8'>
      <h1 className="font-bold text-3xl text-[#04304D] pt-8 mb-5">General Settings</h1>

      <form onSubmit={() => {console.log("")}}>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 m-2">
            <div className="mb-2 block">
              <Label htmlFor="fName" value="First Name" />
            </div>
            <TextInput
              id="fName"
              placeholder="John"
              value={"123"}
              type='text'
              maxLength={50}
              onChange={() => {console.log("")}}
            />
          </div>
          <div className="w-full md:w-1/2 m-2">
            <div className="mb-2 block">
              <Label htmlFor="lName" value="Last Name" />
            </div>
            <TextInput
              id="lName"
              placeholder="Doe"
              value={"123"}
              type='text'
              maxLength={50}
              onChange={() => {console.log("")}}
            />
          </div>
        </div>

      </form>


    </div>
  );
};

export default AdminSettings;
