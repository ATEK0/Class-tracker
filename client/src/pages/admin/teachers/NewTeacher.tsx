import { Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { apiLink } from "../../../config";
import httpClient from "../../../httpClient";
import toast from "react-hot-toast";

const NewTeacher = () => {

    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [birthdate, setBirthdate] = useState<string>("")
    const [contact, setContact] = useState<string>('')

    const [loadingStatus, setLoadingStatus] = useState<string>("Create")

    async function handleSubmit(event: any) {

        event.preventDefault()
        setLoadingStatus("Creating...")


        const addTeacherResponse = await httpClient.post(`${apiLink}/createTeacher`, {firstName, lastName, email, password, address, birthdate, contact});
        
        const addTeacherData = addTeacherResponse.data

        toast.success(addTeacherData)

        setTimeout(() => {
            window.location.href = "/admin/teachers"
        }, 2000);

    }

    return (
        <div className='pt-[64px] p-x-5 mx-auto max-w-7xl z-0 px-2 sm:px-6 lg:px-8 pb-8'>
            <h1 className="font-bold text-3xl text-[#04304D] pt-8 mb-5">Create New Teacher</h1>

            <h1 className="font-bold text-1xl text-[#04304D] mb-5">Teacher Information</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 m-2">
                        <div className="mb-2 block">
                            <Label htmlFor="fName" value="First Name" />
                        </div>
                        <TextInput
                            id="fName"
                            placeholder="John *"
                            value={firstName}
                            type='text'
                            required
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
                            placeholder="Doe *"
                            value={lastName}
                            type='text'
                            required
                            maxLength={50}
                            onChange={(event) => setLastName(event.target.value)}

                        />
                    </div>
                </div>

                <div className="flex flex-row">
                    <div className="w-1/2 m-2">
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email *" />
                        </div>
                        <TextInput
                            id="email"
                            placeholder="john@doe.com"
                            value={email}
                            type='email'
                            required
                            onChange={(event) => setEmail(event.target.value)}
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
                            required
                            maxLength={345}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

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
                            required
                            maxLength={100}
                            onChange={(event) => setAddress(event.target.value)}
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
                            required
                            onChange={(event) => setBirthdate(event.target.value)}
                        />
                    </div>
                </div>

                <div className="m-2">
                    <div className="mb-2 block">
                        <Label htmlFor="contact" value="Contact *" />
                    </div>
                    <TextInput
                        id="contact"
                        placeholder="+351 966666666"
                        value={contact}
                        type='text'
                        required
                        maxLength={15}
                        onChange={(event) => setContact(event.target.value)}

                    />
                </div>


                <div className="m-2">
                    <button type="submit" className="bg-[#04304d] rounded-md p-2 mt-4 text-white font-bold w-full">{loadingStatus}</button>
                </div>
            </form>
        </div>
    )
}

export default NewTeacher