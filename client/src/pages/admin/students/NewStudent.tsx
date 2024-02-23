import { Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import httpClient from "../../../httpClient";
import toast from "react-hot-toast";
import { ClassListType } from "../../../types";
import { apiLink } from "../../../config";

const NewStudent = () => {
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [birthdate, setBirthdate] = useState<string>("")
  const [pNumber, setpNumber] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [parentName, setparentName] = useState<string>("")
  const [parentPhone, setparentPhone] = useState<string>("")
  const [parentEmail, setparentEmail] = useState<string>("")
  const [parentAddress, setparentAddress] = useState<string>("")

  const [loadingStatus, setloadingStatus] = useState<string>("Create")


  const [classList, setClassList] = useState<ClassListType[]>([])
  const [class_ID, setClass_ID] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const formData = {
      firstName,
      lastName,
      email,
      address,
      birthdate,
      pNumber,
      password,
      parentName,
      parentPhone,
      parentEmail,
      parentAddress,
      class_ID
    };
    console.log("Form Data:", formData);
    setloadingStatus("Creating...")
    try {
      const create = await httpClient.post(`${apiLink}//createStudent`, formData);
      const resp = create.data

      if (create.status !== 200) {
        return toast.error(resp)
      }

      toast.success(resp)

      window.location.href = "/admin/students"

    } catch (error) {
      toast.error("Error, try again")
      setloadingStatus("Create")
    }

  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const classResp = await httpClient.get(apiLink + "/getClasses");
        const fetchedClass: ClassListType[] = classResp.data;
        setClassList(fetchedClass);

      } catch (error) {
        console.error("Error fetching data- ", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className='pt-[64px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8'>
      <h1 className="font-bold text-3xl text-[#04304D] pt-8 mb-5">Create New Student</h1>

      <h1 className="font-bold text-1xl text-[#04304D] mb-5">Student Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 m-2">
            <div className="mb-2 block">
              <Label htmlFor="fName" value="First Name" />
            </div>
            <TextInput
              id="fName"
              placeholder="John"
              value={firstName}
              type='text'
              maxLength={50}
              onChange={(event) => setFirstName(event.target.value)}

            />
          </div>
          <div className="w-full md:w-1/2 m-2">
            <div className="mb-2 block">
              <Label htmlFor="lName" value="Last Name" />
            </div>
            <TextInput
              id="lName"
              placeholder="Doe"
              value={lastName}
              type='text'
              maxLength={50}
              onChange={(event) => setLastName(event.target.value)}

            />
          </div>
        </div>
        <div className="m-2">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            placeholder="john@doe.com"
            value={email}
            type='email'
            maxLength={345}
            onChange={(event) => setEmail(event.target.value)}

          />
        </div>

        <div className="flex flex-row">
          <div className="w-1/2 m-2">
            <div className="mb-2 block">
              <Label htmlFor="address" value="Address *" />
            </div>
            <TextInput
              id="address"
              placeholder="Address"
              value={address}
              type='text'
              maxLength={100}
              onChange={(event) => setAddress(event.target.value)}
              required
            />
          </div>
          <div className="w-1/2 m-2">
            <div className="mb-2 block">
              <Label htmlFor="birthdate" value="Birthdate *" />
            </div>
            <TextInput
              id="birthdate"
              placeholder="Birthdate"
              value={birthdate}
              type='date'
              onChange={(event) => setBirthdate(event.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex flex-row">
          <div className="w-1/2 m-2">
            <div className="mb-2 block">
              <Label htmlFor="pNumber" value="Process Number *" />
            </div>
            <TextInput
              id="pNumber"
              placeholder="Process Number"
              value={pNumber}
              type='text'
              onChange={(event) => setpNumber(event.target.value)}
              required
            />
          </div>
          <div className="w-1/2 m-2">
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password *" />
            </div>
            <TextInput
              id="password"
              placeholder="Password"
              value={password}
              type='password'
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
        </div>

        <div className="w-1/2 m-2">
          <div className="mb-2 block">
            <Label htmlFor="class" value="Class *" />
          </div>
          <select
            value={class_ID}
            onChange={(event) => {
              setClass_ID(event.target.value);
            }}
            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 text-sm rounded-lg"
          >
            <option value="" key={""}>
              Select Class
            </option>
            {classList.map((item) => (
              <option value={item.id} key={item.id}>
                {item.grade}º {item.label}
              </option>
            ))}
          </select>

        </div>




        <h1 className="font-bold text-1xl text-[#04304D] pt-8 mb-5">Parent Information</h1>
        <div className="m-2">
          <div className="mb-2 block">
            <Label htmlFor="parentName" value="Parent Full Name *" />
          </div>
          <TextInput
            id="parentName"
            placeholder="Full Name"
            value={parentName}
            type='text'
            maxLength={300}
            onChange={(event) => setparentName(event.target.value)}
            required
          />
        </div>

        <div className="m-2">
          <div className="mb-2 block">
            <Label htmlFor="parentPhone" value="Parent Phone Number *" />
          </div>
          <TextInput
            id="parentPhone"
            placeholder="Phone Number"
            value={parentPhone}
            type='text'
            maxLength={32}
            onChange={(event) => setparentPhone(event.target.value)}
            required
          />
        </div>

        <div className="m-2">
          <div className="mb-2 block">
            <Label htmlFor="parentEmail" value="Parent Email *" />
          </div>
          <TextInput
            id="parentPhone"
            placeholder="Email"
            value={parentEmail}
            type='email'
            maxLength={345}
            onChange={(event) => setparentEmail(event.target.value)}
            required
          />
        </div>
        <div className="m-2">
          <div className="mb-2 block">
            <Label htmlFor="parentAddress" value="Parent Address *" />
          </div>
          <TextInput
            id="parentAddress"
            placeholder="Address"
            value={parentAddress}
            type='text'
            maxLength={120}
            onChange={(event) => setparentAddress(event.target.value)}
            required
          />
        </div>

        <div className="m-2">
          <button type="submit" className="bg-[#04304d] rounded-md p-2 mt-4 text-white font-bold w-full">{loadingStatus}</button>
        </div>
      </form>
    </div>
  );
};

export default NewStudent;
